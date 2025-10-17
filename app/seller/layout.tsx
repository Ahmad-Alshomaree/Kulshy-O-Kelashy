"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SellerSidebar } from "@/components/seller/seller-sidebar"
import { useSellerAuth } from "@/contexts/seller-auth-context"

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { isSellerAuthenticated, isLoading } = useSellerAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isSellerAuthenticated) {
      router.push("/login/seller")
    }
  }, [isLoading, isSellerAuthenticated, router])

  // Show loading or nothing while checking authentication
  if (isLoading || !isSellerAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-palette-darkGreen"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SellerSidebar />
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  )
}
