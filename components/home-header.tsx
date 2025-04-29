"use client"

import Link from "next/link"
import { Heart, Search, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryNav } from "@/components/category-nav"
import { HoverButton } from "@/components/motion"

export function HomeHeader() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <header className="w-full bg-palette-darkGreen text-white">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-4">
          {isClient ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/" className="font-bold text-2xl">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, staggerChildren: 0.1 }}
                  className="inline-block"
                >
                  {"Kulshy O-Klashy".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.03 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </Link>
            </motion.div>
          ) : (
            <Link href="/" className="font-bold text-2xl">
              Kulshy O-Klashy
            </Link>
          )}

          {isClient ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex relative w-full max-w-md mx-4"
            >
              <Input
                type="search"
                placeholder="Search for products..."
                className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </motion.div>
          ) : (
            <div className="hidden md:flex relative w-full max-w-md mx-4">
              <Input
                type="search"
                placeholder="Search for products..."
                className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </div>
          )}

          {isClient ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link href="/wishlist">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/cart">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                    <ShoppingCart className="h-5 w-5" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                        delay: 0.5,
                      }}
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-palette-cream text-xs text-palette-darkGreen flex items-center justify-center"
                    >
                      3
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/login">
                <HoverButton>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Sign in
                  </Button>
                </HoverButton>
              </Link>
              <Link href="/signup">
                <HoverButton>
                  <Button size="sm" className="bg-palette-cream text-palette-darkGreen hover:bg-white">
                    Sign up
                  </Button>
                </HoverButton>
              </Link>
            </motion.div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-palette-cream text-xs text-palette-darkGreen flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-palette-cream text-palette-darkGreen hover:bg-white">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
        <CategoryNav />
      </div>
    </header>
  )
}
