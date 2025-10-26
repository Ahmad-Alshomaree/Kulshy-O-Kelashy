"use client"

import { useEffect, useState } from "react"
import { useSession } from "@/lib/auth-client"
import { Package, ShoppingCart, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

interface AnalyticsData {
  totalSales: number
  ordersCount: number
  pendingOrdersCount: number
  processingOrdersCount: number
  shippedOrdersCount: number
  deliveredOrdersCount: number
  cancelledOrdersCount: number
  revenue: number
  averageOrderValue: number
}

export default function SellerDashboard() {
  const { data: session } = useSession()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("bearer_token")
        const response = await fetch("/api/seller/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch analytics")
        }

        const data = await response.json()
        setAnalytics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive font-medium">{error}</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: "Total Revenue",
      value: `$${analytics?.revenue.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      bgColor: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Total Orders",
      value: analytics?.ordersCount || 0,
      icon: ShoppingCart,
      bgColor: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Pending Orders",
      value: analytics?.pendingOrdersCount || 0,
      icon: Package,
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "Avg Order Value",
      value: `$${analytics?.averageOrderValue.toFixed(2) || "0.00"}`,
      icon: TrendingUp,
      bgColor: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  const orderStats = [
    { label: "Processing", count: analytics?.processingOrdersCount || 0, color: "bg-blue-500" },
    { label: "Shipped", count: analytics?.shippedOrdersCount || 0, color: "bg-indigo-500" },
    { label: "Delivered", count: analytics?.deliveredOrdersCount || 0, color: "bg-green-500" },
    { label: "Cancelled", count: analytics?.cancelledOrdersCount || 0, color: "bg-red-500" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session?.user?.name}! Here's an overview of your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status Breakdown */}
      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Order Status Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {orderStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className={`h-10 w-10 ${stat.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                {stat.count}
              </div>
              <div>
                <p className="font-medium">{stat.label}</p>
                <p className="text-sm text-muted-foreground">orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="/seller/products/new"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <Package className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">Add Product</p>
              <p className="text-sm text-muted-foreground">Create new product listing</p>
            </div>
          </a>
          <a
            href="/seller/orders"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <ShoppingCart className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">View Orders</p>
              <p className="text-sm text-muted-foreground">Manage customer orders</p>
            </div>
          </a>
          <a
            href="/seller/analytics"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">View Analytics</p>
              <p className="text-sm text-muted-foreground">Detailed insights</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
