"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Moon, Sun, Monitor, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function AppearancePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState(16)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  if (!user) {
    return null
  }

  const handleSaveChanges = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance preferences have been updated.",
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
                <h1 className="text-3xl font-bold text-palette-darkGreen">Appearance</h1>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-palette-darkGreen">Theme</CardTitle>
                  <CardDescription>Choose your preferred color theme</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
                        theme === "light" ? "border-palette-olive bg-palette-olive/5" : "border-gray-200"
                      }`}
                      onClick={() => setTheme("light")}
                    >
                      <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                        <Sun className="h-8 w-8 text-yellow-500" />
                      </div>
                      <RadioGroupItem value="light" id="light" className="sr-only" />
                      <Label htmlFor="light" className="font-medium text-palette-darkGreen">
                        Light
                      </Label>
                      {theme === "light" && (
                        <div className="absolute top-3 right-3">
                          <Check className="h-5 w-5 text-palette-olive" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
                        theme === "dark" ? "border-palette-olive bg-palette-olive/5" : "border-gray-200"
                      }`}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                        <Moon className="h-8 w-8 text-gray-100" />
                      </div>
                      <RadioGroupItem value="dark" id="dark" className="sr-only" />
                      <Label htmlFor="dark" className="font-medium text-palette-darkGreen">
                        Dark
                      </Label>
                      {theme === "dark" && (
                        <div className="absolute top-3 right-3">
                          <Check className="h-5 w-5 text-palette-olive" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
                        theme === "system" ? "border-palette-olive bg-palette-olive/5" : "border-gray-200"
                      }`}
                      onClick={() => setTheme("system")}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-800 flex items-center justify-center mb-3">
                        <Monitor className="h-8 w-8 text-palette-darkGreen" />
                      </div>
                      <RadioGroupItem value="system" id="system" className="sr-only" />
                      <Label htmlFor="system" className="font-medium text-palette-darkGreen">
                        System
                      </Label>
                      {theme === "system" && (
                        <div className="absolute top-3 right-3">
                          <Check className="h-5 w-5 text-palette-olive" />
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-palette-darkGreen">Text Size</CardTitle>
                  <CardDescription>Adjust the size of text throughout the application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">A</span>
                      <Slider
                        value={[fontSize]}
                        min={12}
                        max={24}
                        step={1}
                        onValueChange={(value) => setFontSize(value[0])}
                        className="w-[80%] mx-4"
                      />
                      <span className="text-lg font-bold">A</span>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="font-medium text-palette-darkGreen" style={{ fontSize: `${fontSize}px` }}>
                        Sample text at size {fontSize}px
                      </p>
                      <p className="text-palette-darkGreen/70 mt-2" style={{ fontSize: `${fontSize - 2}px` }}>
                        This is how your content will appear throughout the site.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-palette-darkGreen">Accessibility</CardTitle>
                  <CardDescription>Customize your experience for better accessibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-palette-darkGreen">Reduced Motion</h3>
                      <p className="text-sm text-palette-darkGreen/70">Minimize animations throughout the interface</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="reduced-motion" className="sr-only">
                        Reduced Motion
                      </Label>
                      <input
                        type="checkbox"
                        id="reduced-motion"
                        checked={reducedMotion}
                        onChange={(e) => setReducedMotion(e.target.checked)}
                        className="rounded text-palette-olive focus:ring-palette-olive"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-palette-darkGreen">High Contrast</h3>
                      <p className="text-sm text-palette-darkGreen/70">Increase contrast for better visibility</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="high-contrast" className="sr-only">
                        High Contrast
                      </Label>
                      <input
                        type="checkbox"
                        id="high-contrast"
                        checked={highContrast}
                        onChange={(e) => setHighContrast(e.target.checked)}
                        className="rounded text-palette-olive focus:ring-palette-olive"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="bg-palette-olive hover:bg-palette-darkGreen text-white" onClick={handleSaveChanges}>
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
