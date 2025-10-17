"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Shield, Eye, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"

export default function PrivacySecurityPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [dataCollection, setDataCollection] = useState(true)
  const [activityTracking, setActivityTracking] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [securityUpdates, setSecurityUpdates] = useState(true)

  if (!user) {
    return null
  }

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your privacy and security settings have been updated.",
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
                <h1 className="text-3xl font-bold text-palette-darkGreen">Privacy & Security</h1>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                        <Eye className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-palette-darkGreen">Privacy Settings</CardTitle>
                        <CardDescription>Control how your information is used and shared</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Data Collection</h3>
                        <p className="text-sm text-palette-darkGreen/70">
                          Allow us to collect usage data to improve your experience
                        </p>
                      </div>
                      <Switch id="data-collection" checked={dataCollection} onCheckedChange={setDataCollection} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Activity Tracking</h3>
                        <p className="text-sm text-palette-darkGreen/70">
                          Track your browsing activity for personalized recommendations
                        </p>
                      </div>
                      <Switch id="activity-tracking" checked={activityTracking} onCheckedChange={setActivityTracking} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Marketing Emails</h3>
                        <p className="text-sm text-palette-darkGreen/70">
                          Receive emails about new products and promotions
                        </p>
                      </div>
                      <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-palette-darkGreen">Security Settings</CardTitle>
                        <CardDescription>Manage your account security preferences</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Login Alerts</h3>
                        <p className="text-sm text-palette-darkGreen/70">
                          Receive notifications for new login attempts
                        </p>
                      </div>
                      <Switch id="login-alerts" checked={loginAlerts} onCheckedChange={setLoginAlerts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Security Updates</h3>
                        <p className="text-sm text-palette-darkGreen/70">
                          Get notified about important security updates
                        </p>
                      </div>
                      <Switch id="security-updates" checked={securityUpdates} onCheckedChange={setSecurityUpdates} />
                    </div>
                    <div className="pt-2">
                      <Link href="/account/security/two-factor">
                        <Button
                          variant="outline"
                          className="w-full border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Manage Two-Factor Authentication
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-palette-darkGreen">Danger Zone</CardTitle>
                        <CardDescription>Irreversible account actions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-palette-darkGreen mb-2">Delete Account</h3>
                      <p className="text-sm text-palette-darkGreen/70 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button
                    className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
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
