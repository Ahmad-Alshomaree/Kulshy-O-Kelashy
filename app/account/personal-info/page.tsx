"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Save, User, Mail, Phone, Calendar, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"

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

  if (!user) {
    return null // Don't render anything while redirecting
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
                            <Button variant="outline" size="sm">
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
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Two-Factor Authentication</h3>
                        <p className="text-sm text-palette-darkGreen/70">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Set Up</Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Login History</h3>
                        <p className="text-sm text-palette-darkGreen/70">View your recent login activity</p>
                      </div>
                      <Button variant="outline">View</Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">Connected Accounts</h3>
                        <p className="text-sm text-palette-darkGreen/70">Manage your connected social accounts</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
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
