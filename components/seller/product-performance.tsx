"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export function ProductPerformance() {
  // Mock data for product performance
  const products = [
    {
      id: 1,
      name: "Wireless Gaming Controller",
      category: "Electronics",
      price: "$49.99",
      stock: 24,
      sales: 156,
      revenue: "$7,798.44",
      trend: "up",
      change: "+12.5%",
    },
    {
      id: 2,
      name: "RGB Mechanical Keyboard",
      category: "Electronics",
      price: "$89.99",
      stock: 18,
      sales: 132,
      revenue: "$11,878.68",
      trend: "up",
      change: "+8.3%",
    },
    {
      id: 3,
      name: "27-inch Gaming Monitor",
      category: "Electronics",
      price: "$299.99",
      stock: 7,
      sales: 45,
      revenue: "$13,499.55",
      trend: "down",
      change: "-3.2%",
    },
    {
      id: 4,
      name: "Modern Dining Chair",
      category: "Furniture",
      price: "$129.99",
      stock: 32,
      sales: 28,
      revenue: "$3,639.72",
      trend: "neutral",
      change: "0%",
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      category: "Furniture",
      price: "$199.99",
      stock: 15,
      sales: 42,
      revenue: "$8,399.58",
      trend: "up",
      change: "+5.7%",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Badge variant={product.stock < 10 ? "destructive" : "outline"}>{product.stock}</Badge>
              </TableCell>
              <TableCell>{product.sales}</TableCell>
              <TableCell>{product.revenue}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {product.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  ) : product.trend === "down" ? (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                  ) : (
                    <Minus className="mr-1 h-4 w-4 text-gray-500" />
                  )}
                  <span
                    className={
                      product.trend === "up"
                        ? "text-green-500"
                        : product.trend === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                    }
                  >
                    {product.change}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
