import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../core/database/database.module';
import { users, userSettings } from '../../../../../packages/db/src/schema';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type * as schema from '../../../../../packages/db/src/schema';

type Database = PostgresJsDatabase<typeof schema>;

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database
  ) {}

  async findByClerkId(clerkId: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(data: {
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  }) {
    const [user] = await this.db.insert(users).values(data).returning();
    
    // Create default settings
    await this.db.insert(userSettings).values({ userId: user.id });
    
    return user;
  }

  async updateByClerkId(clerkId: string, data: Partial<typeof users.$inferInsert>) {
    const user = await this.findByClerkId(clerkId);
    
    const [updated] = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, user.id))
      .returning();

    return updated;
  }

  async getSettings(clerkId: string) {
    const user = await this.findByClerkId(clerkId);
    
    const settings = await this.db.query.userSettings.findFirst({
      where: eq(userSettings.userId, user.id),
    });

    return settings;
  }

  async upsertFromClerk(clerkUser: {
    id: string;
    emailAddresses: { emailAddress: string }[];
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  }) {
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) throw new Error('User has no email');

    const existing = await this.db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id),
    });

    if (existing) {
      return this.updateByClerkId(clerkUser.id, {
        email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        avatarUrl: clerkUser.imageUrl,
      });
    }

    return this.create({
      clerkId: clerkUser.id,
      email,
      firstName: clerkUser.firstName ?? undefined,
      lastName: clerkUser.lastName ?? undefined,
      avatarUrl: clerkUser.imageUrl ?? undefined,
    });
  }
}
