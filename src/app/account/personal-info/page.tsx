"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Save, User, Mail, Phone, Calendar, Edit, Shield, History, LinkIcon, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PersonalInfoPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-01",
  })

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")

  const [securityTab, setSecurityTab] = useState<string | null>(null)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [twoFactorStep, setTwoFactorStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState("")
  const [qrCode, setQrCode] = useState("/placeholder.svg?height=200&width=200")

  const mockLoginHistory = [
    {
      id: 1,
      date: "May 8, 2023 - 10:23 AM",
      device: "Chrome on Windows",
      location: "New York, USA",
      status: "Success",
    },
    { id: 2, date: "May 7, 2023 - 3:45 PM", device: "Safari on iPhone", location: "New York, USA", status: "Success" },
    { id: 3, date: "May 5, 2023 - 8:12 PM", device: "Firefox on MacOS", location: "Boston, USA", status: "Success" },
    { id: 4, date: "May 3, 2023 - 11:30 AM", device: "Chrome on Android", location: "Chicago, USA", status: "Failed" },
  ]

  const mockConnectedAccounts = [
    { id: 1, name: "Google", connected: true, email: "john.doe@gmail.com", lastUsed: "2 days ago" },
    { id: 2, name: "Facebook", connected: false, email: null, lastUsed: null },
    { id: 3, name: "Apple", connected: true, email: "john.doe@icloud.com", lastUsed: "1 week ago" },
    { id: 4, name: "Twitter", connected: false, email: null, lastUsed: null },
  ]

  const handleSetupTwoFactor = () => {
    setSecurityTab("2fa")
    setTwoFactorStep(1)
  }

  const handleVerifyTwoFactor = () => {
    if (verificationCode === "123456") {
      // Mock verification
      setTwoFactorEnabled(true)
      setTwoFactorStep(3)
      toast({
        title: "Two-Factor Authentication Enabled",
        description: "Your account is now more secure.",
      })
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check the code and try again.",
        variant: "destructive",
      })
    }
  }

  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false)
    setSecurityTab(null)
    toast({
      title: "Two-Factor Authentication Disabled",
      description: "Two-factor authentication has been turned off.",
    })
  }

  const handleConnectAccount = (id: number) => {
    // Mock connecting account
    toast({
      title: "Account Connected",
      description: `Successfully connected to ${mockConnectedAccounts.find((a) => a.id === id)?.name}.`,
    })
  }

  const handleDisconnectAccount = (id: number) => {
    // Mock disconnecting account
    toast({
      title: "Account Disconnected",
      description: `Successfully disconnected from ${mockConnectedAccounts.find((a) => a.id === id)?.name}.`,
    })
  }

  if (!user) {
    return null // Don't render anything while redirecting
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
    setPasswordError("")
  }

  const handlePasswordSubmit = () => {
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }

    // Here you would typically update the password in your backend
    // For now, we'll just show a success message
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    })

    // Reset form and close dialog
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsPasswordDialogOpen(false)
  }

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated successfully.",
    })
  }

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: "John",
      lastName: "Doe",
      email: user?.email || "",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1990-01-01",
    })
    setIsEditing(false)
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <h1 className="text-3xl font-bold text-palette-darkGreen">Personal Information</h1>
                </div>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-palette-olive hover:bg-palette-darkGreen text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-palette-olive text-white flex items-center justify-center text-4xl font-bold mb-4">
                        {formData.firstName.charAt(0).toUpperCase()}
                        {formData.lastName.charAt(0).toUpperCase()}
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="w-full">
                          Change Photo
                        </Button>
                      )}
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-palette-olive" />
                            <Label htmlFor="firstName" className="text-palette-darkGreen">
                              First Name
                            </Label>
                          </div>
                          {isEditing ? (
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                            />
                          ) : (
                            <p className="text-palette-darkGreen font-medium">{formData.firstName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-palette-olive" />
                            <Label htmlFor="lastName" className="text-palette-darkGreen">
                              Last Name
                            </Label>
                          </div>
                          {isEditing ? (
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                            />
                          ) : (
                            <p className="text-palette-darkGreen font-medium">{formData.lastName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-palette-olive" />
                            <Label htmlFor="email" className="text-palette-darkGreen">
                              Email Address
                            </Label>
                          </div>
                          {isEditing ? (
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                            />
                          ) : (
                            <p className="text-palette-darkGreen font-medium">{formData.email}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-palette-olive" />
                            <Label htmlFor="phone" className="text-palette-darkGreen">
                              Phone Number
                            </Label>
                          </div>
                          {isEditing ? (
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                            />
                          ) : (
                            <p className="text-palette-darkGreen font-medium">{formData.phone}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-palette-olive" />
                            <Label htmlFor="dateOfBirth" className="text-palette-darkGreen">
                              Date of Birth
                            </Label>
                          </div>
                          {isEditing ? (
                            <Input
                              id="dateOfBirth"
                              name="dateOfBirth"
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                            />
                          ) : (
                            <p className="text-palette-darkGreen font-medium">
                              {new Date(formData.dateOfBirth).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {isEditing && (
                        <div className="pt-4 border-t border-palette-taupe/20">
                          <h3 className="font-medium text-palette-darkGreen mb-4">Password</h3>
                          <div className="flex gap-4">
                            <Button variant="outline" size="sm" onClick={() => setIsPasswordDialogOpen(true)}>
                              Change Password
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Account Security</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    {securityTab === null ? (
                      <>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-palette-olive" />
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Two-Factor Authentication</h3>
                              <p className="text-sm text-palette-darkGreen/70">
                                {twoFactorEnabled
                                  ? "Your account is protected with an additional layer of security"
                                  : "Add an extra layer of security to your account"}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant={twoFactorEnabled ? "outline" : "default"}
                            onClick={twoFactorEnabled ? handleDisableTwoFactor : handleSetupTwoFactor}
                            className={twoFactorEnabled ? "" : "bg-palette-olive hover:bg-palette-darkGreen text-white"}
                          >
                            {twoFactorEnabled ? "Disable" : "Set Up"}
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <History className="h-5 w-5 text-palette-olive" />
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Login History</h3>
                              <p className="text-sm text-palette-darkGreen/70">View your recent login activity</p>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => setSecurityTab("login-history")}>
                            View
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-5 w-5 text-palette-olive" />
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">Connected Accounts</h3>
                              <p className="text-sm text-palette-darkGreen/70">Manage your connected social accounts</p>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => setSecurityTab("connected-accounts")}>
                            Manage
                          </Button>
                        </div>
                      </>
                    ) : securityTab === "2fa" ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-palette-darkGreen">Two-Factor Authentication</h3>
                          <Button variant="ghost" size="sm" onClick={() => setSecurityTab(null)}>
                            Back
                          </Button>
                        </div>

                        <div className="space-y-6">
                          {twoFactorStep === 1 && (
                            <>
                              <div className="bg-palette-cream/50 p-4 rounded-lg">
                                <h4 className="font-medium text-palette-darkGreen mb-2">Step 1: Scan QR Code</h4>
                                <p className="text-sm text-palette-darkGreen/70 mb-4">
                                  Scan this QR code with your authenticator app (like Google Authenticator or Authy).
                                </p>
                                <div className="flex justify-center mb-4">
                                  <img
                                    src={qrCode || "/placeholder.svg"}
                                    alt="QR Code"
                                    className="border border-palette-taupe/20 rounded-lg"
                                  />
                                </div>
                                <p className="text-sm text-palette-darkGreen/70">
                                  Can't scan the QR code? Use this code instead:
                                </p>
                                <p className="font-mono bg-white p-2 rounded border border-palette-taupe/20 text-center mt-2">
                                  KULSHY32OKLASHY98
                                </p>
                              </div>
                              <Button
                                onClick={() => setTwoFactorStep(2)}
                                className="w-full bg-palette-olive hover:bg-palette-darkGreen text-white"
                              >
                                Next
                              </Button>
                            </>
                          )}

                          {twoFactorStep === 2 && (
                            <>
                              <div className="bg-palette-cream/50 p-4 rounded-lg">
                                <h4 className="font-medium text-palette-darkGreen mb-2">
                                  Step 2: Enter Verification Code
                                </h4>
                                <p className="text-sm text-palette-darkGreen/70 mb-4">
                                  Enter the 6-digit code from your authenticator app to verify setup.
                                </p>
                                <div className="grid grid-cols-6 gap-2 mb-4">
                                  <Input
                                    type="text"
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="col-span-6 text-center font-mono text-lg border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                                    placeholder="123456"
                                  />
                                </div>
                                <p className="text-xs text-palette-darkGreen/70 italic">
                                  For demo purposes, enter "123456" to successfully enable 2FA.
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setTwoFactorStep(1)} className="flex-1">
                                  Back
                                </Button>
                                <Button
                                  onClick={handleVerifyTwoFactor}
                                  className="flex-1 bg-palette-olive hover:bg-palette-darkGreen text-white"
                                >
                                  Verify
                                </Button>
                              </div>
                            </>
                          )}

                          {twoFactorStep === 3 && (
                            <>
                              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2 text-green-600 mb-2">
                                  <Check className="h-5 w-5" />
                                  <h4 className="font-medium">Two-Factor Authentication Enabled</h4>
                                </div>
                                <p className="text-sm text-palette-darkGreen/70">
                                  Your account is now protected with an additional layer of security. You'll need to
                                  enter a verification code from your authenticator app when signing in.
                                </p>
                              </div>
                              <div className="bg-palette-cream/50 p-4 rounded-lg">
                                <h4 className="font-medium text-palette-darkGreen mb-2">Recovery Codes</h4>
                                <p className="text-sm text-palette-darkGreen/70 mb-4">
                                  Save these recovery codes in a secure place. You can use them to sign in if you lose
                                  access to your authenticator app.
                                </p>
                                <div className="bg-white p-3 rounded border border-palette-taupe/20 font-mono text-sm grid grid-cols-2 gap-2">
                                  <div>ABCD-EFGH-IJKL</div>
                                  <div>MNOP-QRST-UVWX</div>
                                  <div>1234-5678-9012</div>
                                  <div>3456-7890-1234</div>
                                  <div>WXYZ-ABCD-EFGH</div>
                                  <div>5678-9012-3456</div>
                                </div>
                              </div>
                              <Button
                                onClick={() => setSecurityTab(null)}
                                className="w-full bg-palette-olive hover:bg-palette-darkGreen text-white"
                              >
                                Done
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : securityTab === "login-history" ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-palette-darkGreen">Login History</h3>
                          <Button variant="ghost" size="sm" onClick={() => setSecurityTab(null)}>
                            Back
                          </Button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-palette-taupe/20">
                                <th className="py-2 px-4 text-left font-medium text-palette-darkGreen">Date & Time</th>
                                <th className="py-2 px-4 text-left font-medium text-palette-darkGreen">Device</th>
                                <th className="py-2 px-4 text-left font-medium text-palette-darkGreen">Location</th>
                                <th className="py-2 px-4 text-left font-medium text-palette-darkGreen">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockLoginHistory.map((login) => (
                                <tr key={login.id} className="border-b border-palette-taupe/10">
                                  <td className="py-3 px-4 text-sm">{login.date}</td>
                                  <td className="py-3 px-4 text-sm">{login.device}</td>
                                  <td className="py-3 px-4 text-sm">{login.location}</td>
                                  <td className="py-3 px-4 text-sm">
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                        login.status === "Success"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {login.status === "Success" ? (
                                        <Check className="h-3 w-3 mr-1" />
                                      ) : (
                                        <X className="h-3 w-3 mr-1" />
                                      )}
                                      {login.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex justify-center">
                          <Button variant="outline" size="sm">
                            Load More
                          </Button>
                        </div>
                      </div>
                    ) : securityTab === "connected-accounts" ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-palette-darkGreen">Connected Accounts</h3>
                          <Button variant="ghost" size="sm" onClick={() => setSecurityTab(null)}>
                            Back
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {mockConnectedAccounts.map((account) => (
                            <div
                              key={account.id}
                              className="flex justify-between items-center p-4 bg-palette-cream/30 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-palette-olive/20 flex items-center justify-center text-palette-olive">
                                  {account.name === "Google" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <path d="M17.13 17.21c-.95.3-1.87.44-3.13.44-3.64 0-5.88-2.36-5.88-5.7 0-3.15 2.42-5.7 5.83-5.7 3.23 0 5.37 2.38 5.37 5.55 0 .43-.05.85-.14 1.25H11.8v-1.25h5.47c0-.08 0-.27-.03-.45 0-1.97-1.41-3.5-3.48-3.5-2.25 0-3.9 1.8-3.9 4.1 0 2.35 1.8 4.1 4.03 4.1.92 0 1.7-.23 2.25-.61" />
                                    </svg>
                                  )}
                                  {account.name === "Facebook" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                  )}
                                  {account.name === "Apple" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                                      <path d="M10 2c1 .5 2 2 2 5" />
                                    </svg>
                                  )}
                                  {account.name === "Twitter" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-palette-darkGreen">{account.name}</h4>
                                  {account.connected ? (
                                    <div className="text-xs text-palette-darkGreen/70">
                                      {account.email} • Last used {account.lastUsed}
                                    </div>
                                  ) : (
                                    <div className="text-xs text-palette-darkGreen/70">Not connected</div>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant={account.connected ? "outline" : "default"}
                                size="sm"
                                onClick={() =>
                                  account.connected
                                    ? handleDisconnectAccount(account.id)
                                    : handleConnectAccount(account.id)
                                }
                                className={
                                  account.connected ? "" : "bg-palette-olive hover:bg-palette-darkGreen text-white"
                                }
                              >
                                {account.connected ? "Disconnect" : "Connect"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
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
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit} className="bg-palette-olive hover:bg-palette-darkGreen text-white">
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransitionWrapper>
  )
}
