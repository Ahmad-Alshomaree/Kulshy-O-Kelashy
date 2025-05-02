"use client"

import { useState } from "react"
import { Heart, Share, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [mainImage, setMainImage] = useState("/placeholder.svg?height=600&width=600")

  // Mock product data
  const product = {
    id: params.id,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    rating: 4.5,
    reviewCount: 127,
    description:
      "Our Premium Cotton T-Shirt is crafted from 100% organic cotton for ultimate comfort and durability. This versatile piece features a classic fit, making it perfect for everyday wear. The breathable fabric ensures you stay cool and comfortable all day long.",
    features: ["100% organic cotton", "Classic fit", "Breathable fabric", "Pre-shrunk", "Machine washable"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
    colors: ["Black", "White", "Navy", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <img
              src={mainImage || "/placeholder.svg"}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative overflow-hidden rounded border ${
                  mainImage === image ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="aspect-square w-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                          ? "fill-primary text-primary opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold">${product.price}</div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <RadioGroup id="color" defaultValue="black" className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div key={color.toLowerCase()}>
                    <RadioGroupItem
                      value={color.toLowerCase()}
                      id={`color-${color.toLowerCase()}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`color-${color.toLowerCase()}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent px-3 py-2 text-sm font-medium transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <RadioGroup id="size" defaultValue="m" className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size.toLowerCase()}>
                    <RadioGroupItem
                      value={size.toLowerCase()}
                      id={`size-${size.toLowerCase()}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size.toLowerCase()}`}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent text-sm font-medium transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Select defaultValue="1">
                <SelectTrigger id="quantity" className="w-24">
                  <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
            <Button size="icon" variant="outline">
              <Share className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="pt-4">
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <p className="text-muted-foreground">
                Free standard shipping on all orders over $50. Delivery typically takes 3-5 business days. Express
                shipping options are available at checkout.
              </p>
              <p className="text-muted-foreground mt-2">
                We offer a 30-day return policy for all unused and unworn items.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
