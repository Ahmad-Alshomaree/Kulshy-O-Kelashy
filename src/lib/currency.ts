export type Currency = 'USD' | 'EUR' | 'TRY'

export interface CurrencyConfig {
  code: Currency
  symbol: string
  name: string
  exchangeRate: number // Rate relative to USD
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    exchangeRate: 1,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    exchangeRate: 0.92, // 1 USD = 0.92 EUR (update with real rates)
  },
  TRY: {
    code: 'TRY',
    symbol: '₺',
    name: 'Turkish Lira',
    exchangeRate: 32.5, // 1 USD = 32.5 TRY (update with real rates)
  },
}

export function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) return amount
  
  // Convert to USD first
  const amountInUSD = amount / CURRENCIES[fromCurrency].exchangeRate
  
  // Then convert to target currency
  return amountInUSD * CURRENCIES[toCurrency].exchangeRate
}

export function formatCurrency(amount: number, currency: Currency): string {
  const config = CURRENCIES[currency]
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES[currency].symbol
}

// Fetch live exchange rates (implement with real API like exchangerate-api.com)
export async function updateExchangeRates(): Promise<void> {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    // const data = await response.json()
    // Update CURRENCIES object with live rates
    console.log('Exchange rates updated')
  } catch (error) {
    console.error('Failed to update exchange rates:', error)
  }
}
