"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Users, UserPlus, RefreshCw, DollarSign } from "lucide-react"

// Mock data for demonstration
const generateCustomerMetrics = (timeRange: string) => {
  // Base values
  const baseCustomers = 1200
  const baseNewCustomers = 180
  const baseRepeatRate = 35
  const baseLtv = 320

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

  const totalCustomers = Math.round(baseCustomers * multiplier * randomFactor)
  const newCustomers = Math.round(baseNewCustomers * multiplier * randomFactor)
  const repeatRate = Math.round(baseRepeatRate * randomFactor)
  const ltv = Math.round(baseLtv * randomFactor)

  // Generate random trends (-10% to +20%)
  const customersTrend = Math.round(Math.random() * 30 - 10)
  const newCustomersTrend = Math.round(Math.random() * 30 - 10)
  const repeatRateTrend = Math.round(Math.random() * 30 - 10)
  const ltvTrend = Math.round(Math.random() * 30 - 10)

  return {
    totalCustomers,
    customersTrend,
    newCustomers,
    newCustomersTrend,
    repeatRate,
    repeatRateTrend,
    ltv,
    ltvTrend,
  }
}

interface CustomerMetricsProps {
  timeRange: string
}

export function CustomerMetrics({ timeRange }: CustomerMetricsProps) {
  const metrics = generateCustomerMetrics(timeRange)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalCustomers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {metrics.customersTrend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{metrics.customersTrend}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(metrics.customersTrend)}%</span>
              </>
            )}
            <span className="ml-1">from previous period</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.newCustomers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {metrics.newCustomersTrend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{metrics.newCustomersTrend}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(metrics.newCustomersTrend)}%</span>
              </>
            )}
            <span className="ml-1">from previous period</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Repeat Purchase Rate</CardTitle>
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.repeatRate}%</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {metrics.repeatRateTrend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{metrics.repeatRateTrend}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(metrics.repeatRateTrend)}%</span>
              </>
            )}
            <span className="ml-1">from previous period</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.ltv.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {metrics.ltvTrend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{metrics.ltvTrend}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(metrics.ltvTrend)}%</span>
              </>
            )}
            <span className="ml-1">from previous period</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
