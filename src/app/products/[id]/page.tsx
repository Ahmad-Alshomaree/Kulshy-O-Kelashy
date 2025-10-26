"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Heart, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

// Mock product data - in a real app, this would come from an API
const getProductById = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Premium Eco-Friendly Cotton T-Shirt",
    description:
      "Made from 100% organic cotton, this premium t-shirt is both comfortable and environmentally friendly. The breathable fabric ensures all-day comfort, while the classic cut provides a timeless look that pairs well with any outfit.",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 127,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
    colors: ["Black", "White", "Navy", "Green"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "100% Organic Cotton",
      "Eco-friendly manufacturing",
      "Breathable fabric",
      "Machine washable",
      "Pre-shrunk",
    ],
    specifications: {
      Material: "100% Organic Cotton",
      Weight: "180 gsm",
      Fit: "Regular",
      Care: "Machine wash cold, tumble dry low",
      Origin: "Ethically made in Portugal",
    },
    stock: 42,
    sku: "ECO-TS-001",
    categories: ["Clothing", "T-Shirts", "Eco-Friendly"],
    tags: ["organic", "sustainable", "casual", "essential"],
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [mainImage, setMainImage] = useState(product.images[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]) // Default to Medium
  const [quantity, setQuantity] = useState(1)
  const [isInCart, setIsInCart] = useState(false)
  const { addToCart, items } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const router = useRouter()

  const isWishlisted = isInWishlist(product.id)

  useEffect(() => {
    if (items.some((item) => item.id === product.id)) {
      setIsInCart(true)
    }
  }, [items, product.id])

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        color: selectedColor,
        size: selectedSize,
      },
      quantity,
    )
    setIsInCart(true)
    toast.success(`${quantity} × ${product.name} added to cart`)
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast.success(`${product.name} removed from favorites`)
    } else {
      addToWishlist({
        ...product,
        color: selectedColor,
        size: selectedSize,
        image: mainImage, // Add the main image as the required 'image' property
      })
      toast.success(`${product.name} added to favorites`)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="flex items-center mb-6 text-sm">
        <Link href="/products" className="text-palette-darkGreen hover:text-palette-olive flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        <div className="mx-2 text-palette-darkGreen/40">/</div>
        <div className="text-palette-darkGreen/60">
          {product.categories.map((category, i) => (
            <span key={category}>
              <Link href={`/products?category=${category.toLowerCase()}`} className="hover:text-palette-olive">
                {category}
              </Link>
              {i < product.categories.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-white">
            <img src={mainImage || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  mainImage === image ? "border-palette-olive" : "border-transparent"
                }`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-palette-darkGreen mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-palette-darkGreen/60">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-palette-olive mr-2">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-palette-darkGreen/60 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.originalPrice && (
              <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-palette-darkGreen/80 mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-palette-darkGreen mb-2">Color: {selectedColor}</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`px-3 py-1 rounded-md border ${
                    selectedColor === color
                      ? "border-palette-olive bg-palette-olive/10 text-palette-olive"
                      : "border-gray-300 hover:border-palette-olive"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-palette-darkGreen mb-2">Size: {selectedSize}</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                    selectedSize === size
                      ? "border-palette-olive bg-palette-olive/10 text-palette-olive"
                      : "border-gray-300 hover:border-palette-olive"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <a href="#" className="text-sm text-palette-olive hover:underline mt-2 inline-block">
              Size Guide
            </a>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center mb-6">
            <div className="flex items-center border rounded-md mr-4">
              <button
                className="px-3 py-2 text-palette-darkGreen hover:text-palette-olive"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <Input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => {
                  const val = Number.parseInt(e.target.value)
                  if (val > 0 && val <= product.stock) setQuantity(val)
                }}
                className="w-12 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                className="px-3 py-2 text-palette-darkGreen hover:text-palette-olive"
                onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button
              className="bg-palette-olive hover:bg-palette-darkGreen text-white"
              onClick={isInCart ? () => router.push("/cart") : handleAddToCart}
            >
              {isInCart ? "Go to Basket" : "Add to Cart"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`ml-2 ${isWishlisted ? "text-red-500" : "text-palette-darkGreen hover:text-palette-olive"}`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              <span className="sr-only">{isWishlisted ? "Remove from Favorites" : "Add to Favorites"}</span>
            </Button>
          </div>

          {/* Stock and SKU */}
          <div className="text-sm text-palette-darkGreen/60 mb-6">
            <p>In Stock: {product.stock} items</p>
            <p>SKU: {product.sku}</p>
          </div>

          {/* Shipping and Returns */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-palette-darkGreen">
              <Truck className="h-5 w-5 mr-2 text-palette-olive" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-palette-darkGreen">
              <ShieldCheck className="h-5 w-5 mr-2 text-palette-olive" />
              <span>2-year warranty on all products</span>
            </div>
            <div className="flex items-center text-palette-darkGreen">
              <RotateCcw className="h-5 w-5 mr-2 text-palette-olive" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <h3 className="font-semibold text-lg mb-4">Product Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-palette-darkGreen/80">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <h3 className="font-semibold text-lg mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b pb-2">
                  <span className="font-medium text-palette-darkGreen w-1/3">{key}</span>
                  <span className="text-palette-darkGreen/80">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            <p className="text-palette-darkGreen/60">Reviews will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
