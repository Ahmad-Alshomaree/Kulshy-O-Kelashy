import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"

export function ProductCategories() {
  const categories = [
    {
      id: 1,
      name: "Clothing",
      image: "/placeholder.svg?height=400&width=400",
      count: 124,
    },
    {
      id: 2,
      name: "Electronics",
      image: "/placeholder.svg?height=400&width=400",
      count: 86,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image: "/placeholder.svg?height=400&width=400",
      count: 157,
    },
    {
      id: 4,
      name: "Beauty & Personal Care",
      image: "/placeholder.svg?height=400&width=400",
      count: 92,
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      image: "/placeholder.svg?height=400&width=400",
      count: 73,
    },
    {
      id: 6,
      name: "Toys & Games",
      image: "/placeholder.svg?height=400&width=400",
      count: 45,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-palette-taupe/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-palette-darkGreen">Shop by Category</h2>
          <p className="mt-4 text-palette-darkGreen md:text-lg max-w-[700px]">
            Browse our wide selection of products across various categories
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id} className="group">
              <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-palette-darkGreen/80 to-transparent z-10" />
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <CardContent className="absolute bottom-0 left-0 right-0 z-20 p-6">
                    <h3 className="font-medium text-xl text-white mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} Products</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
