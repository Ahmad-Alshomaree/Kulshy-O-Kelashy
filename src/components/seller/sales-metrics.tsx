"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, DollarSign, ShoppingCart, CreditCard } from "lucide-react"

// Mock data for demonstration
const generateSalesMetrics = (timeRange: string) => {
  // Base values
  const baseRevenue = 15000
  const baseOrders = 350
  const baseAov = 120

  // Multipliers based on time range
  let multiplier = 1
  switch (timeRange) {
    case "7days":
      multiplier = 0.25
      break
    case "30days":
      multiplier = 1
      break
    case "90days":
      multiplier = 3
      break
    case "year":
      multiplier = 12
      break
    case "all":
      multiplier = 24
      break
  }

  // Add some randomness
  const randomFactor = 0.9 + Math.random() * 0.2

  const revenue = Math.round(baseRevenue * multiplier * randomFactor)
  const orders = Math.round(baseOrders * multiplier * randomFactor)
  const aov = Math.round(revenue / orders)

  // Generate random trends (-10% to +20%)
  const revenueTrend = Math.round(Math.random() * 30 - 10)
  const ordersTrend = Math.round(Math.random() * 30 - 10)
  const aovTrend = Math.round(Math.random() * 30 - 10)

  return {
    revenue,
    revenueTrend,
    orders,
    ordersTrend,
    aov,
    aovTrend,
  }
}

interface SalesMetricsProps {
  timeRange: string
}

export function SalesMetrics({ timeRange }: SalesMetricsProps) {
  const metrics = generateSalesMetrics(timeRange)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {metrics.revenueTrend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{metrics.revenueTrend}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(metrics.revenueTrend)}%</span>
              </>
            )}
            <span className="ml-1">from previous period</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.orders.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {metrics.ordersTrend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{metrics.ordersTrend}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(metrics.ordersTrend)}%</span>
              </>
            )}
            <span className="ml-1">from previous period</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.aov.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {metrics.aovTrend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{metrics.aovTrend}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(metrics.aovTrend)}%</span>
              </>
            )}
            <span className="ml-1">from previous period</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
