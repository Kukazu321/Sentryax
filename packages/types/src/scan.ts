/**
 * Scan domain types
 * Represents periodic scans of competitor data
 */

export type ScanStatus = 'pending' | 'running' | 'completed' | 'failed';
export type ScanType = 'full' | 'incremental' | 'products' | 'pricing' | 'ads' | 'social';
export type ChangeType = 'price_change' | 'new_product' | 'removed_product' | 'stock_change' | 'ad_change' | 'content_change';
export type ChangeSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Scan {
  id: string;
  competitorId: string;
  userId: string;
  type: ScanType;
  status: ScanStatus;
  startedAt: Date | null;
  completedAt: Date | null;
  errorMessage: string | null;
  metadata: ScanMetadata | null;
  createdAt: Date;
}

export interface ScanMetadata {
  productsScanned?: number;
  changesDetected?: number;
  duration?: number; // in milliseconds
  source?: string;
}

export interface ScanResult {
  id: string;
  scanId: string;
  competitorId: string;
  changeType: ChangeType;
  severity: ChangeSeverity;
  entityType: 'product' | 'variant' | 'ad' | 'content';
  entityId: string;
  previousValue: string | null;
  newValue: string | null;
  diff: Record<string, unknown> | null;
  createdAt: Date;
}

export interface ScanSchedule {
  id: string;
  userId: string;
  competitorId: string | null; // null = all competitors
  type: ScanType;
  cronExpression: string;
  isActive: boolean;
  lastRunAt: Date | null;
  nextRunAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateScanInput {
  competitorId: string;
  type: ScanType;
}

export interface ScanWithResults extends Scan {
  results: ScanResult[];
  competitor: {
    id: string;
    name: string;
    domain: string;
  };
}
