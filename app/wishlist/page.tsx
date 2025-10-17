"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, Search, ShoppingCart, Trash2, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const { user } = useAuth()
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Filter wishlist items based on search term
  const filteredItems = wishlistItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleRemoveFromWishlist = (id: number, name: string) => {
    removeFromWishlist(id)
    toast.success(`${name} removed from favorites`)
  }

  const handleAddToCart = (item: any) => {
    addToCart(item)
    toast.success(`${item.name} added to cart`)
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast.success("All items have been removed from your favorites")
  }

  // Don't render anything until we check authentication
  if (!user) {
    return null
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <h1 className="text-3xl font-bold text-palette-darkGreen">My Favorites</h1>
                </div>
                {wishlistItems.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleClearWishlist}
                    className="border-palette-olive text-palette-olive hover:bg-palette-olive hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              {wishlistItems.length > 0 && (
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-palette-darkGreen/50" />
                  <Input
                    placeholder="Search favorites by name or category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden h-full">
                        <CardContent className="p-0 flex flex-col h-full">
                          <div className="relative">
                            <Link href={`/products/${item.id}`}>
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                              </div>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                            {item.inStock === false && (
                              <Badge className="absolute bottom-2 left-2 bg-red-500" variant="secondary">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <div className="text-sm text-palette-darkGreen/70 mb-1">
                              {item.category || "Uncategorized"}
                            </div>
                            <Link href={`/products/${item.id}`} className="block flex-1">
                              <h3 className="font-medium text-palette-darkGreen mb-2 hover:text-palette-olive transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="font-bold text-palette-olive">${item.price.toFixed(2)}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-palette-darkGreen/60 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button
                              onClick={() => handleAddToCart(item)}
                              disabled={item.inStock === false}
                              className="w-full bg-palette-olive hover:bg-palette-darkGreen text-white"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {item.inStock === false ? "Out of Stock" : "Add to Basket"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-palette-olive/10 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-palette-olive" />
                  </div>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-2">No favorites yet</h2>
                  <p className="text-palette-darkGreen/70 mb-6">
                    {searchTerm ? "No items match your search" : "Items you favorite will appear here"}
                  </p>
                  <Link href="/products">
                    <Button className="bg-palette-olive hover:bg-palette-darkGreen text-white">Explore Products</Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <footer className="bg-palette-darkGreen text-white py-4 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70">© 2023 Kulshy O-Klashy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransitionWrapper>
  )
}
