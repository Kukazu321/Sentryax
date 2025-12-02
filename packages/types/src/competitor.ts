/**
 * Competitor domain types
 * Core entity for competitive intelligence tracking
 */

export type CompetitorStatus = 'active' | 'paused' | 'archived';
export type CompetitorType = 'direct' | 'indirect' | 'aspirational';

export interface Competitor {
  id: string;
  userId: string;
  name: string;
  domain: string;
  shopifyStoreUrl: string | null;
  logoUrl: string | null;
  type: CompetitorType;
  status: CompetitorStatus;
  notes: string | null;
  lastScannedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompetitorInput {
  name: string;
  domain: string;
  shopifyStoreUrl?: string;
  logoUrl?: string;
  type?: CompetitorType;
  notes?: string;
}

export interface UpdateCompetitorInput {
  name?: string;
  domain?: string;
  shopifyStoreUrl?: string;
  logoUrl?: string;
  type?: CompetitorType;
  status?: CompetitorStatus;
  notes?: string;
}

export interface CompetitorWithStats extends Competitor {
  totalScans: number;
  totalChangesDetected: number;
  lastChangeAt: Date | null;
}

export interface CompetitorProduct {
  id: string;
  competitorId: string;
  externalId: string;
  title: string;
  handle: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  imageUrl: string | null;
  productUrl: string;
  isAvailable: boolean;
  variants: CompetitorProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitorProductVariant {
  id: string;
  productId: string;
  externalId: string;
  title: string;
  sku: string | null;
  price: number;
  compareAtPrice: number | null;
  isAvailable: boolean;
  inventoryQuantity: number | null;
}
