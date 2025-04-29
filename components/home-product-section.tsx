"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { ProductCard } from "@/components/product-card"
import { StaggerContainer, StaggerItem, ScrollAnimation } from "@/components/motion"

interface HomeProductSectionProps {
  title: string
  products: any[]
  className?: string
}

export function HomeProductSection({ title, products, className = "" }: HomeProductSectionProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className={`py-10 ${className}`}>
      <div className="container px-4 mx-auto">
        {isClient ? (
          <ScrollAnimation>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-6 text-palette-darkGreen"
            >
              {title}
            </motion.h2>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollAnimation>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-palette-darkGreen">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
