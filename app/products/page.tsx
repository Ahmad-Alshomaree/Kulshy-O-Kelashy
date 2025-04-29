import Link from "next/link"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
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
    {
      id: 5,
      name: "Smart Watch",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      isNew: true,
      isSale: false,
    },
    {
      id: 6,
      name: "Ceramic Coffee Mug",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Kitchen",
      isNew: false,
      isSale: false,
    },
    {
      id: 7,
      name: "Denim Jacket",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      isNew: false,
      isSale: true,
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      isNew: false,
      isSale: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
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
                        <div className="flex items-center space-x-2">
                          <Checkbox id="category-all-mobile" />
                          <Label htmlFor="category-all-mobile">All Categories</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="category-clothing-mobile" />
                          <Label htmlFor="category-clothing-mobile">Clothing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="category-electronics-mobile" />
                          <Label htmlFor="category-electronics-mobile">Electronics</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="category-home-mobile" />
                          <Label htmlFor="category-home-mobile">Home & Kitchen</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="category-accessories-mobile" />
                          <Label htmlFor="category-accessories-mobile">Accessories</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Price Range</h3>
                      <RadioGroup defaultValue="all">
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
                          <Checkbox id="status-new-mobile" />
                          <Label htmlFor="status-new-mobile">New Arrivals</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-sale-mobile" />
                          <Label htmlFor="status-sale-mobile">On Sale</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button>Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:inline">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
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
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
                    Reset
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-all" />
                      <Label htmlFor="category-all">All Categories</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-clothing" />
                      <Label htmlFor="category-clothing">Clothing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-electronics" />
                      <Label htmlFor="category-electronics">Electronics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-home" />
                      <Label htmlFor="category-home">Home & Kitchen</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-accessories" />
                      <Label htmlFor="category-accessories">Accessories</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  <RadioGroup defaultValue="all">
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
                      <Checkbox id="status-new" />
                      <Label htmlFor="status-new">New Arrivals</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-sale" />
                      <Label htmlFor="status-sale">On Sale</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id} className="group">
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
                        <div className="flex items-center gap-2">
                          <span className="font-bold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground line-through text-sm">${product.originalPrice}</span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="secondary" className="w-full">
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
