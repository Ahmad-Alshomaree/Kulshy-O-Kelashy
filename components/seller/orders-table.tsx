"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Truck, Package, CheckCircle, XCircle } from "lucide-react"

interface Order {
  id: string
  customer: string
  date: string
  status: string
  total: string
  items: number
  paymentStatus: string
}

interface OrdersTableProps {
  orders: Order[]
  searchTerm: string
}

export function OrdersTable({ orders, searchTerm }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Processing
          </Badge>
        )
      case "Shipped":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Shipped
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Delivered
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Cancelled
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Paid
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Pending
          </Badge>
        )
      case "Refunded":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Refunded
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Package className="h-4 w-4 text-blue-500" />
      case "Shipped":
        return <Truck className="h-4 w-4 text-amber-500" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        {selectedOrder && (
                          <>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                Order {selectedOrder.id}
                                {getStatusBadge(selectedOrder.status)}
                              </DialogTitle>
                              <DialogDescription>
                                Placed on {new Date(selectedOrder.date).toLocaleDateString()} by{" "}
                                {selectedOrder.customer}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Customer Information</h3>
                                  <div className="border rounded-md p-3 text-sm">
                                    <p className="font-medium">{selectedOrder.customer}</p>
                                    <p className="text-muted-foreground">customer@example.com</p>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                                  <div className="border rounded-md p-3 text-sm">
                                    <p className="font-medium">{selectedOrder.customer}</p>
                                    <p className="text-muted-foreground">123 Main Street</p>
                                    <p className="text-muted-foreground">Apt 4B</p>
                                    <p className="text-muted-foreground">New York, NY 10001</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium mb-2">Order Items</h3>
                                <div className="border rounded-md overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {/* Mock order items */}
                                      <TableRow>
                                        <TableCell>
                                          <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-gray-100 rounded"></div>
                                            <div>
                                              <p className="font-medium">Product Name</p>
                                              <p className="text-xs text-muted-foreground">SKU: PRD-001</p>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>$49.99</TableCell>
                                        <TableCell className="text-right">$49.99</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>
                                          <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-gray-100 rounded"></div>
                                            <div>
                                              <p className="font-medium">Another Product</p>
                                              <p className="text-xs text-muted-foreground">SKU: PRD-002</p>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>$29.99</TableCell>
                                        <TableCell className="text-right">$59.98</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Payment Information</h3>
                                  <div className="border rounded-md p-3 text-sm">
                                    <p>
                                      <span className="text-muted-foreground">Method:</span> Credit Card
                                    </p>
                                    <p>
                                      <span className="text-muted-foreground">Card:</span> •••• •••• •••• 4242
                                    </p>
                                    <p>
                                      <span className="text-muted-foreground">Status:</span>{" "}
                                      {selectedOrder.paymentStatus}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Order Summary</h3>
                                  <div className="border rounded-md p-3 text-sm">
                                    <div className="flex justify-between py-1">
                                      <span className="text-muted-foreground">Subtotal:</span>
                                      <span>$109.97</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="text-muted-foreground">Shipping:</span>
                                      <span>$10.00</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="text-muted-foreground">Tax:</span>
                                      <span>$10.02</span>
                                    </div>
                                    <div className="flex justify-between py-1 font-medium border-t mt-1 pt-2">
                                      <span>Total:</span>
                                      <span>{selectedOrder.total}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between">
                                <div className="flex gap-2">
                                  <Button variant="outline">Print Order</Button>
                                  <Button variant="outline">Email Invoice</Button>
                                </div>
                                <div className="flex gap-2">
                                  {selectedOrder.status === "Processing" && <Button>Mark as Shipped</Button>}
                                  {selectedOrder.status === "Shipped" && <Button>Mark as Delivered</Button>}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
