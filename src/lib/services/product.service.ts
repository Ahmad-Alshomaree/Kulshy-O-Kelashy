import { BaseService } from "./base-service"
import { Product } from "../models/product.model"

export class ProductService extends BaseService<Product> {
  protected storageKey = "products"
  private static instance: ProductService

  // Sample products data
  private sampleProducts: Product[] = [
    new Product(1, "Minimalist Desk Lamp", 49.99, {
      category: "Home Decor",
      isNew: true,
      rating: { average: 4.5, count: 28 },
    }),
    new Product(2, "Leather Crossbody Bag", 89.99, {
      originalPrice: 129.99,
      category: "Accessories",
      isSale: true,
      discount: { percentage: 30, label: "30% OFF" },
      rating: { average: 4.8, count: 42 },
    }),
    new Product(3, "Wireless Earbuds", 79.99, {
      category: "Electronics",
      isNew: true,
      rating: { average: 4.2, count: 56 },
    }),
    new Product(4, "Cotton T-Shirt", 24.99, {
      category: "Clothing",
      rating: { average: 4.0, count: 120 },
    }),
  ]

  private constructor() {
    super()
    this.initializeProducts()
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService()
    }
    return ProductService.instance
  }

  private initializeProducts(): void {
    const storedProducts = this.getFromStorage()
    if (storedProducts.length === 0) {
      this.saveToStorage(this.sampleProducts)
    }
  }

  getAll(): Product[] {
    const products = this.getFromStorage()
    return products.map((p) => new Product(p.id, p.name, p.price, p))
  }

  getById(id: number): Product | null {
    const products = this.getAll()
    const product = products.find((p) => p.id === id)
    return product || null
  }

  getByCategory(category: string): Product[] {
    const products = this.getAll()
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  getNewArrivals(limit = 4): Product[] {
    const products = this.getAll()
    return products.filter((p) => p.isNew).slice(0, limit)
  }

  getOnSale(limit = 4): Product[] {
    const products = this.getAll()
    return products.filter((p) => p.isSale || p.isDiscounted).slice(0, limit)
  }

  search(query: string): Product[] {
    const products = this.getAll()
    const lowerQuery = query.toLowerCase()

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }
}
