"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CURRENCIES, Currency } from '@/lib/currency'
import { useCurrencyStore } from '@/stores/currency-store'

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrencyStore()

  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(CURRENCIES).map(([code, config]) => (
          <SelectItem key={code} value={code}>
            {config.symbol} {code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
