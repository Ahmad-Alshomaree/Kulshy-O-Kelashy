"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Settings, ShoppingBag, Heart, CreditCard, LogOut, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // Don't render anything while redirecting
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuItems = [
    { icon: User, label: "Personal Information", href: "/account/personal-info" },
    { icon: ShoppingBag, label: "My Orders", href: "/account/orders" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: CreditCard, label: "Payment Methods", href: "/account/payment" },
    { icon: Settings, label: "Account Settings", href: "/settings" },
  ]

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold text-palette-darkGreen mb-6">My Account</h1>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-palette-olive text-white flex items-center justify-center text-2xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-palette-darkGreen">{user.name}</h2>
                      <p className="text-palette-darkGreen/70">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {menuItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-palette-darkGreen">{item.label}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-palette-darkGreen/50" />
                    </motion.div>
                  </Link>
                ))}

                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handleLogout}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-left w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                      <LogOut className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-palette-darkGreen">Log Out</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-palette-darkGreen/50" />
                </motion.button>
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
