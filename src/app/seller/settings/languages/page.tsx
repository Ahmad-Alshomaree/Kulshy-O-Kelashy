"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth-client"
import { Globe, Check } from "lucide-react"
import { toast } from "sonner"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
]

export default function SellerLanguages() {
  const { data: session } = useSession()
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Load language preference
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
          setSelectedLanguage(data.language || "en")
        }
      } catch (error) {
        console.error("Failed to load language preference:", error)
      }
    }

    if (session?.user) {
      fetchPreferences()
    } else {
      const saved = localStorage.getItem("language")
      if (saved) setSelectedLanguage(saved)
    }
  }, [session])

  const handleLanguageChange = async (languageCode: string) => {
    setIsUpdating(true)
    try {
      // Save to localStorage for guests
      localStorage.setItem("language", languageCode)

      // Save to database for logged-in users
      if (session?.user) {
        const token = localStorage.getItem("bearer_token")
        const response = await fetch("/api/settings/language", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            language: languageCode,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save language preference")
        }
      }

      setSelectedLanguage(languageCode)
      toast.success("Language updated successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update language")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleReset = () => {
    handleLanguageChange("en")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Languages</h1>
        <p className="text-muted-foreground mt-2">Choose your preferred language</p>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Select Language</h2>
        </div>

        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isUpdating}
              className={`w-full flex items-center justify-between p-4 border rounded-lg transition-all ${
                selectedLanguage === language.code
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent"
              } disabled:opacity-50`}
            >
              <div className="text-left">
                <p className="font-medium">{language.name}</p>
                <p className="text-sm text-muted-foreground">{language.nativeName}</p>
              </div>
              {selectedLanguage === language.code && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={handleReset}
            disabled={isUpdating || selectedLanguage === "en"}
            className="px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
          >
            Reset to Default (English)
          </button>
        </div>
      </div>
    </div>
  )
}
