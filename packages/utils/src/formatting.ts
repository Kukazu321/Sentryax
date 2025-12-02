/**
 * Formatting utilities
 * Consistent formatting across the app
 */

// Currency formatting
export function formatCurrency(
  amount: number,
  currency = 'EUR',
  locale = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

// Percentage formatting
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Price change formatting with sign
export function formatPriceChange(
  oldPrice: number,
  newPrice: number,
  currency = 'EUR'
): { formatted: string; percentage: string; direction: 'up' | 'down' | 'same' } {
  const diff = newPrice - oldPrice;
  const percentage = oldPrice > 0 ? ((diff / oldPrice) * 100) : 0;
  
  let direction: 'up' | 'down' | 'same' = 'same';
  if (diff > 0) direction = 'up';
  if (diff < 0) direction = 'down';

  const sign = diff > 0 ? '+' : '';
  
  return {
    formatted: `${sign}${formatCurrency(diff, currency)}`,
    percentage: `${sign}${formatPercentage(percentage)}`,
    direction,
  };
}

// Date formatting
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  locale = 'fr-FR'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(d);
}

// Relative time formatting
export function formatRelativeTime(date: Date | string, locale = 'fr-FR'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffDays > 0) return rtf.format(-diffDays, 'day');
  if (diffHours > 0) return rtf.format(-diffHours, 'hour');
  if (diffMins > 0) return rtf.format(-diffMins, 'minute');
  return rtf.format(-diffSecs, 'second');
}

// Number formatting with abbreviation (1K, 1M, etc.)
export function formatNumber(num: number, locale = 'fr-FR'): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat(locale).format(num);
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

// Slugify text for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Domain extraction from URL
export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
