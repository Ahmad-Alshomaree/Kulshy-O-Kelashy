"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"

export default function CustomerSignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      await signup(`${firstName} ${lastName}`, email, password)
      router.push("/") // Redirect to home page after signup
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-palette-cream/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/">
              <h1 className="text-3xl font-serif text-palette-darkGreen">Kulshy O-Klashy</h1>
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-palette-darkGreen">Create Customer Account</h2>
            <p className="mt-2 text-palette-darkGreen/70">Enter your details below</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name" className="text-palette-darkGreen">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="First name"
                    className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="last-name" className="text-palette-darkGreen">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Last name"
                    className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-palette-darkGreen">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-palette-darkGreen">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-palette-darkGreen">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pr-10 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-palette-darkGreen/70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-palette-darkGreen/70 mt-1">
                  Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
                </p>
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-palette-darkGreen">
                  Confirm Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pr-10 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-palette-darkGreen/70"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="ml-2 text-sm text-palette-darkGreen">
                    Subscribe to our newsletter for exclusive offers and updates
                  </Label>
                </div>

                <div className="flex items-center">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="ml-2 text-sm text-palette-darkGreen">
                    I agree to the{" "}
                    <Link href="/terms" className="text-palette-olive hover:text-palette-darkGreen">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-palette-olive hover:text-palette-darkGreen">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-palette-darkGreen hover:bg-palette-olive text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <span className="text-palette-darkGreen/70">Already have an account? </span>
              <Link href="/login" className="text-palette-olive hover:text-palette-darkGreen font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-palette-darkGreen text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">© 2023 Kulshy O-Klashy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
