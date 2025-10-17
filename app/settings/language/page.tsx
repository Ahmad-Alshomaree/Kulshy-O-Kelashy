"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Globe, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"

const languages = [
  { id: "en-US", name: "English (US)", flag: "🇺🇸" },
  { id: "en-GB", name: "English (UK)", flag: "🇬🇧" },
  { id: "es", name: "Español", flag: "🇪🇸" },
  { id: "fr", name: "Français", flag: "🇫🇷" },
  { id: "de", name: "Deutsch", flag: "🇩🇪" },
  { id: "it", name: "Italiano", flag: "🇮🇹" },
  { id: "pt", name: "Português", flag: "🇵🇹" },
  { id: "ja", name: "日本語", flag: "🇯🇵" },
  { id: "zh", name: "中文", flag: "🇨🇳" },
  { id: "ko", name: "한국어", flag: "🇰🇷" },
]

export default function LanguagePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedLanguage, setSelectedLanguage] = useState("en-US")

  if (!user) {
    return null
  }

  const handleSaveChanges = () => {
    toast({
      title: "Language updated",
      description: `Your language preference has been set to ${languages.find(lang => lang.id === selectedLanguage)?.name}.`,
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
                <h1 className="text-3xl font-bold text-palette-darkGreen">Language</h1>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-palette-darkGreen">Language Preferences</CardTitle>
                      <CardDescription>Select your preferred language for the application</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="space-y-3">
                    {languages.map((language) => (
                      <div
                        key={language.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          selectedLanguage === language.id ? "border-palette-olive bg-palette-olive/5" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={language.id} id={language.id} className="text-palette-olive" />
                          <Label htmlFor={language.id} className="flex items-center gap-2 cursor-pointer">
                            <span className="text-xl">{language.flag}</span>
                            <span className="font-medium text-palette-darkGreen">{language.name}</span>
                          </Label>
                        </div>
                        {selectedLanguage === language.id && (
                          <Check className="h-5 w-5 text-palette-olive" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-palette-darkGreen">Date & Time Format</CardTitle>
                  <CardDescription>Choose how dates and times are displayed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-palette-darkGreen mb-2">Date Format</h3>
                      <RadioGroup defaultValue="MM/DD/YYYY" className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="MM/DD/YYYY" id="date-format-1" className="text-palette-olive" />
                          <Label htmlFor="date-format-1">MM/DD/YYYY (05/15/2023)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="DD/MM/YYYY" id="date-format-2" className="text-palette-olive" />
                          <Label htmlFor="date-format-2">DD/MM/YYYY (15/05/2023)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="YYYY-MM-DD" id="date-format-3" className="text-palette-olive" />
                          <Label htmlFor="date-format-3">YYYY-MM-DD (2023-05-15)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="font-medium text-palette-darkGreen mb-2">Time Format</h3>
                      <RadioGroup defaultValue="12hour" className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="12hour" id="time-format-1" className="text-palette-olive" />
                          <Label htmlFor="time-format-1">12-hour (2:30 PM)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="24hour" id="time-format-2" className="text-palette-olive" />
                          <Label htmlFor="time-format-2">24-hour (14:30)</Label>
                        </div>
                      </RadioGroup>
                    </div>
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
