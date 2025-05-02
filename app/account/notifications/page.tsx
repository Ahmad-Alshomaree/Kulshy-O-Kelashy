"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bell, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #12345 has been shipped and is on its way!",
      date: "2 hours ago",
      isRead: false,
      type: "order",
    },
    {
      id: 2,
      title: "Price Drop Alert",
      message: "A product in your wishlist is now on sale! Check it out before it's gone.",
      date: "Yesterday",
      isRead: true,
      type: "promotion",
    },
    {
      id: 3,
      title: "New Collection Available",
      message: "Our summer collection is now available. Shop the latest trends!",
      date: "3 days ago",
      isRead: true,
      type: "promotion",
    },
    {
      id: 4,
      title: "Order Delivered",
      message: "Your order #12340 has been delivered. Enjoy your purchase!",
      date: "1 week ago",
      isRead: true,
      type: "order",
    },
    {
      id: 5,
      title: "Account Security",
      message: "We noticed a login from a new device. Was this you?",
      date: "2 weeks ago",
      isRead: false,
      type: "account",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  if (!user) {
    return null // Don't render anything while redirecting
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <h1 className="text-3xl font-bold text-palette-darkGreen">Notifications</h1>
                  {unreadCount > 0 && <Badge className="ml-2 bg-palette-olive">{unreadCount} new</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-palette-olive border-palette-olive hover:bg-palette-olive hover:text-white"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark all read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    disabled={notifications.length === 0}
                    className="text-palette-olive border-palette-olive hover:bg-palette-olive hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear all
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="order">Orders</TabsTrigger>
                  <TabsTrigger value="promotion">Promotions</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  {renderNotifications(notifications, markAsRead, deleteNotification)}
                </TabsContent>

                <TabsContent value="order" className="mt-4">
                  {renderNotifications(
                    notifications.filter((n) => n.type === "order"),
                    markAsRead,
                    deleteNotification,
                  )}
                </TabsContent>

                <TabsContent value="promotion" className="mt-4">
                  {renderNotifications(
                    notifications.filter((n) => n.type === "promotion"),
                    markAsRead,
                    deleteNotification,
                  )}
                </TabsContent>

                <TabsContent value="account" className="mt-4">
                  {renderNotifications(
                    notifications.filter((n) => n.type === "account"),
                    markAsRead,
                    deleteNotification,
                  )}
                </TabsContent>
              </Tabs>

              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-palette-olive/10 rounded-full flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-palette-olive" />
                  </div>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-2">No notifications</h2>
                  <p className="text-palette-darkGreen/70">You don't have any notifications at the moment.</p>
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

function renderNotifications(
  notifications: any[],
  markAsRead: (id: number) => void,
  deleteNotification: (id: number) => void,
) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-palette-darkGreen/70">No notifications in this category.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: 5 }}
        >
          <Card className={`overflow-hidden ${!notification.isRead ? "border-l-4 border-l-palette-olive" : ""}`}>
            <CardContent className="p-0">
              <div className="p-4 flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-palette-darkGreen">{notification.title}</h3>
                    {!notification.isRead && <Badge className="bg-palette-olive">New</Badge>}
                  </div>
                  <p className="text-palette-darkGreen/70 text-sm mb-2">{notification.message}</p>
                  <p className="text-xs text-palette-darkGreen/50">{notification.date}</p>
                </div>
                <div className="flex items-start gap-2">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-palette-olive hover:text-palette-darkGreen hover:bg-palette-olive/10"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-palette-darkGreen/50 hover:text-red-500 hover:bg-red-50"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
