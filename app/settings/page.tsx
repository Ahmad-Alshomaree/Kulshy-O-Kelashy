"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bell, Shield, Moon, Sun, Globe, CreditCard, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // Don't render anything while redirecting
  }

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Privacy & Security", href: "/settings/privacy" },
        { icon: CreditCard, label: "Payment Methods", href: "/settings/payment" },
        { icon: Globe, label: "Language", href: "/settings/language" },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          component: (
            <div className="flex items-center space-x-2">
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              <Label htmlFor="notifications" className="sr-only">
                Notifications
              </Label>
            </div>
          ),
        },
        {
          icon: darkMode ? Moon : Sun,
          label: "Dark Mode",
          component: (
            <div className="flex items-center space-x-2">
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode
              </Label>
            </div>
          ),
        },
      ],
    },
  ]

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold text-palette-darkGreen mb-6">Settings</h1>

              {settingsSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">{section.title}</h2>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="p-4">
                            {item.href ? (
                              <Link href={item.href}>
                                <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                                      <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-palette-darkGreen">{item.label}</span>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-palette-darkGreen/50" />
                                </motion.div>
                              </Link>
                            ) : (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                                    <item.icon className="h-5 w-5" />
                                  </div>
                                  <span className="font-medium text-palette-darkGreen">{item.label}</span>
                                </div>
                                {item.component}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}

              <div className="mt-8">
                <Button
                  variant="outline"
                  className="w-full border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                  onClick={() => router.push("/account")}
                >
                  Back to Account
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
