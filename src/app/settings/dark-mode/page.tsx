"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { ArrowLeft, Check, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTheme } from "@/contexts/ThemeContext"

export default function DarkModePage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true)

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login/customer")
    }
  }, [session, isPending, router])

  useEffect(() => {
    if (session?.user) {
      fetchPreferences()
    }
  }, [session])

  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem("bearer_token")
      const res = await fetch("/api/settings/preferences", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        if (data.theme) {
          setTheme(data.theme as 'light' | 'dark' | 'system')
        }
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error)
    } finally {
      setIsLoadingPreferences(false)
    }
  }

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setIsUpdating(true)

    try {
      // Update local state and localStorage
      setTheme(newTheme)

      // Update backend if user is authenticated
      if (session?.user) {
        const token = localStorage.getItem("bearer_token")
        const res = await fetch("/api/settings/theme", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            theme: newTheme,
          }),
        })

        const data = await res.json()

        if (res.ok) {
          toast.success(`Theme changed to ${newTheme} mode`)
        } else {
          toast.error(data.error || "Failed to update theme preference")
        }
      } else {
        toast.success(`Theme changed to ${newTheme} mode`)
      }
    } catch (error) {
      toast.error("An error occurred while changing theme")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleResetToDefault = async () => {
    await handleThemeChange('light')
  }

  if (isPending || isLoadingPreferences) {
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

  const themes = [
    { 
      value: 'light', 
      name: 'Light Mode', 
      description: 'Classic bright appearance',
      icon: Sun 
    },
    { 
      value: 'dark', 
      name: 'Dark Mode', 
      description: 'Easy on the eyes in low light',
      icon: Moon 
    },
  ]

  return (
    <div className="min-h-screen bg-palette-cream/30">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/settings"
          className="inline-flex items-center text-palette-olive hover:text-palette-darkGreen mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Dark Mode</h1>
          <p className="text-palette-darkGreen/70">Choose your preferred appearance</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-palette-taupe/20 mb-6">
          <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">
            Select Theme
          </h2>
          <div className="space-y-3">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <button
                  key={themeOption.value}
                  onClick={() => handleThemeChange(themeOption.value as 'light' | 'dark')}
                  disabled={isUpdating}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                    theme === themeOption.value
                      ? "border-palette-olive bg-palette-olive/5"
                      : "border-palette-taupe/30 hover:border-palette-olive/50"
                  } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-palette-olive/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-palette-olive" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-palette-darkGreen">
                        {themeOption.name}
                      </div>
                      <div className="text-sm text-palette-darkGreen/60">
                        {themeOption.description}
                      </div>
                    </div>
                  </div>
                  {theme === themeOption.value && (
                    <Check className="w-6 h-6 text-palette-olive" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-palette-taupe/20">
          <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">
            Reset Theme
          </h2>
          <p className="text-palette-darkGreen/70 mb-4">
            Reset your theme preference to the default (Light Mode)
          </p>
          <Button
            onClick={handleResetToDefault}
            variant="outline"
            className="w-full border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen hover:text-white"
            disabled={isUpdating || theme === 'light'}
          >
            {isUpdating ? "Resetting..." : "Reset to Default"}
          </Button>
        </div>
      </div>
    </div>
  )
}
