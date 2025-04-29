"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ScrollAnimation, HoverButton } from "@/components/motion"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="w-full py-12 bg-palette-taupe/20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-[600px] mx-auto">
          {isClient ? (
            <ScrollAnimation>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold tracking-tighter md:text-3xl text-palette-darkGreen"
              >
                Subscribe to Our Newsletter
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-palette-darkGreen/70 md:text-lg"
              >
                Stay updated with our latest products, exclusive offers, and promotions.
              </motion.p>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col sm:flex-row gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 border-palette-taupe"
                />
                <HoverButton>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-1">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                        />
                        <span>Subscribing</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <span>Subscribe</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.div>
                      </span>
                    )}
                  </Button>
                </HoverButton>
              </motion.form>
            </ScrollAnimation>
          ) : (
            <>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-palette-darkGreen">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-palette-darkGreen/70 md:text-lg">
                Stay updated with our latest products, exclusive offers, and promotions.
              </p>
              <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 border-palette-taupe"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-1">
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent" />
                      <span>Subscribing</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span>Subscribe</span>
                      <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
