"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, MapPin, Monitor, Smartphone, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

// Mock data for login history
const loginHistory = [
  {
    id: 1,
    date: "May 5, 2023 - 10:23 AM",
    device: "Desktop - Chrome",
    location: "New York, USA",
    ip: "192.168.1.1",
    status: "success",
    current: true,
    deviceType: "laptop",
  },
  {
    id: 2,
    date: "May 3, 2023 - 3:45 PM",
    device: "iPhone - Safari",
    location: "New York, USA",
    ip: "192.168.1.1",
    status: "success",
    current: false,
    deviceType: "smartphone",
  },
  {
    id: 3,
    date: "April 29, 2023 - 8:12 AM",
    device: "Desktop - Firefox",
    location: "Boston, USA",
    ip: "192.168.2.3",
    status: "success",
    current: false,
    deviceType: "laptop",
  },
  {
    id: 4,
    date: "April 27, 2023 - 11:30 PM",
    device: "iPad - Safari",
    location: "Chicago, USA",
    ip: "192.168.4.5",
    status: "success",
    current: false,
    deviceType: "tablet",
  },
  {
    id: 5,
    date: "April 25, 2023 - 7:18 AM",
    device: "Unknown Device",
    location: "London, UK",
    ip: "192.168.7.8",
    status: "failed",
    current: false,
    deviceType: "monitor",
  },
]

export default function LoginHistoryPage() {
  const { toast } = useToast()

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "smartphone":
        return <Smartphone className="h-5 w-5" />
      case "tablet":
        return <Smartphone className="h-5 w-5" />
      case "laptop":
        return <Laptop className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const handleSignOutAllDevices = () => {
    toast({
      title: "Signed out from all devices",
      description: "You have been signed out from all other devices.",
    })
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-6">
                <Link href="/account/personal-info">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold text-palette-darkGreen">Login History</h1>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-palette-olive" />
                    Recent Login Activity
                  </CardTitle>
                  <CardDescription>
                    Review your recent login activity to ensure your account hasn't been compromised.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-palette-darkGreen/70">
                        If you notice any suspicious activity, please change your password immediately and contact
                        support.
                      </p>
                      <Button
                        onClick={handleSignOutAllDevices}
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        Sign Out All Devices
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {loginHistory.map((login) => (
                        <div
                          key={login.id}
                          className={`border ${login.current ? "border-palette-olive/30 bg-palette-cream/30" : "border-palette-taupe/20"} rounded-lg p-4`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                                login.status === "success"
                                  ? "bg-palette-olive/10 text-palette-olive"
                                  : "bg-red-100 text-red-500"
                              }`}
                            >
                              {getDeviceIcon(login.deviceType)}
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-palette-darkGreen">{login.device}</h3>
                                    {login.current && (
                                      <Badge
                                        variant="outline"
                                        className="bg-palette-olive/10 text-palette-olive border-palette-olive/30"
                                      >
                                        Current Session
                                      </Badge>
                                    )}
                                    {login.status === "failed" && (
                                      <Badge variant="outline" className="bg-red-100 text-red-500 border-red-200">
                                        Failed Login
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-palette-darkGreen/70">{login.date}</p>
                                </div>

                                {login.status === "success" && !login.current && (
                                  <Button variant="ghost" size="sm" className="text-red-500 h-8">
                                    Sign Out
                                  </Button>
                                )}
                              </div>

                              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                  <MapPin className="h-4 w-4" />
                                  <span>{login.location}</span>
                                </div>
                                <div className="text-palette-darkGreen/70">IP Address: {login.ip}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-palette-darkGreen mb-2">Security Tips</h3>
                    <ul className="space-y-2 text-sm text-palette-darkGreen/70">
                      <li>• Always sign out when using shared or public computers</li>
                      <li>• Enable two-factor authentication for additional security</li>
                      <li>• Use a strong, unique password for your account</li>
                      <li>• Regularly check your login history for suspicious activity</li>
                    </ul>
                  </CardContent>
                </Card>
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
