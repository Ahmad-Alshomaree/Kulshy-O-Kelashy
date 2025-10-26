"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SellerNavbar } from "@/components/seller/seller-navbar"
import { useSession } from "@/lib/auth-client"

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isPending && !session?.user) {
      router.push("/login/seller")
      return
    }
    
    // If authenticated but not a seller, redirect to login
    if (!isPending && session?.user && session.user.role !== 'seller') {
      router.push("/login/seller")
    }
  }, [isPending, session, router])

  // Show loading while checking authentication
  if (isPending || !session?.user || session.user.role !== 'seller') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-palette-darkGreen"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <SellerNavbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}