"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Filter, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const featureParam = searchParams.get("feature")

  // All available categories
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "clothing", name: "Clothing" },
    { id: "electronics", name: "Electronics" },
    { id: "home-kitchen", name: "Home & Kitchen" },
    { id: "beauty", name: "Beauty & Personal Care" },
    { id: "sports", name: "Sports & Outdoors" },
    { id: "toys", name: "Toys & Games" },
    { id: "women", name: "Women" },
    { id: "men", name: "Men" },
    { id: "children", name: "Children" },
    { id: "makeup", name: "Make-up" },
  ]

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [showNewArrivals, setShowNewArrivals] = useState<boolean>(false)
  const [showOnSale, setShowOnSale] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>("featured")

  // New filter states
  const [showHighRated, setShowHighRated] = useState<boolean>(false)
  const [showOffers, setShowOffers] = useState<boolean>(false)
  const [showMostViewed, setShowMostViewed] = useState<boolean>(false)

  // Set initial filters from URL parameters
  useEffect(() => {
    if (categoryParam) {
      const matchingCategory = categories.find((cat) => cat.id === categoryParam)
      if (matchingCategory) {
        setSelectedCategory(categoryParam)
      }
    }

    if (featureParam) {
      switch (featureParam) {
        case "high-rated":
          setShowHighRated(true)
          break
        case "offers":
          setShowOffers(true)
          break
        case "most-viewed":
          setShowMostViewed(true)
          break
      }
    }
  }, [categoryParam, featureParam])

  // Get page title based on filters
  const getPageTitle = () => {
    if (showHighRated) return "High-Rated Items"
    if (showOffers) return "Offers"
    if (showMostViewed) return "Most Viewed Products"
    if (selectedCategory !== "all") {
      const category = categories.find((cat) => cat.id === selectedCategory)
      return category ? category.name : "All Products"
    }
    return "All Products"
  }

  const products = [
    {
      id: 1,
      name: "Minimalist Desk Lamp",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Kitchen",
      categoryId: "home-kitchen",
      isNew: true,
      isSale: false,
      rating: 4.2,
      reviewCount: 45,
      viewCount: 120,
    },
    {
      id: 2,
      name: "Leather Crossbody Bag",
      price: 89.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Women",
      categoryId: "women",
      isNew: false,
      isSale: true,
      rating: 4.7,
      reviewCount: 89,
      viewCount: 320,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      categoryId: "electronics",
      isNew: true,
      isSale: false,
      rating: 4.8,
      reviewCount: 156,
      viewCount: 450,
    },
    {
      id: 4,
      name: "Cotton T-Shirt",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      categoryId: "clothing",
      isNew: false,
      isSale: false,
      rating: 4.1,
      reviewCount: 67,
      viewCount: 180,
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      categoryId: "electronics",
      isNew: true,
      isSale: false,
      rating: 4.9,
      reviewCount: 203,
      viewCount: 520,
    },
    {
      id: 6,
      name: "Ceramic Coffee Mug",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Kitchen",
      categoryId: "home-kitchen",
      isNew: false,
      isSale: false,
      rating: 4.3,
      reviewCount: 42,
      viewCount: 110,
    },
    {
      id: 7,
      name: "Denim Jacket",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      categoryId: "clothing",
      isNew: false,
      isSale: true,
      rating: 4.6,
      reviewCount: 78,
      viewCount: 290,
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      categoryId: "electronics",
      isNew: false,
      isSale: false,
      rating: 4.5,
      reviewCount: 112,
      viewCount: 380,
    },
    {
      id: 9,
      name: "Men's Casual Shirt",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Men",
      categoryId: "men",
      isNew: true,
      isSale: false,
      rating: 4.4,
      reviewCount: 56,
      viewCount: 210,
    },
    {
      id: 10,
      name: "Children's Backpack",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Children",
      categoryId: "children",
      isNew: false,
      isSale: false,
      rating: 4.2,
      reviewCount: 34,
      viewCount: 150,
    },
    {
      id: 11,
      name: "Makeup Palette",
      price: 45.99,
      originalPrice: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Make-up",
      categoryId: "makeup",
      isNew: false,
      isSale: true,
      rating: 4.7,
      reviewCount: 89,
      viewCount: 310,
    },
    {
      id: 12,
      name: "Toy Robot",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Toys & Games",
      categoryId: "toys",
      isNew: true,
      isSale: false,
      rating: 4.0,
      reviewCount: 23,
      viewCount: 90,
    },
  ]

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
      return false
    }

    // Filter by price range
    if (priceRange === "under-50" && product.price >= 50) {
      return false
    }
    if (priceRange === "50-100" && (product.price < 50 || product.price > 100)) {
      return false
    }
    if (priceRange === "over-100" && product.price <= 100) {
      return false
    }

    // Filter by product status
    if (showNewArrivals && !product.isNew) {
      return false
    }
    if (showOnSale && !product.isSale) {
      return false
    }

    // Filter by high rated (4.5+ rating)
    if (showHighRated && product.rating < 4.5) {
      return false
    }

    // Filter by offers (has originalPrice)
    if (showOffers && !product.originalPrice) {
      return false
    }

    // Filter by most viewed (300+ views)
    if (showMostViewed && product.viewCount < 300) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      case "rating":
        return b.rating - a.rating
      case "most-viewed":
        return b.viewCount - a.viewCount
      default: // featured or any other case
        return 0
    }
  })

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("all")
    setPriceRange("all")
    setShowNewArrivals(false)
    setShowOnSale(false)
    setShowHighRated(false)
    setShowOffers(false)
    setShowMostViewed(false)
  }

  // Apply filters in mobile view
  const applyMobileFilters = () => {
    // This function would be used to close the mobile filter sheet
    // The filters are already applied as state changes
  }

  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <div className="container px-4 md:px-6 py-6 md:py-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
                <p className="text-muted-foreground">Browse our collection of products</p>
              </div>
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Narrow down your product search with filters</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category.id}-mobile`}
                                checked={selectedCategory === category.id}
                                onCheckedChange={() => setSelectedCategory(category.id)}
                              />
                              <Label htmlFor={`category-${category.id}-mobile`}>{category.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Product Features section for mobile */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Product Features</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="feature-high-rated-mobile"
                              checked={showHighRated}
                              onCheckedChange={(checked) => setShowHighRated(checked === true)}
                            />
                            <Label htmlFor="feature-high-rated-mobile">High Rated Items</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="feature-offers-mobile"
                              checked={showOffers}
                              onCheckedChange={(checked) => setShowOffers(checked === true)}
                            />
                            <Label htmlFor="feature-offers-mobile">Offers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="feature-most-viewed-mobile"
                              checked={showMostViewed}
                              onCheckedChange={(checked) => setShowMostViewed(checked === true)}
                            />
                            <Label htmlFor="feature-most-viewed-mobile">Most Viewed</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Price Range</h3>
                        <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="price-all-mobile" />
                            <Label htmlFor="price-all-mobile">All Prices</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="under-50" id="price-under-50-mobile" />
                            <Label htmlFor="price-under-50-mobile">Under $50</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="50-100" id="price-50-100-mobile" />
                            <Label htmlFor="price-50-100-mobile">$50 - $100</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="over-100" id="price-over-100-mobile" />
                            <Label htmlFor="price-over-100-mobile">Over $100</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Product Status</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="status-new-mobile"
                              checked={showNewArrivals}
                              onCheckedChange={(checked) => setShowNewArrivals(checked === true)}
                            />
                            <Label htmlFor="status-new-mobile">New Arrivals</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="status-sale-mobile"
                              checked={showOnSale}
                              onCheckedChange={(checked) => setShowOnSale(checked === true)}
                            />
                            <Label htmlFor="status-sale-mobile">On Sale</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetFilters}>
                        Reset
                      </Button>
                      <Button onClick={applyMobileFilters}>Apply Filters</Button>
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="most-viewed">Most Viewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="hidden md:block col-span-3 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                  </div>

                  {/* Product Features section for desktop */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Product Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="feature-high-rated"
                          checked={showHighRated}
                          onCheckedChange={(checked) => setShowHighRated(checked === true)}
                        />
                        <Label
                          htmlFor="feature-high-rated"
                          className={showHighRated ? "font-medium text-palette-olive" : ""}
                        >
                          High Rated Items
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="feature-offers"
                          checked={showOffers}
                          onCheckedChange={(checked) => setShowOffers(checked === true)}
                        />
                        <Label htmlFor="feature-offers" className={showOffers ? "font-medium text-palette-olive" : ""}>
                          Offers
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="feature-most-viewed"
                          checked={showMostViewed}
                          onCheckedChange={(checked) => setShowMostViewed(checked === true)}
                        />
                        <Label
                          htmlFor="feature-most-viewed"
                          className={showMostViewed ? "font-medium text-palette-olive" : ""}
                        >
                          Most Viewed
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategory === category.id}
                            onCheckedChange={() => setSelectedCategory(category.id)}
                          />
                          <Label
                            htmlFor={`category-${category.id}`}
                            className={selectedCategory === category.id ? "font-medium text-palette-olive" : ""}
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Price Range</h4>
                    <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="price-all" />
                        <Label htmlFor="price-all">All Prices</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="under-50" id="price-under-50" />
                        <Label htmlFor="price-under-50">Under $50</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="50-100" id="price-50-100" />
                        <Label htmlFor="price-50-100">$50 - $100</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="over-100" id="price-over-100" />
                        <Label htmlFor="price-over-100">Over $100</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Product Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-new"
                          checked={showNewArrivals}
                          onCheckedChange={(checked) => setShowNewArrivals(checked === true)}
                        />
                        <Label htmlFor="status-new">New Arrivals</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-sale"
                          checked={showOnSale}
                          onCheckedChange={(checked) => setShowOnSale(checked === true)}
                        />
                        <Label htmlFor="status-sale">On Sale</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link href={`/products/${product.id}`} className="group">
                          <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                            <div className="relative aspect-square overflow-hidden">
                              {product.isNew && <Badge className="absolute top-2 left-2 z-10">New</Badge>}
                              {product.isSale && (
                                <Badge variant="destructive" className="absolute top-2 left-2 z-10">
                                  Sale
                                </Badge>
                              )}
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                              />
                            </div>
                            <CardContent className="p-4">
                              <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                              <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-muted-foreground line-through text-sm">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-sm">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3.5 w-3.5 ${
                                        i < Math.floor(product.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-1 text-muted-foreground">({product.reviewCount})</span>
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                              <Button variant="secondary" className="w-full">
                                Add to Cart
                              </Button>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-palette-olive/10 rounded-full flex items-center justify-center mb-4">
                      <Filter className="h-8 w-8 text-palette-olive" />
                    </div>
                    <h2 className="text-xl font-semibold text-palette-darkGreen mb-2">No products found</h2>
                    <p className="text-palette-darkGreen/70 mb-6">
                      Try adjusting your filters to find what you're looking for.
                    </p>
                    <Button onClick={resetFilters} className="bg-palette-olive hover:bg-palette-darkGreen text-white">
                      Reset Filters
                    </Button>
                  </div>
                )}

                {sortedProducts.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" disabled>
                        &lt;
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="icon">
                        &gt;
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  )
}
