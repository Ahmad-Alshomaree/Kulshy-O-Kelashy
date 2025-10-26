"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Leaf, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)

  useEffect(() => {
    // Check if welcome has been shown before
    const welcomeTimestamp = localStorage.getItem("welcomeTimestamp")
    const now = Date.now()
    const fiveMinutes = 5 * 60 * 1000 // 5 minutes in milliseconds

    if (!welcomeTimestamp) {
      // First visit - show welcome and set timestamp
      localStorage.setItem("welcomeTimestamp", now.toString())
      setIsVisible(true)
      setTimeRemaining(fiveMinutes)
    } else {
      const elapsed = now - parseInt(welcomeTimestamp)
      
      if (elapsed < fiveMinutes) {
        // Still within 5 minutes - show welcome
        setIsVisible(true)
        setTimeRemaining(fiveMinutes - elapsed)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1000) {
          setIsVisible(false)
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isVisible, timeRemaining])

  const handleClose = () => {
    setIsVisible(false)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-background rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  <ShoppingBag className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Welcome to EcoShop! 🌿
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Your destination for sustainable and eco-friendly shopping. Let's make the world a better place together!
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50">
                  <Leaf className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">Eco-Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    100% sustainable products
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50">
                  <Shield className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Secure Shopping</h3>
                  <p className="text-sm text-muted-foreground">
                    Safe & secure payments
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50">
                  <Truck className="h-8 w-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick & reliable shipping
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-4"
              >
                <Button onClick={handleClose} size="lg" className="w-full md:w-auto">
                  Start Shopping
                </Button>
                <p className="text-xs text-muted-foreground">
                  This message will auto-close in {formatTime(timeRemaining)}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}