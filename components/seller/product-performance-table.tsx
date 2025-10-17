"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

// Mock data for demonstration
const generateProductData = (timeRange: string) => {
  const products = [
    { id: 1, name: "Premium T-Shirt", category: "Clothing", sku: "TS-001" },
    { id: 2, name: "Wireless Headphones", category: "Electronics", sku: "WH-002" },
    { id: 3, name: "Leather Wallet", category: "Accessories", sku: "LW-003" },
    { id: 4, name: "Smart Watch", category: "Electronics", sku: "SW-004" },
    { id: 5, name: "Yoga Mat", category: "Fitness", sku: "YM-005" },
    { id: 6, name: "Coffee Mug", category: "Home", sku: "CM-006" },
    { id: 7, name: "Bluetooth Speaker", category: "Electronics", sku: "BS-007" },
    { id: 8, name: "Sunglasses", category: "Accessories", sku: "SG-008" },
  ]

  // Generate random performance data
  return products
    .map((product) => {
      const sales = Math.floor(Math.random() * 500) + 50
      const revenue = sales * (Math.floor(Math.random() * 50) + 10)
      const profit = revenue * (Math.random() * 0.4 + 0.2) // 20-60% profit margin

      // Random trend direction
      const trendValue = Math.floor(Math.random() * 30) - 10 // -10% to +20%
      const trend = trendValue > 5 ? "up" : trendValue < -5 ? "down" : "neutral"

      return {
        ...product,
        sales,
        revenue,
        profit: Math.round(profit),
        trend,
        trendValue: Math.abs(trendValue),
      }
    })
    .sort((a, b) => b.revenue - a.revenue) // Sort by revenue
}

interface ProductPerformanceTableProps {
  timeRange: string
}

export function ProductPerformanceTable({ timeRange }: ProductPerformanceTableProps) {
  const products = generateProductData(timeRange)

  const getTrendBadge = (trend: string, value: number) => {
    switch (trend) {
      case "up":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1">
            <ArrowUp className="h-3 w-3" />
            {value}%
          </Badge>
        )
      case "down":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 flex items-center gap-1">
            <ArrowDown className="h-3 w-3" />
            {value}%
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center gap-1">
            <Minus className="h-3 w-3" />
            {value}%
          </Badge>
        )
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Profit</TableHead>
            <TableHead className="text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell className="text-right">{product.sales}</TableCell>
              <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
              <TableCell className="text-right">${product.profit.toLocaleString()}</TableCell>
              <TableCell className="text-right">{getTrendBadge(product.trend, product.trendValue)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
