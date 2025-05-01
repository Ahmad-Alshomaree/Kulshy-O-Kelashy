import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHero } from "@/components/home-hero"
import { HomeProductSection } from "@/components/home-product-section"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"

export default function Home() {
  // Sample product data
  const highRatedProducts = [
    {
      id: 1,
      name: "Wireless Gaming Controller",
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviewCount: 254,
      image: "/placeholder.svg?height=200&width=200&text=Controller",
      isNew: false,
      isSale: true,
      discount: "-15%",
    },
    {
      id: 2,
      name: "RGB Mechanical Keyboard",
      price: 89.99,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 189,
      image: "/placeholder.svg?height=200&width=200&text=Keyboard",
      isNew: true,
      isSale: false,
      discount: null,
    },
    {
      id: 3,
      name: "27-inch Gaming Monitor",
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.9,
      reviewCount: 127,
      image: "/placeholder.svg?height=200&width=200&text=Monitor",
      isNew: false,
      isSale: true,
      discount: "-15%",
    },
    {
      id: 4,
      name: "Modern Dining Chair",
      price: 129.99,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 98,
      image: "/placeholder.svg?height=200&width=200&text=Chair",
      isNew: false,
      isSale: false,
      discount: null,
    },
  ]

  const offerProducts = [
    {
      id: 5,
      name: "Wireless Gaming Controller",
      price: 44.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviewCount: 254,
      image: "/placeholder.svg?height=200&width=200&text=Controller",
      isNew: false,
      isSale: true,
      discount: "-25%",
    },
    {
      id: 6,
      name: "RGB Mechanical Keyboard",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviewCount: 189,
      image: "/placeholder.svg?height=200&width=200&text=Keyboard",
      isNew: false,
      isSale: true,
      discount: "-20%",
    },
    {
      id: 7,
      name: "27-inch Gaming Monitor",
      price: 279.99,
      originalPrice: 349.99,
      rating: 4.9,
      reviewCount: 127,
      image: "/placeholder.svg?height=200&width=200&text=Monitor",
      isNew: false,
      isSale: true,
      discount: "-20%",
    },
    {
      id: 8,
      name: "Modern Dining Chair",
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviewCount: 98,
      image: "/placeholder.svg?height=200&width=200&text=Chair",
      isNew: false,
      isSale: true,
      discount: "-25%",
    },
  ]

  const mostViewedProducts = [
    {
      id: 9,
      name: "Wireless Gaming Controller",
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviewCount: 254,
      image: "/placeholder.svg?height=200&width=200&text=Controller",
      isNew: false,
      isSale: true,
      discount: "-15%",
    },
    {
      id: 10,
      name: "RGB Mechanical Keyboard",
      price: 89.99,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 189,
      image: "/placeholder.svg?height=200&width=200&text=Keyboard",
      isNew: false,
      isSale: false,
      discount: null,
    },
    {
      id: 11,
      name: "27-inch Gaming Monitor",
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.9,
      reviewCount: 127,
      image: "/placeholder.svg?height=200&width=200&text=Monitor",
      isNew: false,
      isSale: true,
      discount: "-15%",
    },
    {
      id: 12,
      name: "Modern Dining Chair",
      price: 129.99,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 98,
      image: "/placeholder.svg?height=200&width=200&text=Chair",
      isNew: false,
      isSale: false,
      discount: null,
    },
  ]

  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-palette-cream/50">
        <HomeHeader />

        <main className="flex-1">
          {/* Hero Section */}
          <HomeHero />

          {/* High-Rated Items */}
          <HomeProductSection title="High-Rated Items" products={highRatedProducts} />

          {/* Offers */}
          <HomeProductSection title="Offers" products={offerProducts} className="bg-palette-taupe/10" />

          {/* Most Viewed */}
          <HomeProductSection title="Most Viewed" products={mostViewedProducts} />
        </main>

        <HomeFooter />
      </div>
    </PageTransitionWrapper>
  )
}
