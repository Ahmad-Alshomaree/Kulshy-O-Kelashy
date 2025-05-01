"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, Home, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HoverButton } from "@/components/motion"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="mx-auto bg-red-100 text-red-600 p-3 rounded-full w-16 h-16 flex items-center justify-center"
          >
            <AlertCircle className="w-8 h-8" />
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-palette-darkGreen"
            >
              Something went wrong
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-palette-darkGreen/70"
            >
              We apologize for the inconvenience. Please try again or return to the home page.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <HoverButton>
              <Button
                onClick={reset}
                className="bg-palette-olive hover:bg-palette-darkGreen text-white flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            </HoverButton>
            <HoverButton>
              <Button
                variant="outline"
                className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white flex items-center gap-2"
                asChild
              >
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </HoverButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-palette-darkGreen/50 pt-6"
          >
            Error Code: {error.digest}
          </motion.div>
        </motion.div>
      </main>

      <footer className="bg-palette-darkGreen text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">© 2023 Kulshy O-Klashy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
