"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bell, Mail, ShoppingBag, Tag, Heart, Gift, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    accountAlerts: true,
    newProducts: false,
    wishlistUpdates: true,
  })
  const [pushNotifications, setPushNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    accountAlerts: true,
    newProducts: false,
    wishlistUpdates: true,
  })

  if (!user) {
    return null
  }

  const handleSaveChanges = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center mb-6">
                <Link href="/settings">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold text-palette-darkGreen">Notifications</h1>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-palette-darkGreen">Notification Preferences</CardTitle>
                      <CardDescription>Manage how and when you receive notifications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="email" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Email
                      </TabsTrigger>
                      <TabsTrigger value="push" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" /> Push
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="email">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <ShoppingBag className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Order Updates</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive emails about your order status
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="email-order-updates"
                            checked={emailNotifications.orderUpdates}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({ ...emailNotifications, orderUpdates: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <Tag className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Promotions & Discounts</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive emails about sales and special offers
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="email-promotions"
                            checked={emailNotifications.promotions}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({ ...emailNotifications, promotions: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Account Alerts</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive emails about account activity and security
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="email-account-alerts"
                            checked={emailNotifications.accountAlerts}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({ ...emailNotifications, accountAlerts: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <Gift className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">New Products</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive emails about new product launches
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="email-new-products"
                            checked={emailNotifications.newProducts}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({ ...emailNotifications, newProducts: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <Heart className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Wishlist Updates</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive emails when wishlist items change price or come back in stock
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="email-wishlist-updates"
                            checked={emailNotifications.wishlistUpdates}
                            onCheckedChange={(checked) =>
                              setEmailNotifications({ ...emailNotifications, wishlistUpdates: checked })
                            }
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="push">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <ShoppingBag className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Order Updates</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive push notifications about your order status
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="push-order-updates"
                            checked={pushNotifications.orderUpdates}
                            onCheckedChange={(checked) =>
                              setPushNotifications({ ...pushNotifications, orderUpdates: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <Tag className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Promotions & Discounts</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive push notifications about sales and special offers
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="push-promotions"
                            checked={pushNotifications.promotions}
                            onCheckedChange={(checked) =>
                              setPushNotifications({ ...pushNotifications, promotions: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Account Alerts</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive push notifications about account activity and security
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="push-account-alerts"
                            checked={pushNotifications.accountAlerts}
                            onCheckedChange={(checked) =>
                              setPushNotifications({ ...pushNotifications, accountAlerts: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <Gift className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">New Products</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive push notifications about new product launches
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="push-new-products"
                            checked={pushNotifications.newProducts}
                            onCheckedChange={(checked) =>
                              setPushNotifications({ ...pushNotifications, newProducts: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <Heart className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Wishlist Updates</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                Receive push notifications when wishlist items change price or come back in stock
                              </p>
                            </div>
                          </div>
                          <Switch
                            id="push-wishlist-updates"
                            checked={pushNotifications.wishlistUpdates}
                            onCheckedChange={(checked) =>
                              setPushNotifications({ ...pushNotifications, wishlistUpdates: checked })
                            }
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-palette-darkGreen">Email Frequency</CardTitle>
                  <CardDescription>Control how often you receive marketing emails</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="daily" name="frequency" className="text-palette-olive" />
                      <Label htmlFor="daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="weekly" name="frequency" className="text-palette-olive" defaultChecked />
                      <Label htmlFor="weekly">Weekly digest</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="monthly" name="frequency" className="text-palette-olive" />
                      <Label htmlFor="monthly">Monthly newsletter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="important" name="frequency" className="text-palette-olive" />
                      <Label htmlFor="important">Important announcements only</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="bg-palette-olive hover:bg-palette-darkGreen text-white" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
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
