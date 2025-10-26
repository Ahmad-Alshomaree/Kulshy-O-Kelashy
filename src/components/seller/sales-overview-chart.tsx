"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for demonstration
const generateSalesData = (timeRange: string) => {
  const data = []
  let days = 30

  switch (timeRange) {
    case "7days":
      days = 7
      break
    case "30days":
      days = 30
      break
    case "90days":
      days = 90
      break
    case "year":
      days = 365
      break
    default:
      days = 30
  }

  // Generate random data based on time range
  const baseRevenue = 1000
  const baseOrders = 20

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i - 1))

    // Add some randomness and trends
    const randomFactor = 0.5 + Math.random()
    const weekendBoost = date.getDay() === 0 || date.getDay() === 6 ? 1.2 : 1
    const trendFactor = 1 + (i / days) * 0.2 // Slight upward trend

    const revenue = Math.round(baseRevenue * randomFactor * weekendBoost * trendFactor)
    const orders = Math.round(baseOrders * randomFactor * weekendBoost * trendFactor)

    data.push({
      date: date.toISOString().split("T")[0],
      revenue,
      orders,
    })
  }

  return data
}

interface SalesOverviewChartProps {
  timeRange: string
}

export function SalesOverviewChart({ timeRange }: SalesOverviewChartProps) {
  const data = generateSalesData(timeRange)

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
        orders: {
          label: "Orders",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            }}
          />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            name="Revenue ($)"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" name="Orders" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
