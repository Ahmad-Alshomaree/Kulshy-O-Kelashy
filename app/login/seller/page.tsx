"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSellerAuth } from "@/contexts/seller-auth-context"
import { useRouter } from "next/navigation"

export default function SellerLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [storeId, setStoreId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { loginSeller, isSellerAuthenticated } = useSellerAuth()
  const router = useRouter()

  // If already authenticated, redirect to seller dashboard
  if (isSellerAuthenticated) {
    router.push("/seller")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await loginSeller(email, password, storeId)
    } catch (err) {
      setError("Failed to login. Please check your credentials.")
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
            <h2 className="mt-6 text-2xl font-bold text-palette-darkGreen">Seller Account Login</h2>
            <p className="mt-2 text-palette-darkGreen/70">Enter your seller account details below</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                <Label htmlFor="password" className="text-palette-darkGreen">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
              </div>

              <div>
                <Label htmlFor="store" className="text-palette-darkGreen">
                  Store ID
                </Label>
                <Input
                  id="store"
                  type="text"
                  placeholder="Enter your store ID"
                  className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  required
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me" className="ml-2 text-sm text-palette-darkGreen">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-palette-olive hover:text-palette-darkGreen">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-palette-darkGreen hover:bg-palette-olive text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In as Seller"}
            </Button>

            <div className="text-center">
              <span className="text-palette-darkGreen/70">Don&apos;t have a seller account? </span>
              <Link href="/signup/seller" className="text-palette-olive hover:text-palette-darkGreen font-medium">
                Apply to become a seller
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
