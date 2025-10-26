"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { ChevronRight, Lock, Globe, Moon } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login/customer")
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="min-h-screen bg-palette-cream/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-palette-darkGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-palette-darkGreen">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  const settingsOptions = [
    {
      icon: Lock,
      title: "Privacy and Security",
      description: "Change password, 2FA, active sessions",
      href: "/settings/privacy-security",
    },
    {
      icon: Globe,
      title: "Languages",
      description: "Choose your preferred language",
      href: "/settings/languages",
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Switch between light and dark themes",
      href: "/settings/dark-mode",
    },
  ]

  return (
    <div className="min-h-screen bg-palette-cream/30">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Settings</h1>
          <p className="text-palette-darkGreen/70">Manage your account preferences</p>
        </div>

        <div className="space-y-4">
          {settingsOptions.map((option) => {
            const Icon = option.icon
            return (
              <Link
                key={option.href}
                href={option.href}
                className="block bg-white rounded-lg p-6 hover:shadow-md transition-shadow border border-palette-taupe/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-palette-olive/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-palette-olive" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-palette-darkGreen">
                        {option.title}
                      </h3>
                      <p className="text-sm text-palette-darkGreen/60">{option.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-palette-darkGreen/40" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}