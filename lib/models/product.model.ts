import { BaseModel } from "./base-model"

export interface ProductRating {
  average: number
  count: number
}

export interface ProductDiscount {
  percentage: number
  label: string
}

export interface ProductVariant {
  id: number
  name: string
  price: number
  sku: string
  inventory: number
}

export class Product extends BaseModel {
  name: string
  description: string
  price: number
  originalPrice: number | null
  images: string[]
  category: string
  isNew: boolean
  isSale: boolean
  discount: ProductDiscount | null
  rating: ProductRating
  variants: ProductVariant[]
  tags: string[]

  constructor(id: number, name: string, price: number, data: Partial<Product> = {}) {
    super(id, data)
    this.name = name
    this.description = data.description || ""
    this.price = price
    this.originalPrice = data.originalPrice || null
    this.images = data.images || ["/placeholder.svg?height=300&width=300"]
    this.category = data.category || "Uncategorized"
    this.isNew = data.isNew || false
    this.isSale = data.isSale || false
    this.discount = data.discount || null
    this.rating = data.rating || { average: 0, count: 0 }
    this.variants = data.variants || []
    this.tags = data.tags || []
  }

  get mainImage(): string {
    return this.images[0] || "/placeholder.svg?height=300&width=300"
  }

  get discountPercentage(): number {
    if (!this.originalPrice) return 0
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
  }

  get isDiscounted(): boolean {
    return this.originalPrice !== null && this.originalPrice > this.price
  }

  hasInventory(): boolean {
    if (this.variants.length === 0) return true
    return this.variants.some((variant) => variant.inventory > 0)
  }

  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description,
      price: this.price,
      originalPrice: this.originalPrice,
      images: this.images,
      category: this.category,
      isNew: this.isNew,
      isSale: this.isSale,
      discount: this.discount,
      rating: this.rating,
      variants: this.variants,
      tags: this.tags,
    }
  }
}
