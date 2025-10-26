"use client"

import { useEffect, useState } from "react"
import { Warehouse, Plus, Edit, Trash2, AlertCircle, Package } from "lucide-react"

interface Storage {
  id: number
  sellerId: string
  productId: number
  productName: string
  warehouseLocation: string
  currentStock: number
  reservedStock: number
  lastRestocked: string | null
  createdAt: string
  updatedAt: string
}

export default function SellerStorage() {
  const [storageRecords, setStorageRecords] = useState<Storage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStorage = async () => {
    try {
      const token = localStorage.getItem("bearer_token")
      const response = await fetch("/api/seller/storage?limit=50", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch storage records")
      }

      const data = await response.json()
      setStorageRecords(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load storage records")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStorage()
  }, [])

  const getStockStatus = (current: number, reserved: number) => {
    const available = current - reserved
    if (available <= 0) return { label: "Out of Stock", color: "bg-red-500" }
    if (available < 10) return { label: "Low Stock", color: "bg-yellow-500" }
    return { label: "In Stock", color: "bg-green-500" }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading storage records...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-destructive font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Storage Management</h1>
          <p className="text-muted-foreground mt-2">Track your inventory across warehouses</p>
        </div>
      </div>

      {storageRecords.length === 0 ? (
        <div className="bg-card rounded-lg border p-12 text-center">
          <Warehouse className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No storage records</h3>
          <p className="text-muted-foreground">Storage tracking will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {storageRecords.map((record) => {
            const stockStatus = getStockStatus(record.currentStock, record.reservedStock)
            const availableStock = record.currentStock - record.reservedStock

            return (
              <div key={record.id} className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{record.productName}</h3>
                      <p className="text-sm text-muted-foreground">{record.warehouseLocation}</p>
                    </div>
                  </div>
                  <span className={`${stockStatus.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {stockStatus.label}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Stock</p>
                    <p className="text-2xl font-bold mt-1">{record.currentStock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reserved</p>
                    <p className="text-2xl font-bold mt-1">{record.reservedStock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold mt-1">{availableStock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Restocked</p>
                    <p className="text-sm mt-1">
                      {record.lastRestocked
                        ? new Date(record.lastRestocked).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
