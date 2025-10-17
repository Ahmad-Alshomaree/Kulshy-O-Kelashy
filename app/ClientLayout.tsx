"use client"

import type React from "react"

import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AuthProvider } from "@/contexts/auth-context"
import { SellerAuthProvider } from "@/contexts/seller-auth-context"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SellerAuthProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </SellerAuthProvider>
    </AuthProvider>
  )
}
