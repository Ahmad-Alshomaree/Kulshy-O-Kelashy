"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Link2, Facebook, Twitter, ChromeIcon as Google, Apple, Github, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

// Mock data for connected accounts
const initialConnectedAccounts = [
  {
    id: "google",
    name: "Google",
    connected: true,
    email: "john.doe@gmail.com",
    icon: Google,
    color: "bg-red-500",
  },
  {
    id: "facebook",
    name: "Facebook",
    connected: true,
    email: "john.doe@facebook.com",
    icon: Facebook,
    color: "bg-blue-600",
  },
  {
    id: "apple",
    name: "Apple",
    connected: false,
    email: "",
    icon: Apple,
    color: "bg-gray-800",
  },
  {
    id: "twitter",
    name: "Twitter",
    connected: false,
    email: "",
    icon: Twitter,
    color: "bg-blue-400",
  },
  {
    id: "github",
    name: "GitHub",
    connected: false,
    email: "",
    icon: Github,
    color: "bg-gray-900",
  },
]

export default function ConnectedAccountsPage() {
  const { toast } = useToast()
  const [connectedAccounts, setConnectedAccounts] = useState(initialConnectedAccounts)
  const [loginWithOptions, setLoginWithOptions] = useState({
    google: true,
    facebook: true,
    apple: false,
    twitter: false,
    github: false,
  })

  const handleConnect = (id: string) => {
    setConnectedAccounts((accounts) =>
      accounts.map((account) =>
        account.id === id ? { ...account, connected: true, email: `john.doe@${id}.com` } : account,
      ),
    )

    toast({
      title: "Account connected",
      description: `Your ${id.charAt(0).toUpperCase() + id.slice(1)} account has been connected.`,
    })
  }

  const handleDisconnect = (id: string) => {
    setConnectedAccounts((accounts) =>
      accounts.map((account) => (account.id === id ? { ...account, connected: false, email: "" } : account)),
    )

    toast({
      title: "Account disconnected",
      description: `Your ${id.charAt(0).toUpperCase() + id.slice(1)} account has been disconnected.`,
    })
  }

  const handleLoginWithToggle = (id: string) => {
    setLoginWithOptions((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }))
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
                <h1 className="text-3xl font-bold text-palette-darkGreen">Connected Accounts</h1>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-palette-olive" />
                    Social Accounts
                  </CardTitle>
                  <CardDescription>
                    Connect your social media accounts for easier login and account management.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {connectedAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="flex items-center justify-between border-b border-palette-taupe/20 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`${account.color} text-white rounded-full w-10 h-10 flex items-center justify-center`}
                          >
                            <account.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-palette-darkGreen">{account.name}</h3>
                            {account.connected ? (
                              <p className="text-sm text-palette-darkGreen/70">{account.email}</p>
                            ) : (
                              <p className="text-sm text-palette-darkGreen/70">Not connected</p>
                            )}
                          </div>
                        </div>

                        {account.connected ? (
                          <Button
                            onClick={() => handleDisconnect(account.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Disconnect
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleConnect(account.id)}
                            variant="outline"
                            size="sm"
                            className="text-palette-olive border-palette-olive/30 hover:bg-palette-olive/10"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Login Options</CardTitle>
                    <CardDescription>
                      Choose which connected accounts can be used to log in to your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {connectedAccounts
                        .filter((account) => account.connected)
                        .map((account) => (
                          <div key={account.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`${account.color} text-white rounded-full w-8 h-8 flex items-center justify-center`}
                              >
                                <account.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-medium text-palette-darkGreen">Login with {account.name}</h3>
                              </div>
                            </div>

                            <Switch
                              checked={loginWithOptions[account.id as keyof typeof loginWithOptions]}
                              onCheckedChange={() => handleLoginWithToggle(account.id)}
                            />
                          </div>
                        ))}

                      {connectedAccounts.filter((account) => account.connected).length === 0 && (
                        <p className="text-sm text-palette-darkGreen/70">
                          Connect social accounts above to enable social login options.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-palette-darkGreen mb-2">Benefits of Connected Accounts</h3>
                    <ul className="space-y-2 text-sm text-palette-darkGreen/70">
                      <li>• Faster login without entering your password</li>
                      <li>• Easily share products on your social media</li>
                      <li>• Recover your account if you forget your password</li>
                      <li>• Keep your profile information up to date across platforms</li>
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
