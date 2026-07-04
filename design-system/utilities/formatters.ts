/**
 * design-system/utilities/formatters.ts
 * Number and currency formatting utilities.
 */

/**
 * Formats a number to currency string, e.g. 12450.5 -> $12,450.50
 */
export function formatCurrency(value: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Formats a number with comma separators.
 */
export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Formats a percentage value.
 */
export function formatPercent(value: number, decimals: number = 1, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}
