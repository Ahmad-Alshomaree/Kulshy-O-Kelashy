import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHero } from "@/components/home-hero"
import { HomeProductSection } from "@/components/home-product-section"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"

// Async function to fetch products from the API
async function getProducts() {
  try {
    // Get the base URL from environment variable or default to localhost
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    // Fetch products with a limit of 50, no caching to ensure fresh data
    const response = await fetch(`${baseUrl}/api/products?limit=50`, {
      cache: 'no-store'
    })
    
    // If the response is not OK, return empty array
    if (!response.ok) return []
    
    // Parse the JSON response
    const products = await response.json()
    
    // Map the products to a simplified structure for the homepage
    return products.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviewCount: product.reviewCount,
      image: product.mainImage,
      isNew: product.isNew,
      isSale: product.isSale,
      discount: product.discount,
      viewCount: product.viewCount,
    }))
  } catch (error) {
    // If there's any error, return empty array
    return []
  }
}

// Helper function to get top products based on a sort key
function getTopProducts(products: any[], sortKey: string, limit = 4) {
  // Create a copy of the array, sort by the provided key in descending order, and take the top 'limit' items
  return [...products].sort((a, b) => b[sortKey] - a[sortKey]).slice(0, limit)
}

// Main Home page component - exported as default for Next.js page routing
export default async function Home() {
  // Fetch all products from the API
  const allProducts = await getProducts()

  // Get top 4 highest rated products
  const highRatedProducts = getTopProducts(allProducts, 'rating')
  // Get top 4 highest rated products that are on sale
  const offerProducts = getTopProducts(allProducts.filter(p => p.isSale), 'rating')
  // Get top 4 most viewed products
  const mostViewedProducts = getTopProducts(allProducts, 'viewCount')

  return (
    // Wrapper component for page transition animations
    <PageTransitionWrapper>
      {/* Main container with flex column layout, full screen height, and light background */}
      <div className="flex flex-col min-h-screen bg-secondary/30">
        {/* Header component with navigation and logo */}
        <HomeHeader />

        {/* Main content area that takes up remaining space */}
        <main className="flex-1">
          {/* Hero section at the top of the page */}
          <HomeHero />
          {/* First product section - High-Rated Items */}
          <HomeProductSection title="High-Rated Items" products={highRatedProducts} featureType="high-rated" />
          {/* Second product section - Offers with a slightly darker background */}
          <HomeProductSection title="Offers" products={offerProducts} className="bg-muted/50" featureType="offers" />
          {/* Third product section - Most Viewed */}
          <HomeProductSection title="Most Viewed" products={mostViewedProducts} featureType="most-viewed" />
        </main>

        {/* Footer component at the bottom of the page */}
        <HomeFooter />
      </div>
    </PageTransitionWrapper>
  )
}