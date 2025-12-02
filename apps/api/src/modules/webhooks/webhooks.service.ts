import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq, and } from 'drizzle-orm';
import { createHmac } from 'crypto';
import { DATABASE_CONNECTION } from '../../core/database/database.module';
import { webhooks } from '@pricewatch/db/schema';
import type { Database } from '@pricewatch/db';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhooksService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
    private readonly configService: ConfigService
  ) {}

  async findAll(userId: string) {
    return this.db.query.webhooks.findMany({
      where: eq(webhooks.userId, userId),
      columns: {
        secret: false, // Don't expose secrets
      },
    });
  }

  async create(userId: string, data: CreateWebhookDto) {
    const secret = this.generateSecret();

    const [webhook] = await this.db
      .insert(webhooks)
      .values({
        userId,
        ...data,
        secret,
      })
      .returning();

    return {
      ...webhook,
      secret, // Return secret only on creation
    };
  }

  async update(userId: string, id: string, data: UpdateWebhookDto) {
    const webhook = await this.db.query.webhooks.findFirst({
      where: and(eq(webhooks.id, id), eq(webhooks.userId, userId)),
    });

    if (!webhook) {
      throw new NotFoundException('Webhook not found');
    }

    const [updated] = await this.db
      .update(webhooks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(webhooks.id, id))
      .returning();

    return updated;
  }

  async remove(userId: string, id: string) {
    const webhook = await this.db.query.webhooks.findFirst({
      where: and(eq(webhooks.id, id), eq(webhooks.userId, userId)),
    });

    if (!webhook) {
      throw new NotFoundException('Webhook not found');
    }

    await this.db.delete(webhooks).where(eq(webhooks.id, id));

    return { success: true };
  }

  async handleIncoming(provider: string, signature: string, rawBody: Buffer | undefined) {
    if (!rawBody) {
      throw new BadRequestException('Missing request body');
    }

    // Verify signature based on provider
    const isValid = await this.verifySignature(provider, signature, rawBody);
    if (!isValid) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const payload = JSON.parse(rawBody.toString());

    // Handle different providers
    switch (provider) {
      case 'clerk':
        return this.handleClerkWebhook(payload);
      case 'stripe':
        return this.handleStripeWebhook(payload);
      default:
        throw new BadRequestException(`Unknown provider: ${provider}`);
    }
  }

  private async verifySignature(
    provider: string,
    signature: string,
    rawBody: Buffer
  ): Promise<boolean> {
    const secrets: Record<string, string | undefined> = {
      clerk: this.configService.get('CLERK_WEBHOOK_SECRET'),
      stripe: this.configService.get('STRIPE_WEBHOOK_SECRET'),
    };

    const secret = secrets[provider];
    if (!secret) return false;

    const expectedSignature = createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    return signature === expectedSignature;
  }

  private async handleClerkWebhook(payload: Record<string, unknown>) {
    // Handle Clerk user events (user.created, user.updated, etc.)
    // Sync with local database
    return { received: true };
  }

  private async handleStripeWebhook(payload: Record<string, unknown>) {
    // Handle Stripe events (subscription updates, payments, etc.)
    return { received: true };
  }

  private generateSecret(): string {
    return `whsec_${crypto.randomUUID().replace(/-/g, '')}`;
  }
}
