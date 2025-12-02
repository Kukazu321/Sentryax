/**
 * User domain types
 * Aligned with Clerk user model + our custom fields
 */

export type SubscriptionTier = 'free' | 'starter' | 'growth' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  shopifyStoreUrl: string | null;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  shopifyStoreUrl?: string;
  subscriptionTier?: SubscriptionTier;
  subscriptionStatus?: SubscriptionStatus;
  stripeCustomerId?: string;
}

export interface UserSettings {
  userId: string;
  emailNotifications: boolean;
  slackNotifications: boolean;
  weeklyReports: boolean;
  instantAlerts: boolean;
  timezone: string;
}
