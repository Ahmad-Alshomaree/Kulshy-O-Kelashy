"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Seller = {
  id: string
  name: string
  email: string
  businessName: string
  storeId: string
}

type SellerAuthContextType = {
  seller: Seller | null
  isLoading: boolean
  loginSeller: (email: string, password: string, storeId: string) => Promise<void>
  signupSeller: (businessName: string, email: string, password: string) => Promise<void>
  logoutSeller: () => void
  isSellerAuthenticated: boolean
}

const SellerAuthContext = createContext<SellerAuthContextType | undefined>(undefined)

export function SellerAuthProvider({ children }: { children: React.ReactNode }) {
  const [seller, setSeller] = useState<Seller | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if seller is logged in on initial load
  useEffect(() => {
    const storedSeller = localStorage.getItem("seller")
    if (storedSeller) {
      const parsedSeller = JSON.parse(storedSeller)
      setSeller(parsedSeller)
    }
    setIsLoading(false)
  }, [])

  // Login function for sellers
  const loginSeller = async (email: string, password: string, storeId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create mock seller
      const mockSeller = {
        id: email, // Use email as consistent identifier
        name: email.split("@")[0],
        email,
        businessName: `${email.split("@")[0]}'s Store`,
        storeId,
      }

      // Save to localStorage
      localStorage.setItem("seller", JSON.stringify(mockSeller))
      setSeller(mockSeller)

      // Redirect to seller dashboard
      router.push("/seller")
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function for sellers
  const signupSeller = async (businessName: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a store ID
      const storeId = `store-${Math.random().toString(36).substring(2, 10)}`

      // Create mock seller
      const mockSeller = {
        id: email, // Use email as consistent identifier
        name: email.split("@")[0],
        email,
        businessName,
        storeId,
      }

      // Save to localStorage
      localStorage.setItem("seller", JSON.stringify(mockSeller))
      setSeller(mockSeller)

      // Redirect to seller dashboard
      router.push("/seller")
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logoutSeller = () => {
    localStorage.removeItem("seller")
    setSeller(null)
    router.push("/login/seller")
  }

  return (
    <SellerAuthContext.Provider
      value={{
        seller,
        isLoading,
        loginSeller,
        signupSeller,
        logoutSeller,
        isSellerAuthenticated: !!seller,
      }}
    >
      {children}
    </SellerAuthContext.Provider>
  )
}

export function useSellerAuth() {
  const context = useContext(SellerAuthContext)
  if (context === undefined) {
    throw new Error("useSellerAuth must be used within a SellerAuthProvider")
  }
  return context
}
