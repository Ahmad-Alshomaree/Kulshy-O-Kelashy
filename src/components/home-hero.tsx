"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { HoverButton } from "@/components/motion"

interface HeroData {
  title: string
  subtitle?: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  buttons: {
    primary: { text: string; link: string }
    secondary: { text: string; link: string }
  }
}

export function HomeHero() {
  const [isClient, setIsClient] = useState(false)
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    
    // Fetch hero section data
    fetch('/api/hero-section')
      .then(res => res.json())
      .then(data => {
        setHeroData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching hero data:', error)
        setLoading(false)
      })
  }, [])

  if (loading || !heroData) {
    return (
      <section className="w-full bg-palette-cream py-8 md:py-16">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
              <div className="h-8 bg-gray-300 rounded mb-6 w-1/3"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-300 rounded w-32"></div>
                <div className="h-10 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="order-1 md:order-2 animate-pulse">
              <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

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
                {heroData.title}
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
                      className={`w-5 h-5 ${
                        i < Math.floor(heroData.rating) ? 'text-yellow-500' : 'text-gray-300'
                      } fill-current`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </motion.svg>
                  ))}
                </div>
                <span className="text-palette-darkGreen/70">({heroData.reviewCount})</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl font-bold text-palette-olive mb-6"
              >
                ${heroData.price.toFixed(2)}
                {heroData.originalPrice && (
                  <span className="text-xl text-gray-500 line-through ml-2">
                    ${heroData.originalPrice.toFixed(2)}
                  </span>
                )}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex gap-4"
              >
                <HoverButton>
                  <Button 
                    className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                    onClick={() => window.location.href = heroData.buttons.primary.link}
                  >
                    {heroData.buttons.primary.text}
                  </Button>
                </HoverButton>
                <HoverButton>
                  <Button
                    variant="outline"
                    className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                    onClick={() => window.location.href = heroData.buttons.secondary.link}
                  >
                    {heroData.buttons.secondary.text}
                  </Button>
                </HoverButton>
              </motion.div>
            </motion.div>
          ) : (
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-palette-darkGreen mb-4">{heroData.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(heroData.rating) ? 'text-yellow-500' : 'text-gray-300'} fill-current`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-palette-darkGreen/70">({heroData.reviewCount})</span>
              </div>
              <p className="text-3xl font-bold text-palette-olive mb-6">
                ${heroData.price.toFixed(2)}
                {heroData.originalPrice && (
                  <span className="text-xl text-gray-500 line-through ml-2">
                    ${heroData.originalPrice.toFixed(2)}
                  </span>
                )}
              </p>
              <div className="flex gap-4">
                <Button 
                  className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                  onClick={() => window.location.href = heroData.buttons.primary.link}
                >
                  {heroData.buttons.primary.text}
                </Button>
                <Button
                  variant="outline"
                  className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                  onClick={() => window.location.href = heroData.buttons.secondary.link}
                >
                  {heroData.buttons.secondary.text}
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
                  src={heroData.image}
                  alt={heroData.title}
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          ) : (
            <div className="order-1 md:order-2">
              <img
                src={heroData.image}
                alt={heroData.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
