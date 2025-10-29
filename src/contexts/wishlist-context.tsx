"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"

// Define the product type
export interface WishlistProduct {
  id: number
  name: string
  price: number
  originalPrice: number | null
  image: string
  rating: number
  reviewCount: number
  [key: string]: any // Allow for additional properties
}

// Define the wishlist context type
interface WishlistContextType {
  wishlistItems: WishlistProduct[]
  itemCount: number
  isInWishlist: (productId: number) => boolean
  addToWishlist: (product: WishlistProduct) => void
  removeFromWishlist: (productId: number) => void
  clearWishlist: () => void
}

// Create the context with default values
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// Custom hook to use the wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    // Return a safe no-op implementation to avoid crashes when provider isn't mounted yet
    return {
      wishlistItems: [],
      itemCount: 0,
      isInWishlist: () => false,
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      clearWishlist: () => {},
    }
  }
  return context
}

// Wishlist provider component
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const { user } = useAuth()

  // Initialize wishlist from localStorage when user changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        try {
          const userWishlistKey = `wishlist_${user.id}`
          const storedWishlist = localStorage.getItem(userWishlistKey)
          if (storedWishlist) {
            setWishlistItems(JSON.parse(storedWishlist))
          } else {
            setWishlistItems([])
          }
        } catch (error) {
          console.error("Failed to load wishlist from localStorage:", error)
          setWishlistItems([])
        }
      } else {
        // If no user, clear the wishlist
        setWishlistItems([])
      }
      setIsInitialized(true)
    }
  }, [user])

  // Update localStorage when wishlist changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined" && user) {
      try {
        const userWishlistKey = `wishlist_${user.id}`
        localStorage.setItem(userWishlistKey, JSON.stringify(wishlistItems))
      } catch (error) {
        console.error("Failed to save wishlist to localStorage:", error)
      }
    }
  }, [wishlistItems, isInitialized, user])

  // Check if a product is in the wishlist
  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  // Add a product to the wishlist
  const addToWishlist = (product: WishlistProduct) => {
    if (!user) {
      // Don't add if not authenticated
      return
    }

    if (!isInWishlist(product.id)) {
      setWishlistItems([...wishlistItems, product])
    }
  }

  // Remove a product from the wishlist
  const removeFromWishlist = (productId: number) => {
    if (!user) return
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId))
  }

  // Clear the wishlist
  const clearWishlist = () => {
    if (!user) return
    setWishlistItems([])
  }

  // Calculate the number of items in the wishlist
  const itemCount = wishlistItems.length

  // Provide the wishlist context
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        itemCount,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
