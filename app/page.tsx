import { Newsletter } from "@/components/newsletter"
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
      viewCount: 320,
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
      viewCount: 280,
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
      viewCount: 450,
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
      viewCount: 180,
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
      viewCount: 310,
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
      viewCount: 290,
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
      viewCount: 420,
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
      viewCount: 170,
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
      viewCount: 520,
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
      viewCount: 480,
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
      viewCount: 650,
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
      viewCount: 510,
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
          <HomeProductSection title="High-Rated Items" products={highRatedProducts} featureType="high-rated" />

          {/* Offers */}
          <HomeProductSection
            title="Offers"
            products={offerProducts}
            className="bg-palette-taupe/10"
            featureType="offers"
          />

          {/* Most Viewed */}
          <HomeProductSection title="Most Viewed" products={mostViewedProducts} featureType="most-viewed" />

          {/* Newsletter */}
          <Newsletter />
        </main>

        <HomeFooter />
      </div>
    </PageTransitionWrapper>
  )
}
