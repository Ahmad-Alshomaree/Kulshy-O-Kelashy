import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, ShoppingCart, AlertTriangle, CheckCircle, MessageSquare } from "lucide-react"

export function SellerNotifications() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="orders">
            Orders
            <Badge variant="secondary" className="ml-2">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts
            <Badge variant="secondary" className="ml-2">
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            <Badge variant="secondary" className="ml-2">
              5
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all your recent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">New Order Received</h3>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Order #1234 has been placed for $129.99</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Order
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Low Stock Alert</h3>
                      <span className="text-xs text-muted-foreground">5 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Product "Wireless Headphones" is running low on stock (only 3 left)
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Update Inventory
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">New Customer Message</h3>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">John Doe has a question about their recent order</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Payment Received</h3>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Payment of $1,234.56 has been deposited to your account
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Transaction
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Notifications</CardTitle>
              <CardDescription>View notifications related to your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">New Order Received</h3>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Order #1234 has been placed for $129.99</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Order
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Order Shipped</h3>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Order #1230 has been shipped to the customer</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Track Shipment
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Order Delivered</h3>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Order #1225 has been successfully delivered to the customer
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert Notifications</CardTitle>
              <CardDescription>View important alerts about your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Low Stock Alert</h3>
                      <span className="text-xs text-muted-foreground">5 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Product "Wireless Headphones" is running low on stock (only 3 left)
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Update Inventory
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Payment Failed</h3>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Payment for order #1228 has failed. Customer has been notified.
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Message Notifications</CardTitle>
              <CardDescription>View messages from customers and the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">New Customer Message</h3>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">John Doe has a question about their recent order</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Product Question</h3>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Jane Smith has a question about product specifications
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Platform Update</h3>
                      <span className="text-xs text-muted-foreground">3 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      New features have been added to the seller dashboard
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Return Request</h3>
                      <span className="text-xs text-muted-foreground">4 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Customer has requested a return for order #1220</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Process Return
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Promotion Opportunity</h3>
                      <span className="text-xs text-muted-foreground">5 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your products are eligible for the upcoming summer sale promotion
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
