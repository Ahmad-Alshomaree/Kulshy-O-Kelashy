"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { createRef } from "react"

// Helper for server-side rendering
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}

// Fade in animation
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1 })
    }
  }, [controls, isInView])

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={controls} transition={{ duration, delay }} {...props}>
      {children}
    </motion.div>
  )
}

// Slide up animation
export const SlideUp = ({ children, delay = 0, duration = 0.5, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Slide in from left animation
export const SlideInLeft = ({ children, delay = 0, duration = 0.5, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0 })
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={controls}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Slide in from right animation
export const SlideInRight = ({ children, delay = 0, duration = 0.5, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0 })
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={controls}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Scale animation
export const ScaleIn = ({ children, delay = 0, duration = 0.5, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, scale: 1 })
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation container
export const StaggerContainer = ({ children, staggerChildren = 0.1, delayChildren = 0, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("show")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      animate={controls}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered child item
export const StaggerItem = ({ children, ...props }: any) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
    {...props}
  >
    {children}
  </motion.div>
)

// Hover animation for cards and buttons
export const HoverCard = ({ children, ...props }: any) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    {...props}
  >
    {children}
  </motion.div>
)

// Subtle hover animation for buttons
export const HoverButton = ({ children, ...props }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 500, damping: 20 }}
    {...props}
  >
    {children}
  </motion.div>
)

// Animated page transition
export const PageTransition = ({ children, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
)

// Scroll-triggered animation
export const ScrollAnimation = ({ children, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [controls, isInView])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls} transition={{ duration: 0.5 }} {...props}>
      {children}
    </motion.div>
  )
}

// Animated counter
export const Counter = ({ from, to, duration = 2, ...props }: any) => (
  <ClientOnly>
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props}>
      <motion.span
        initial={{ count: from }}
        animate={{ count: to }}
        transition={{ duration }}
        onUpdate={(latest) => {
          if (props.onUpdate) {
            props.onUpdate(Math.round(latest.count))
          }
        }}
      />
    </motion.span>
  </ClientOnly>
)

// Animated logo or icon
export const AnimatedLogo = ({ children, ...props }: any) => (
  <ClientOnly>
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  </ClientOnly>
)

// Pulse animation (good for notifications or highlights)
export const Pulse = ({ children, ...props }: any) => (
  <ClientOnly>
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 8px rgba(0,0,0,0.2)", "0px 0px 0px rgba(0,0,0,0)"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
      }}
      {...props}
    >
      {children}
    </motion.div>
  </ClientOnly>
)

export const ScrollReveal = ({ children, ...props }: any) => {
  const controls = useAnimation()
  const ref = createRef<HTMLDivElement>()
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay: props.delay || 0 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { AnimatePresence }
