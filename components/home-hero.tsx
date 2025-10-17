"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { HoverButton } from "@/components/motion"

export function HomeHero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="w-full bg-palette-cream py-8 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {isClient ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-palette-darkGreen mb-4"
              >
                Sofa Eco Cula
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.4 + i * 0.1 }}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </motion.svg>
                  ))}
                </div>
                <span className="text-palette-darkGreen/70">(120)</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl font-bold text-palette-olive mb-6"
              >
                $799.99
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex gap-4"
              >
                <HoverButton>
                  <Button className="bg-palette-olive hover:bg-palette-darkGreen text-white">Shop Now</Button>
                </HoverButton>
                <HoverButton>
                  <Button
                    variant="outline"
                    className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                  >
                    Learn More
                  </Button>
                </HoverButton>
              </motion.div>
            </motion.div>
          ) : (
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-palette-darkGreen mb-4">Sofa Eco Cula</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-palette-darkGreen/70">(120)</span>
              </div>
              <p className="text-3xl font-bold text-palette-olive mb-6">$799.99</p>
              <div className="flex gap-4">
                <Button className="bg-palette-olive hover:bg-palette-darkGreen text-white">Shop Now</Button>
                <Button
                  variant="outline"
                  className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                >
                  Learn More
                </Button>
              </div>
            </div>
          )}

          {isClient ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600&text=Modern+Sofa"
                  alt="Sofa Eco Cula"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          ) : (
            <div className="order-1 md:order-2">
              <img
                src="/placeholder.svg?height=400&width=600&text=Modern+Sofa"
                alt="Sofa Eco Cula"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
