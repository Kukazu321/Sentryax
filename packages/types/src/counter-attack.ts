/**
 * Counter-Attack domain types
 * Automated responses to competitor changes
 */

export type CounterAttackType = 
  | 'price_match' 
  | 'price_undercut' 
  | 'ad_campaign' 
  | 'email_campaign' 
  | 'social_post'
  | 'discount_code';

export type CounterAttackStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'executing' 
  | 'completed' 
  | 'failed' 
  | 'canceled';

export type TriggerCondition = 
  | 'price_drop' 
  | 'price_increase' 
  | 'new_product' 
  | 'stock_out' 
  | 'new_ad' 
  | 'manual';

export interface CounterAttack {
  id: string;
  userId: string;
  scanResultId: string | null;
  competitorId: string;
  type: CounterAttackType;
  status: CounterAttackStatus;
  triggerCondition: TriggerCondition;
  config: CounterAttackConfig;
  executedAt: Date | null;
  result: CounterAttackResult | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CounterAttackConfig {
  // Price match/undercut
  priceAdjustment?: {
    type: 'match' | 'undercut' | 'percentage';
    value?: number; // percentage or fixed amount
    minPrice?: number;
    maxDiscount?: number;
  };
  // Ad campaign
  adCampaign?: {
    platform: 'meta' | 'google' | 'tiktok';
    budget: number;
    duration: number; // in days
    targetAudience?: string;
  };
  // Email campaign
  emailCampaign?: {
    templateId: string;
    subject: string;
    segmentId?: string;
  };
  // Social post
  socialPost?: {
    platforms: ('instagram' | 'facebook' | 'twitter')[];
    content: string;
    mediaUrls?: string[];
  };
  // Discount code
  discountCode?: {
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    expiresAt: Date;
  };
}

export interface CounterAttackResult {
  success: boolean;
  message: string;
  externalIds?: Record<string, string>;
  metrics?: {
    reach?: number;
    clicks?: number;
    conversions?: number;
  };
}

export interface CreateCounterAttackInput {
  competitorId: string;
  scanResultId?: string;
  type: CounterAttackType;
  triggerCondition: TriggerCondition;
  config: CounterAttackConfig;
}

export interface CounterAttackRule {
  id: string;
  userId: string;
  competitorId: string | null; // null = all competitors
  name: string;
  description: string | null;
  triggerCondition: TriggerCondition;
  triggerThreshold: Record<string, unknown> | null;
  counterAttackType: CounterAttackType;
  counterAttackConfig: CounterAttackConfig;
  requiresApproval: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
