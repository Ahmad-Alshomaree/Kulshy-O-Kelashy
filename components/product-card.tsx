"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HoverCard } from "@/components/motion"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice: number | null
    rating: number
    reviewCount: number
    image: string
    isNew: boolean
    isSale: boolean
    discount: string | null
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="group relative bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-square overflow-hidden">
          {product.discount && (
            <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">{product.discount}</Badge>
          )}
          {product.isNew && (
            <Badge className="absolute top-2 left-2 z-10 bg-palette-olive hover:bg-palette-darkGreen">New</Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-palette-darkGreen hover:text-palette-olive"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Link href={`/products/${product.id}`}>
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </Link>
        </div>
        <div className="p-3">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-medium text-sm mb-1 text-palette-darkGreen line-clamp-1 group-hover:text-palette-olive transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"
                  } fill-current`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-palette-darkGreen/60 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-bold text-palette-olive">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-palette-darkGreen/60 line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button
              size="sm"
              className="bg-palette-olive hover:bg-palette-darkGreen text-white text-xs px-2 py-1 h-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <HoverCard className="group relative bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden">
        {product.discount && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">{product.discount}</Badge>
          </motion.div>
        )}
        {product.isNew && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Badge className="absolute top-2 left-2 z-10 bg-palette-olive hover:bg-palette-darkGreen">New</Badge>
          </motion.div>
        )}
        <motion.div
          whileHover={{ scale: 1.1, opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 z-10"
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white text-palette-darkGreen hover:text-palette-olive"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </motion.div>
        <Link href={`/products/${product.id}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="p-3">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-sm mb-1 text-palette-darkGreen line-clamp-1 group-hover:text-palette-olive transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"
                } fill-current`}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </motion.svg>
            ))}
          </div>
          <span className="text-xs text-palette-darkGreen/60 ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="font-bold text-palette-olive">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-palette-darkGreen/60 line-through">${product.originalPrice}</span>
            )}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="bg-palette-olive hover:bg-palette-darkGreen text-white text-xs px-2 py-1 h-auto"
            >
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </HoverCard>
  )
}
