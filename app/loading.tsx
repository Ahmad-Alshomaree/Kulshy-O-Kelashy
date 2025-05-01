"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-palette-cream/50">
      {/* Header Skeleton */}
      <header className="w-full bg-palette-darkGreen text-white">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between py-4">
            <div className="w-48">
              <Skeleton className="h-8 w-full bg-white/20" />
            </div>
            <div className="hidden md:block w-full max-w-md mx-4">
              <Skeleton className="h-10 w-full bg-white/20" />
            </div>
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-16 bg-white/20" />
              ))}
            </div>
          </div>
          <div className="overflow-x-auto pb-2 mb-2">
            <div className="flex space-x-8 min-w-max">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} className="h-6 w-20 bg-white/20" />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <section className="w-full bg-palette-cream py-8 md:py-16">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Skeleton className="h-8 w-32 bg-palette-darkGreen/20" />
                <Skeleton className="h-16 w-full max-w-md bg-palette-darkGreen/20" />
                <Skeleton className="h-16 w-3/4 bg-palette-darkGreen/20" />
                <Skeleton className="h-12 w-full max-w-xs bg-palette-darkGreen/20" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32 bg-palette-darkGreen/20" />
                  <Skeleton className="h-12 w-40 bg-palette-darkGreen/20" />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Skeleton className="aspect-square w-full max-w-[500px] rounded-xl bg-palette-darkGreen/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section Skeleton */}
        <section className="py-10">
          <div className="container px-4 mx-auto">
            <Skeleton className="h-10 w-48 mb-6 bg-palette-darkGreen/20" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-md overflow-hidden shadow-sm">
                  <Skeleton className="aspect-square w-full bg-palette-darkGreen/10" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-5 w-full bg-palette-darkGreen/10" />
                    <Skeleton className="h-4 w-24 bg-palette-darkGreen/10" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-16 bg-palette-darkGreen/10" />
                      <Skeleton className="h-8 w-24 bg-palette-darkGreen/10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading Indicator */}
        {isClient && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-palette-darkGreen/80 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Loading...</span>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer Skeleton */}
      <footer className="bg-palette-darkGreen text-white py-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32 bg-white/20" />
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-5/6 bg-white/10" />
                <Skeleton className="h-4 w-4/6 bg-white/10" />
                <Skeleton className="h-10 w-full bg-white/10" />
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <Skeleton className="h-4 w-64 bg-white/20" />
            <div className="flex gap-4 mt-4 md:mt-0">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full bg-white/20" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
