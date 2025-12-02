/**
 * Integration domain types
 * External service connections (Shopify, Meta, Klaviyo, etc.)
 */

export type IntegrationType = 
  | 'shopify' 
  | 'meta_ads' 
  | 'google_ads' 
  | 'klaviyo' 
  | 'gmail' 
  | 'canva' 
  | 'slack';

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending';

export interface Integration {
  id: string;
  userId: string;
  type: IntegrationType;
  status: IntegrationStatus;
  externalAccountId: string | null;
  externalAccountName: string | null;
  accessToken: string; // encrypted
  refreshToken: string | null; // encrypted
  tokenExpiresAt: Date | null;
  scopes: string[];
  metadata: Record<string, unknown> | null;
  lastSyncAt: Date | null;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIntegrationInput {
  type: IntegrationType;
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  scopes?: string[];
  externalAccountId?: string;
  externalAccountName?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateIntegrationInput {
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  status?: IntegrationStatus;
  scopes?: string[];
  metadata?: Record<string, unknown>;
  lastSyncAt?: Date;
  errorMessage?: string;
}

// OAuth flow types
export interface OAuthState {
  userId: string;
  integrationType: IntegrationType;
  redirectUrl: string;
  expiresAt: Date;
}

export interface OAuthCallback {
  code: string;
  state: string;
}

// Shopify specific
export interface ShopifyShop {
  id: string;
  name: string;
  domain: string;
  email: string;
  currency: string;
  timezone: string;
}

// Meta Ads specific
export interface MetaAdAccount {
  id: string;
  name: string;
  currency: string;
  status: string;
}
