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

// Async function to fetch homepage sections
async function getHomepageSections() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/homepage-sections`, {
      cache: 'no-store'
    })
    
    if (!response.ok) return []
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching homepage sections:', error)
    return []
  }
}

// Helper function to get top products based on a sort key
function getTopProducts(products: any[], sortKey: string, limit = 4) {
  // Create a copy of the array, sort by the provided key in descending order, and take the top 'limit' items
  return [...products].sort((a, b) => b[sortKey] - a[sortKey]).slice(0, limit)
}

// Helper function to get products for a specific feature type
function getProductsByFeatureType(products: any[], featureType: string, limit = 4) {
  switch (featureType) {
    case 'high-rated':
      return getTopProducts(products, 'rating', limit)
    case 'offers':
      return getTopProducts(products.filter(p => p.isSale), 'rating', limit)
    case 'most-viewed':
      return getTopProducts(products, 'viewCount', limit)
    case 'new-arrivals':
      return getTopProducts(products.filter(p => p.isNew), 'createdAt', limit)
    default:
      return getTopProducts(products, 'rating', limit)
  }
}

// Main Home page component - exported as default for Next.js page routing
export default async function Home() {
  // Fetch all products and homepage sections from the API
  const allProducts = await getProducts()
  const homepageSections = await getHomepageSections()

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
          
          {/* Dynamic homepage sections */}
          {homepageSections.map((section: any, index: number) => {
            const products = getProductsByFeatureType(allProducts, section.featureType)
            return (
              <HomeProductSection
                key={section._id || index}
                title={section.title}
                products={products}
                featureType={section.featureType}
                className={section.backgroundColor || (index % 2 === 1 ? 'bg-muted/50' : '')}
              />
            )
          })}
        </main>

        {/* Footer component at the bottom of the page */}
        <HomeFooter />
      </div>
    </PageTransitionWrapper>
  )
}