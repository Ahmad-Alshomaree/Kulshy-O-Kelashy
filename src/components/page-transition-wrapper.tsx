"use client"

import type React from "react"

import { AnimatePresence } from "framer-motion"
import { PageTransition } from "@/components/motion"
import { usePathname } from "next/navigation"

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>{children}</PageTransition>
    </AnimatePresence>
  )
}
