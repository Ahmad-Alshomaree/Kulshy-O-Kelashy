"use client"

import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/motion"

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Minimalist Desk Lamp",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home Decor",
      isNew: true,
      isSale: false,
    },
    {
      id: 2,
      name: "Leather Crossbody Bag",
      price: 89.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      isNew: false,
      isSale: true,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      isNew: true,
      isSale: false,
    },
    {
      id: 4,
      name: "Cotton T-Shirt",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      isNew: false,
      isSale: false,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <motion.h2 
                className="text-3xl font-bold tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Featured Products
              </motion.h2>
              <motion.p 
                className="text-muted-foreground md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover our handpicked selection of top products
              </motion.p>
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ x: -2 }}
            >
              <Link href="/products">
                <Button variant="ghost" className="gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
        
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <Link href={`/products/${product.id}`} className="group">
                  <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                    <div className="relative aspect-square overflow-hidden">
                      {product.isNew && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Badge className="absolute top-2 left-2 z-10">New</Badge>
                        </motion.div>
                      )}
                      {product.isSale && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Badge variant="destructive" className="absolute top-2 left-2 z-10">
                            Sale
                          </Badge>
                        </motion.div>
                      )}
                      <motion.img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <motion.span 
                          className="font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          ${product.price}
                        </motion.span>
                        {product.originalPrice && (
                          <motion.span 
                            className="text-muted-foreground line-through text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            ${product.originalPrice}
                          </motion.span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full"
                      >
                        <Button variant="secondary" className="w-full">
                          Add to Cart
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
