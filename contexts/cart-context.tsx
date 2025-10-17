"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  size?: string
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: any, quantity?: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const { user } = useAuth()

  // Load cart from localStorage on initial render or when user changes
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      if (user) {
        // If user is logged in, load their cart
        const userCartKey = `cart_${user.id}`
        const storedCart = localStorage.getItem(userCartKey)
        if (storedCart) {
          try {
            setItems(JSON.parse(storedCart))
          } catch (error) {
            console.error("Failed to parse cart from localStorage:", error)
            setItems([])
          }
        } else {
          setItems([])
        }
      } else {
        // If no user, clear the cart
        setItems([])
      }
      setIsInitialized(true)
    }
  }, [user])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined" && user) {
      const userCartKey = `cart_${user.id}`
      localStorage.setItem(userCartKey, JSON.stringify(items))
    }
  }, [items, isInitialized, user])

  const addToCart = (product: any, quantity = 1) => {
    if (!user) {
      // Redirect to login if not authenticated
      return
    }

    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // Add new item to cart
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            color: product.color || "Default",
            size: product.size || "One Size",
          },
        ]
      }
    })
  }

  const removeFromCart = (id: number) => {
    if (!user) return
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (!user || quantity < 1) return

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    if (!user) return
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
