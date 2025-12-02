/**
 * Webhook domain types
 * Incoming and outgoing webhook management
 */

export type WebhookDirection = 'incoming' | 'outgoing';
export type WebhookStatus = 'active' | 'inactive' | 'failed';

export interface Webhook {
  id: string;
  userId: string;
  direction: WebhookDirection;
  name: string;
  url: string;
  secret: string; // for signature verification
  events: WebhookEvent[];
  status: WebhookStatus;
  lastTriggeredAt: Date | null;
  failureCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type WebhookEvent = 
  | 'scan.completed'
  | 'scan.failed'
  | 'change.detected'
  | 'change.critical'
  | 'counter_attack.created'
  | 'counter_attack.executed'
  | 'counter_attack.failed'
  | 'competitor.added'
  | 'competitor.removed';

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: WebhookEvent;
  payload: Record<string, unknown>;
  responseStatus: number | null;
  responseBody: string | null;
  deliveredAt: Date | null;
  attempts: number;
  nextRetryAt: Date | null;
  createdAt: Date;
}

export interface CreateWebhookInput {
  direction: WebhookDirection;
  name: string;
  url: string;
  events: WebhookEvent[];
}

export interface UpdateWebhookInput {
  name?: string;
  url?: string;
  events?: WebhookEvent[];
  status?: WebhookStatus;
}

export interface WebhookPayload {
  id: string;
  event: WebhookEvent;
  timestamp: string;
  data: Record<string, unknown>;
}
