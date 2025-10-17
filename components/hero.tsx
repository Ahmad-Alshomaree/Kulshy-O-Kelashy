"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { SlideInLeft, SlideInRight, HoverButton } from "@/components/motion"

export function Hero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-palette-cream overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-palette-olive px-3 py-1 text-sm text-white">
                New Collection
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-palette-darkGreen">
                Discover Our Latest Products
              </h1>
              <p className="max-w-[600px] text-palette-darkGreen md:text-xl">
                Shop the newest trends and find your perfect style. Free shipping on orders over $50.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="gap-1.5 bg-palette-olive hover:bg-palette-darkGreen">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                  >
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-palette-olive/20 to-palette-taupe/20" />
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Hero product"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-palette-cream overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <SlideInLeft className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block rounded-lg bg-palette-olive px-3 py-1 text-sm text-white"
            >
              New Collection
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-palette-darkGreen"
            >
              Discover Our Latest Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-[600px] text-palette-darkGreen md:text-xl"
            >
              Shop the newest trends and find your perfect style. Free shipping on orders over $50.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Link href="/products">
                <HoverButton>
                  <Button size="lg" className="gap-1.5 bg-palette-olive hover:bg-palette-darkGreen">
                    Shop Now
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </HoverButton>
              </Link>
              <Link href="/products">
                <HoverButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                  >
                    Browse Categories
                  </Button>
                </HoverButton>
              </Link>
            </motion.div>
          </SlideInLeft>
          <SlideInRight className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl"
            >
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(to bottom right, rgba(89, 97, 75, 0.2), rgba(158, 155, 136, 0.2))",
                    "linear-gradient(to bottom right, rgba(89, 97, 75, 0.3), rgba(158, 155, 136, 0.3))",
                    "linear-gradient(to bottom right, rgba(89, 97, 75, 0.2), rgba(158, 155, 136, 0.2))",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0"
              />
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                src="/placeholder.svg?height=600&width=600"
                alt="Hero product"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </SlideInRight>
        </div>
      </div>
    </section>
  )
}
