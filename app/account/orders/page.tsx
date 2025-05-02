"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Package, Search, ChevronRight, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

export default function OrdersPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock order data
  const orders = [
    {
      id: "ORD-12345",
      date: "April 28, 2023",
      total: 129.99,
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Premium Cotton T-Shirt",
          quantity: 2,
          price: 29.99,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 2,
          name: "Wireless Earbuds",
          quantity: 1,
          price: 79.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-12344",
      date: "April 15, 2023",
      total: 89.99,
      status: "processing",
      items: [
        {
          id: 3,
          name: "Leather Crossbody Bag",
          quantity: 1,
          price: 89.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-12343",
      date: "March 22, 2023",
      total: 149.98,
      status: "delivered",
      items: [
        {
          id: 4,
          name: "Smart Watch",
          quantity: 1,
          price: 149.98,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-12342",
      date: "February 10, 2023",
      total: 24.99,
      status: "cancelled",
      items: [
        {
          id: 5,
          name: "Cotton T-Shirt",
          quantity: 1,
          price: 24.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
  ]

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (!user) {
    return null // Don't render anything while redirecting
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "processing":
        return <Badge className="bg-palette-olive">Processing</Badge>
      case "shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-6">
                <Link href="/account">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold text-palette-darkGreen">My Orders</h1>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-palette-darkGreen/50" />
                  <Input
                    placeholder="Search orders by ID or product name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-palette-darkGreen/70" />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px] border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <Link href={`/account/orders/${order.id}`}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-0">
                            <div className="p-4 border-b border-palette-taupe/20">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-palette-darkGreen">{order.id}</h3>
                                    {getStatusBadge(order.status)}
                                  </div>
                                  <p className="text-sm text-palette-darkGreen/70">{order.date}</p>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-4">
                                  <div className="text-right">
                                    <p className="text-sm text-palette-darkGreen/70">Total</p>
                                    <p className="font-semibold text-palette-darkGreen">${order.total.toFixed(2)}</p>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-palette-darkGreen/50" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex flex-wrap gap-4">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-3">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div>
                                      <p className="text-sm font-medium text-palette-darkGreen line-clamp-1">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-palette-darkGreen/70">
                                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-palette-olive/10 rounded-full flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-palette-olive" />
                  </div>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-2">No orders found</h2>
                  <p className="text-palette-darkGreen/70 mb-6">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search or filter"
                      : "You haven't placed any orders yet"}
                  </p>
                  <Link href="/products">
                    <Button className="bg-palette-olive hover:bg-palette-darkGreen text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <footer className="bg-palette-darkGreen text-white py-4 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70">© 2023 Kulshy O-Klashy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransitionWrapper>
  )
}
