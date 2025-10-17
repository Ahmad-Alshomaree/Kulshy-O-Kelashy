"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function OrderConfirmationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const orderId = searchParams.get("orderId")
  const orderDate = searchParams.get("date")

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Redirect to home if no order ID (direct access to page)
  useEffect(() => {
    if (!orderId) {
      router.push("/")
    }
  }, [orderId, router])

  // Don't render anything until we check authentication
  if (!user || !orderId) {
    return null
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Order Details</h2>
            <span className="text-sm text-muted-foreground">{orderDate}</span>
          </div>

          <div className="space-y-2">
            <p>
              <span className="font-medium">Order Number:</span> {orderId}
            </p>
            <p>
              <span className="font-medium">Status:</span> Processing
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account/orders">
            <Button className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Track Your Order
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
