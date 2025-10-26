"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface LogoSplashScreenProps {
  isVisible: boolean
  onClose: () => void
}

export function LogoSplashScreen({ isVisible, onClose }: LogoSplashScreenProps) {
  const router = useRouter()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
        router.push("/")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, router])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-palette-darkGreen via-palette-darkGreen to-palette-taupe flex items-center justify-center overflow-hidden"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="text-center relative z-10"
          >
            <motion.h1 className="text-5xl md:text-7xl font-serif text-white">
              {"Kulshy O-Klashy".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "easeOut"
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            
            {/* Underline animation */}
            <motion.div
              className="h-1 bg-palette-cream mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Floating circles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-palette-cream/10"
              style={{
                width: 100 + Math.random() * 200,
                height: 100 + Math.random() * 200,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 1.2, 0],
                opacity: [0, 0.3, 0.2, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 2.5,
                delay: Math.random() * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Rising sparkles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-palette-cream"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
              initial={{ y: 0, opacity: 0, scale: 0 }}
              animate={{
                y: -window.innerHeight,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 1.5,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}