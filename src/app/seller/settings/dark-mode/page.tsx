"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth-client"
import { Moon, Sun, Monitor } from "lucide-react"
import { toast } from "sonner"

const themeOptions = [
  { value: "light", label: "Light Mode", icon: Sun, description: "Always use light theme" },
  { value: "dark", label: "Dark Mode", icon: Moon, description: "Always use dark theme" },
  { value: "system", label: "System", icon: Monitor, description: "Follow system preferences" },
]

export default function SellerDarkMode() {
  const { data: session } = useSession()
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Load theme preference
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem("bearer_token")
        const response = await fetch("/api/settings/preferences", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          const theme = data.theme || "light"
          setSelectedTheme(theme)
          applyTheme(theme)
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error)
      }
    }

    if (session?.user) {
      fetchPreferences()
    } else {
      const saved = localStorage.getItem("theme")
      if (saved) {
        setSelectedTheme(saved)
        applyTheme(saved)
      }
    }
  }, [session])

  const applyTheme = (theme: string) => {
    const root = document.documentElement
    
    if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
    } else if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }

  const handleThemeChange = async (theme: string) => {
    setIsUpdating(true)
    try {
      // Apply theme immediately
      applyTheme(theme)
      
      // Save to localStorage
      localStorage.setItem("theme", theme)

      // Save to database for logged-in users
      if (session?.user) {
        const token = localStorage.getItem("bearer_token")
        const response = await fetch("/api/settings/theme", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            theme,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save theme preference")
        }
      }

      setSelectedTheme(theme)
      toast.success("Theme updated successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update theme")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleReset = () => {
    handleThemeChange("light")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dark Mode</h1>
        <p className="text-muted-foreground mt-2">Customize your theme preference</p>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Moon className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Theme Settings</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              disabled={isUpdating}
              className={`p-6 border rounded-lg transition-all text-left ${
                selectedTheme === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent"
              } disabled:opacity-50`}
            >
              <div className="flex items-center justify-between mb-3">
                <option.icon className={`h-6 w-6 ${selectedTheme === option.value ? "text-primary" : "text-muted-foreground"}`} />
                {selectedTheme === option.value && (
                  <div className="h-3 w-3 rounded-full bg-primary" />
                )}
              </div>
              <p className="font-medium mb-1">{option.label}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={handleReset}
            disabled={isUpdating || selectedTheme === "light"}
            className="px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
          >
            Reset to Default (Light Mode)
          </button>
        </div>
      </div>
    </div>
  )
}
