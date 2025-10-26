"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [storeInfo, setStoreInfo] = useState({
    name: "My Awesome Store",
    description: "We sell the best products at the best prices.",
    email: "contact@myawesomestore.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    logo: "/placeholder.svg?height=100&width=100",
  })

  const [notifications, setNotifications] = useState({
    orderPlaced: true,
    orderShipped: true,
    orderDelivered: true,
    orderCancelled: true,
    lowStock: true,
    productReviews: false,
    marketingEmails: false,
  })

  const [paymentMethods, setPaymentMethods] = useState({
    creditCard: true,
    paypal: true,
    applePay: false,
    googlePay: false,
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="store">Store Information</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Manage your store details and appearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      value={storeInfo.name}
                      onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email Address</Label>
                    <Input
                      id="store-email"
                      type="email"
                      value={storeInfo.email}
                      onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-description">Store Description</Label>
                  <Textarea
                    id="store-description"
                    value={storeInfo.description}
                    onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone Number</Label>
                    <Input
                      id="store-phone"
                      value={storeInfo.phone}
                      onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-address">Address</Label>
                    <Input
                      id="store-address"
                      value={storeInfo.address}
                      onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Store Logo</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={storeInfo.logo || "/placeholder.svg"}
                      alt="Store Logo"
                      className="h-16 w-16 rounded-md object-cover border"
                    />
                    <Button variant="outline">Change Logo</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Manage your payment methods and payout schedule.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Methods</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <input
                        type="checkbox"
                        id="credit-card"
                        className="h-4 w-4"
                        checked={paymentMethods.creditCard}
                        onChange={(e) => setPaymentMethods({ ...paymentMethods, creditCard: e.target.checked })}
                      />
                      <Label htmlFor="credit-card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <input
                        type="checkbox"
                        id="paypal"
                        className="h-4 w-4"
                        checked={paymentMethods.paypal}
                        onChange={(e) => setPaymentMethods({ ...paymentMethods, paypal: e.target.checked })}
                      />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <input
                        type="checkbox"
                        id="apple-pay"
                        className="h-4 w-4"
                        checked={paymentMethods.applePay}
                        onChange={(e) => setPaymentMethods({ ...paymentMethods, applePay: e.target.checked })}
                      />
                      <Label htmlFor="apple-pay">Apple Pay</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <input
                        type="checkbox"
                        id="google-pay"
                        className="h-4 w-4"
                        checked={paymentMethods.googlePay}
                        onChange={(e) => setPaymentMethods({ ...paymentMethods, googlePay: e.target.checked })}
                      />
                      <Label htmlFor="google-pay">Google Pay</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payout-schedule">Payout Schedule</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="payout-schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-account">Bank Account</Label>
                  <div className="border p-4 rounded-md">
                    <p className="text-sm">Connected Bank Account: •••• •••• •••• 1234</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Bank Account
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-information">Tax Information</Label>
                  <div className="border p-4 rounded-md">
                    <p className="text-sm">Tax ID: XX-XXXXXXX</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Update Tax Information
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose which notifications you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">Order Placed</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications when a new order is placed.</p>
                  </div>
                  <Switch
                    checked={notifications.orderPlaced}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, orderPlaced: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">Order Shipped</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications when an order is shipped.</p>
                  </div>
                  <Switch
                    checked={notifications.orderShipped}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, orderShipped: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">Order Delivered</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications when an order is delivered.</p>
                  </div>
                  <Switch
                    checked={notifications.orderDelivered}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, orderDelivered: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">Order Cancelled</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications when an order is cancelled.</p>
                  </div>
                  <Switch
                    checked={notifications.orderCancelled}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, orderCancelled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">Low Stock Alert</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications when product stock is low.</p>
                  </div>
                  <Switch
                    checked={notifications.lowStock}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">Product Reviews</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when a product receives a review.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.productReviews}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, productReviews: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">Receive marketing emails and promotions.</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account security and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="account-email">Email Address</Label>
                  <Input id="account-email" type="email" value="seller@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-password">Password</Label>
                  <div className="flex gap-2">
                    <Input id="account-password" type="password" value="••••••••" disabled />
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div>
                      <p className="font-medium">Protect your account with 2FA</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Connected Accounts</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          F
                        </div>
                        <div>
                          <p className="font-medium">Facebook</p>
                          <p className="text-xs text-muted-foreground">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          G
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-xs text-green-600">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          I
                        </div>
                        <div>
                          <p className="font-medium">Instagram</p>
                          <p className="text-xs text-muted-foreground">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
