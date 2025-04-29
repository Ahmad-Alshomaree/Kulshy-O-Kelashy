"use client"

import type React from "react"
import { AnimatePresence } from "framer-motion"

import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/motion"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AnimatePresence mode="wait">
        <PageTransition>{children}</PageTransition>
      </AnimatePresence>
    </ThemeProvider>
  )
}
