import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { eq, and, desc, count } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../core/database/database.module';
import { competitors } from '../../../../../packages/db/src/schema';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type * as schema from '../../../../../packages/db/src/schema';

type Database = PostgresJsDatabase<typeof schema>;
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CompetitorsService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database
  ) {}

  async findAll(userId: string, pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    const [data, [{ total }]] = await Promise.all([
      this.db.query.competitors.findMany({
        where: eq(competitors.userId, userId),
        limit,
        offset,
        orderBy: desc(competitors.createdAt),
      }),
      this.db
        .select({ total: count() })
        .from(competitors)
        .where(eq(competitors.userId, userId)),
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
    const competitor = await this.db.query.competitors.findFirst({
      where: and(eq(competitors.id, id), eq(competitors.userId, userId)),
      with: {
        products: true,
      },
    });

    if (!competitor) {
      throw new NotFoundException('Competitor not found');
    }

    return competitor;
  }

  async create(userId: string, data: CreateCompetitorDto) {
    const [competitor] = await this.db
      .insert(competitors)
      .values({
        ...data,
        userId,
      })
      .returning();

    return competitor;
  }

  async update(userId: string, id: string, data: UpdateCompetitorDto) {
    // Verify ownership
    await this.findOne(userId, id);

    const [updated] = await this.db
      .update(competitors)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(competitors.id, id), eq(competitors.userId, userId)))
      .returning();

    return updated;
  }

  async remove(userId: string, id: string) {
    // Verify ownership
    await this.findOne(userId, id);

    await this.db
      .delete(competitors)
      .where(and(eq(competitors.id, id), eq(competitors.userId, userId)));

    return { success: true };
  }
}
