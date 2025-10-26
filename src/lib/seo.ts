import { Metadata } from 'next'

export const siteConfig = {
  name: 'EcoShop',
  description: 'Shop eco-friendly products for a sustainable lifestyle',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/ecoshop',
    github: 'https://github.com/ecoshop',
  },
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  keywords,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || `${siteConfig.url}${siteConfig.ogImage}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords?.join(', '),
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@ecoshop',
    },
    alternates: {
      canonical: siteConfig.url,
    },
  }
}

export function generateProductMetadata({
  name,
  description,
  price,
  currency = 'USD',
  image,
  category,
  availability = 'in stock',
}: {
  name: string
  description: string
  price: number
  currency?: string
  image?: string
  category?: string
  availability?: string
}) {
  return generateMetadata({
    title: name,
    description,
    image,
    keywords: [name, category, 'eco-friendly', 'sustainable', 'shop'].filter(Boolean) as string[],
  })
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
    ],
  }
}

export function generateProductSchema({
  name,
  description,
  image,
  price,
  currency = 'USD',
  availability = 'InStock',
  rating,
  reviewCount,
  brand = siteConfig.name,
  sku,
}: {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  rating?: number
  reviewCount?: number
  brand?: string
  sku?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: siteConfig.url,
      priceCurrency: currency,
      price: price.toFixed(2),
      availability: `https://schema.org/${availability}`,
      seller: {
        '@type': 'Organization',
        name: brand,
      },
    },
  }

  if (sku) {
    schema.sku = sku
  }

  if (rating && reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
    }
  }

  return schema
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function generateWebPageSchema({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${siteConfig.url}${url}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}
