"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
}

export type Order = {
  id: string
  date: string
  total: number
  status: string
  items: {
    id: number
    name: string
    quantity: number
    price: number
    image: string
  }[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  orders: Order[]
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  addOrder: (order: Order) => void
}

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  isLoading: false,
  orders: [],
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  addOrder: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)

      // Load user's orders using email as the key
      const userOrdersKey = `orders_${parsedUser.email}`
      const storedOrders = localStorage.getItem(userOrdersKey)
      if (storedOrders) {
        try {
          setOrders(JSON.parse(storedOrders))
        } catch (error) {
          console.error("Failed to parse orders from localStorage:", error)
          setOrders([])
        }
      }
    }
    setIsLoading(false)
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (user && orders.length > 0) {
      const userOrdersKey = `orders_${user.email}`
      localStorage.setItem(userOrdersKey, JSON.stringify(orders))
    }
  }, [orders, user])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create user with email as ID (instead of random ID)
      const mockUser = {
        id: email, // Use email as the consistent identifier
        name: email.split("@")[0],
        email,
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)

      // Load user's orders using email as the key
      const userOrdersKey = `orders_${email}`
      const storedOrders = localStorage.getItem(userOrdersKey)
      if (storedOrders) {
        try {
          setOrders(JSON.parse(storedOrders))
        } catch (error) {
          console.error("Failed to parse orders from localStorage:", error)
        }
      } else {
        setOrders([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create user with email as ID
      const mockUser = {
        id: email, // Use email as the consistent identifier
        name,
        email,
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)

      // Check if user already has orders
      const userOrdersKey = `orders_${email}`
      const storedOrders = localStorage.getItem(userOrdersKey)
      if (storedOrders) {
        try {
          setOrders(JSON.parse(storedOrders))
        } catch (error) {
          console.error("Failed to parse orders from localStorage:", error)
          setOrders([])
        }
      } else {
        setOrders([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setOrders([])
  }

  // Add order function
  const addOrder = (order: Order) => {
    if (!user) return

    setOrders((prevOrders) => {
      const newOrders = [order, ...prevOrders]
      // Save to localStorage immediately
      const userOrdersKey = `orders_${user.email}`
      localStorage.setItem(userOrdersKey, JSON.stringify(newOrders))
      return newOrders
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        orders,
        login,
        signup,
        logout,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
