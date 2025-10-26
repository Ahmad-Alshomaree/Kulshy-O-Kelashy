"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SellerPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/seller/dashboard")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-palette-darkGreen"></div>
    </div>
  )
}