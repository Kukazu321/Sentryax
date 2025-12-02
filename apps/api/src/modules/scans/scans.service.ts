import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and, desc, count } from 'drizzle-orm';
import { Queue } from 'bullmq';
import { DATABASE_CONNECTION } from '../../core/database/database.module';
import { SCANS_QUEUE } from '../../core/queue/queue.module';
import { scans, scanResults } from '../../../../../packages/db/src/schema';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type * as schema from '../../../../../packages/db/src/schema';

type Database = PostgresJsDatabase<typeof schema>;
import { CreateScanDto } from './dto/create-scan.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ScansService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
    @Inject(SCANS_QUEUE) private readonly scansQueue: Queue
  ) {}

  async findAll(userId: string, pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    const [data, [{ total }]] = await Promise.all([
      this.db.query.scans.findMany({
        where: eq(scans.userId, userId),
        limit,
        offset,
        orderBy: desc(scans.createdAt),
        with: {
          competitor: {
            columns: { id: true, name: true, domain: true },
          },
        },
      }),
      this.db
        .select({ total: count() })
        .from(scans)
        .where(eq(scans.userId, userId)),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const scan = await this.db.query.scans.findFirst({
      where: and(eq(scans.id, id), eq(scans.userId, userId)),
      with: {
        competitor: true,
        results: true,
      },
    });

    if (!scan) {
      throw new NotFoundException('Scan not found');
    }

    return scan;
  }

  async findByCompetitor(userId: string, competitorId: string, pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    const [data, [{ total }]] = await Promise.all([
      this.db.query.scans.findMany({
        where: and(
          eq(scans.userId, userId),
          eq(scans.competitorId, competitorId)
        ),
        limit,
        offset,
        orderBy: desc(scans.createdAt),
      }),
      this.db
        .select({ total: count() })
        .from(scans)
        .where(and(
          eq(scans.userId, userId),
          eq(scans.competitorId, competitorId)
        )),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  async create(userId: string, data: CreateScanDto) {
    // Create scan record
    const [scan] = await this.db
      .insert(scans)
      .values({
        userId,
        competitorId: data.competitorId,
        type: data.type,
        status: 'pending',
      })
      .returning();

    // Queue the scan job
    await this.scansQueue.add('process-scan', {
      scanId: scan.id,
      userId,
      competitorId: data.competitorId,
      type: data.type,
    });

    return scan;
  }

  async updateStatus(
    scanId: string,
    status: 'running' | 'completed' | 'failed',
    metadata?: Record<string, unknown>
  ) {
    const updateData: Record<string, unknown> = { status };

    if (status === 'running') {
      updateData.startedAt = new Date();
    } else if (status === 'completed' || status === 'failed') {
      updateData.completedAt = new Date();
    }

    if (metadata) {
      updateData.metadata = metadata;
    }

    const [updated] = await this.db
      .update(scans)
      .set(updateData)
      .where(eq(scans.id, scanId))
      .returning();

    return updated;
  }
}
