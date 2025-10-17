"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Shield, Smartphone, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

export default function TwoFactorAuthPage() {
  const { toast } = useToast()
  const [step, setStep] = useState<"setup" | "verify" | "enabled">("setup")
  const [verificationCode, setVerificationCode] = useState("")

  const handleSetup = () => {
    setStep("verify")
    toast({
      title: "Verification code sent",
      description: "We've sent a verification code to your phone.",
    })
  }

  const handleVerify = () => {
    if (verificationCode === "123456") {
      setStep("enabled")
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure.",
      })
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      })
    }
  }

  const handleDisable = () => {
    setStep("setup")
    toast({
      title: "Two-factor authentication disabled",
      description: "Two-factor authentication has been turned off.",
    })
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-6">
                <Link href="/account/personal-info">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold text-palette-darkGreen">Two-Factor Authentication</h1>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-palette-olive" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account by requiring a verification code in addition to your
                    password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {step === "setup" && (
                    <div className="space-y-6">
                      <div className="bg-palette-cream/50 p-4 rounded-lg">
                        <h3 className="font-medium text-palette-darkGreen mb-2">How it works</h3>
                        <p className="text-sm text-palette-darkGreen/70">
                          When you log in, you'll need to provide a verification code sent to your phone in addition to
                          your password. This helps protect your account even if your password is compromised.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-palette-olive text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium text-palette-darkGreen">Verify your phone number</h4>
                            <p className="text-sm text-palette-darkGreen/70 mb-2">
                              We'll send verification codes to this number.
                            </p>
                            <div className="flex gap-2">
                              <Input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="max-w-xs border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                              />
                              <Button variant="outline">Verify</Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="bg-palette-taupe/50 text-palette-darkGreen rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium text-palette-darkGreen">Enable two-factor authentication</h4>
                            <p className="text-sm text-palette-darkGreen/70 mb-2">
                              Once your phone is verified, you can enable two-factor authentication.
                            </p>
                            <Button
                              onClick={handleSetup}
                              className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                            >
                              Set Up Two-Factor Authentication
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === "verify" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Smartphone className="h-12 w-12 text-palette-olive" />
                        <div>
                          <h3 className="font-medium text-palette-darkGreen">Enter verification code</h3>
                          <p className="text-sm text-palette-darkGreen/70">
                            We've sent a 6-digit code to your phone. Enter it below to verify.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="code" className="text-palette-darkGreen">
                            Verification Code
                          </Label>
                          <Input
                            id="code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="123456"
                            className="max-w-xs border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                          />
                          <p className="text-xs text-palette-darkGreen/70 mt-1">
                            Didn't receive a code? <button className="text-palette-olive underline">Resend code</button>
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={() => setStep("setup")} variant="outline">
                            Cancel
                          </Button>
                          <Button
                            onClick={handleVerify}
                            className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                          >
                            Verify
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === "enabled" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 bg-green-50 p-4 rounded-lg">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-palette-darkGreen">Two-factor authentication is enabled</h3>
                          <p className="text-sm text-palette-darkGreen/70">
                            Your account is now protected with an additional layer of security.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-palette-cream/50 p-4 rounded-lg">
                          <h3 className="font-medium text-palette-darkGreen mb-2">Recovery codes</h3>
                          <p className="text-sm text-palette-darkGreen/70 mb-4">
                            Save these recovery codes in a safe place. You can use them to access your account if you
                            lose your phone.
                          </p>
                          <div className="bg-white p-3 rounded border border-palette-taupe/30 font-mono text-sm mb-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>ABCD-1234-EFGH</div>
                              <div>IJKL-5678-MNOP</div>
                              <div>QRST-9012-UVWX</div>
                              <div>YZ12-3456-7890</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download Codes
                          </Button>
                        </div>

                        <div>
                          <Button
                            onClick={handleDisable}
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Disable Two-Factor Authentication
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
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
