"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/LanguageContext"

export default function LanguagesPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
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
        if (data.language) {
          setLanguage(data.language as 'en' | 'ar')
        }
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error)
    } finally {
      setIsLoadingPreferences(false)
    }
  }

  const handleLanguageChange = async (newLanguage: 'en' | 'ar') => {
    setIsUpdating(true)

    try {
      // Update local state and localStorage
      setLanguage(newLanguage)

      // Update backend if user is authenticated
      if (session?.user) {
        const token = localStorage.getItem("bearer_token")
        const res = await fetch("/api/settings/language", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            language: newLanguage,
          }),
        })

        const data = await res.json()

        if (res.ok) {
          toast.success(
            newLanguage === 'en' ? "Language changed to English" : "تم تغيير اللغة إلى العربية"
          )
        } else {
          toast.error(data.error || "Failed to update language preference")
        }
      } else {
        toast.success(
          newLanguage === 'en' ? "Language changed to English" : "تم تغيير اللغة إلى العربية"
        )
      }
    } catch (error) {
      toast.error("An error occurred while changing language")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleResetToDefault = async () => {
    await handleLanguageChange('en')
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

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
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
          <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Languages</h1>
          <p className="text-palette-darkGreen/70">Choose your preferred language</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-palette-taupe/20 mb-6">
          <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">
            Select Language
          </h2>
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as 'en' | 'ar')}
                disabled={isUpdating}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                  language === lang.code
                    ? "border-palette-olive bg-palette-olive/5"
                    : "border-palette-taupe/30 hover:border-palette-olive/50"
                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="text-left">
                  <div className="font-semibold text-palette-darkGreen">{lang.nativeName}</div>
                  <div className="text-sm text-palette-darkGreen/60">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <Check className="w-6 h-6 text-palette-olive" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-palette-taupe/20">
          <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">
            Reset Language
          </h2>
          <p className="text-palette-darkGreen/70 mb-4">
            Reset your language preference to the default (English)
          </p>
          <Button
            onClick={handleResetToDefault}
            variant="outline"
            className="w-full border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen hover:text-white"
            disabled={isUpdating || language === 'en'}
          >
            {isUpdating ? "Resetting..." : "Reset to Default"}
          </Button>
        </div>
      </div>
    </div>
  )
}
