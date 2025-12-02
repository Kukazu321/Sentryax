import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq, and } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../core/database/database.module';
import { integrations, oauthStates } from '@pricewatch/db/schema';
import type { Database } from '@pricewatch/db';

/**
 * Integrations service
 * Handles OAuth flows for external services
 * Tokens should be encrypted before storage in production
 */
@Injectable()
export class IntegrationsService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
    private readonly configService: ConfigService
  ) {}

  async findAll(userId: string) {
    return this.db.query.integrations.findMany({
      where: eq(integrations.userId, userId),
      columns: {
        accessToken: false,
        refreshToken: false,
      },
    });
  }

  async getConnectUrl(userId: string, type: string, redirectUrl: string) {
    // Generate state for CSRF protection
    const state = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.db.insert(oauthStates).values({
      userId,
      integrationType: type as 'shopify' | 'meta_ads' | 'google_ads' | 'klaviyo' | 'gmail' | 'canva' | 'slack',
      state,
      redirectUrl,
      expiresAt,
    });

    // Return OAuth URL based on integration type
    // This is a placeholder - implement actual OAuth URLs
    const oauthUrls: Record<string, string> = {
      shopify: `https://shopify.com/oauth/authorize?client_id=${this.configService.get('SHOPIFY_CLIENT_ID')}&state=${state}`,
      meta_ads: `https://www.facebook.com/v18.0/dialog/oauth?client_id=${this.configService.get('META_APP_ID')}&state=${state}`,
      klaviyo: `https://www.klaviyo.com/oauth/authorize?client_id=${this.configService.get('KLAVIYO_CLIENT_ID')}&state=${state}`,
    };

    return {
      url: oauthUrls[type] || null,
      state,
    };
  }

  async handleCallback(type: string, code: string, state: string) {
    // Verify state
    const oauthState = await this.db.query.oauthStates.findFirst({
      where: eq(oauthStates.state, state),
    });

    if (!oauthState || oauthState.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired state');
    }

    // Exchange code for tokens (implement per integration)
    // This is a placeholder
    const tokens = await this.exchangeCodeForTokens(type, code);

    // Store integration
    const [integration] = await this.db
      .insert(integrations)
      .values({
        userId: oauthState.userId,
        type: type as 'shopify' | 'meta_ads' | 'google_ads' | 'klaviyo' | 'gmail' | 'canva' | 'slack',
        status: 'connected',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        scopes: tokens.scopes || [],
      })
      .returning();

    // Clean up state
    await this.db.delete(oauthStates).where(eq(oauthStates.id, oauthState.id));

    return {
      success: true,
      redirectUrl: oauthState.redirectUrl,
    };
  }

  async disconnect(userId: string, id: string) {
    const integration = await this.db.query.integrations.findFirst({
      where: and(eq(integrations.id, id), eq(integrations.userId, userId)),
    });

    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    await this.db
      .delete(integrations)
      .where(eq(integrations.id, id));

    return { success: true };
  }

  private async exchangeCodeForTokens(_type: string, _code: string) {
    // Implement OAuth token exchange per integration
    // This is a placeholder
    return {
      accessToken: 'placeholder',
      refreshToken: 'placeholder',
      expiresAt: new Date(Date.now() + 3600 * 1000),
      scopes: [],
    };
  }
}
