import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { eq, and, desc, count } from 'drizzle-orm';
import { Queue } from 'bullmq';
import { DATABASE_CONNECTION } from '../../core/database/database.module';
import { COUNTER_ATTACKS_QUEUE } from '../../core/queue/queue.module';
import { counterAttacks } from '@pricewatch/db/schema';
import type { Database } from '@pricewatch/db';
import { CreateCounterAttackDto } from './dto/create-counter-attack.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CounterAttacksService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
    @Inject(COUNTER_ATTACKS_QUEUE) private readonly counterAttacksQueue: Queue
  ) {}

  async findAll(userId: string, pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    const [data, [{ total }]] = await Promise.all([
      this.db.query.counterAttacks.findMany({
        where: eq(counterAttacks.userId, userId),
        limit,
        offset,
        orderBy: desc(counterAttacks.createdAt),
        with: {
          competitor: {
            columns: { id: true, name: true, domain: true },
          },
        },
      }),
      this.db
        .select({ total: count() })
        .from(counterAttacks)
        .where(eq(counterAttacks.userId, userId)),
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
    const counterAttack = await this.db.query.counterAttacks.findFirst({
      where: and(eq(counterAttacks.id, id), eq(counterAttacks.userId, userId)),
      with: {
        competitor: true,
        scanResult: true,
      },
    });

    if (!counterAttack) {
      throw new NotFoundException('Counter-attack not found');
    }

    return counterAttack;
  }

  async create(userId: string, data: CreateCounterAttackDto) {
    const [counterAttack] = await this.db
      .insert(counterAttacks)
      .values({
        userId,
        competitorId: data.competitorId,
        scanResultId: data.scanResultId,
        type: data.type,
        triggerCondition: data.triggerCondition,
        config: data.config,
        status: 'pending_approval',
      })
      .returning();

    return counterAttack;
  }

  async approve(userId: string, id: string) {
    const counterAttack = await this.findOne(userId, id);

    if (counterAttack.status !== 'pending_approval') {
      throw new BadRequestException('Counter-attack is not pending approval');
    }

    const [updated] = await this.db
      .update(counterAttacks)
      .set({ status: 'approved', updatedAt: new Date() })
      .where(eq(counterAttacks.id, id))
      .returning();

    // Queue for execution
    await this.counterAttacksQueue.add('execute-counter-attack', {
      counterAttackId: id,
      userId,
    });

    return updated;
  }

  async cancel(userId: string, id: string) {
    const counterAttack = await this.findOne(userId, id);

    if (!['pending_approval', 'approved'].includes(counterAttack.status)) {
      throw new BadRequestException('Counter-attack cannot be canceled');
    }

    const [updated] = await this.db
      .update(counterAttacks)
      .set({ status: 'canceled', updatedAt: new Date() })
      .where(eq(counterAttacks.id, id))
      .returning();

    return updated;
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.db
      .delete(counterAttacks)
      .where(and(eq(counterAttacks.id, id), eq(counterAttacks.userId, userId)));

    return { success: true };
  }
}
