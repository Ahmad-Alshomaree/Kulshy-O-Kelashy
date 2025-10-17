"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { StaggerContainer, StaggerItem, ScrollAnimation } from "@/components/motion"
import { Button } from "@/components/ui/button"

interface HomeProductSectionProps {
  title: string
  products: any[]
  className?: string
  featureType?: "high-rated" | "offers" | "most-viewed"
}

export function HomeProductSection({ title, products, className = "", featureType }: HomeProductSectionProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Determine the view all link based on the feature type
  const viewAllLink = featureType ? `/products?feature=${featureType}` : "/products"

  return (
    <section className={`py-10 ${className}`}>
      <div className="container px-4 mx-auto">
        {isClient ? (
          <ScrollAnimation>
            <div className="flex justify-between items-center mb-6">
              <Link href={viewAllLink} className="group">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-palette-darkGreen group-hover:text-palette-olive transition-colors cursor-pointer flex items-center"
                >
                  {title}
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </motion.h2>
              </Link>
              <Link href={viewAllLink}>
                <Button variant="ghost" className="gap-1 text-palette-olive hover:text-palette-darkGreen">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
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
            <div className="flex justify-between items-center mb-6">
              <Link href={viewAllLink} className="group">
                <h2 className="text-2xl font-bold text-palette-darkGreen group-hover:text-palette-olive transition-colors cursor-pointer flex items-center">
                  {title}
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h2>
              </Link>
              <Link href={viewAllLink}>
                <Button variant="ghost" className="gap-1 text-palette-olive hover:text-palette-darkGreen">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
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
