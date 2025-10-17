"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingBag, Package } from "lucide-react"

export function SellerOverview() {
  // Mock data - in a real app, this would come from an API or database
  const metrics = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+14.5%",
      trend: "up",
      icon: DollarSign,
      description: "Revenue this month",
    },
    {
      title: "New Customers",
      value: "132",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      description: "Customers this month",
    },
    {
      title: "Total Orders",
      value: "543",
      change: "+8.1%",
      trend: "up",
      icon: ShoppingBag,
      description: "Orders this month",
    },
    {
      title: "Products Sold",
      value: "876",
      change: "-2.5%",
      trend: "down",
      icon: Package,
      description: "Units sold this month",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
            <div className="flex items-center pt-1">
              {metric.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
