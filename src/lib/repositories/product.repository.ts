import { Product } from "../models/product.model"

export interface IProductRepository {
  getAll(): Promise<Product[]>
  getById(id: number): Promise<Product | null>
  getByCategory(category: string): Promise<Product[]>
  search(query: string): Promise<Product[]>
}

export class LocalStorageProductRepository implements IProductRepository {
  private storageKey = "products"

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

  constructor() {
    this.initializeProducts()
  }

  private initializeProducts(): void {
    if (typeof window === "undefined") return

    try {
      const data = localStorage.getItem(this.storageKey)
      if (!data) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.sampleProducts))
      }
    } catch (error) {
      console.error("Error initializing products:", error)
    }
  }

  private getFromStorage(): Product[] {
    if (typeof window === "undefined") return []

    try {
      const data = localStorage.getItem(this.storageKey)
      const products = data ? JSON.parse(data) : []
      return products.map((p: any) => new Product(p.id, p.name, p.price, p))
    } catch (error) {
      console.error("Error retrieving products from localStorage:", error)
      return []
    }
  }

  async getAll(): Promise<Product[]> {
    return this.getFromStorage()
  }

  async getById(id: number): Promise<Product | null> {
    const products = await this.getAll()
    return products.find((p) => p.id === id) || null
  }

  async getByCategory(category: string): Promise<Product[]> {
    const products = await this.getAll()
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  async search(query: string): Promise<Product[]> {
    const products = await this.getAll()
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

// API implementation of the repository
export class ApiProductRepository implements IProductRepository {
  private apiUrl = "/api/products"

  async getAll(): Promise<Product[]> {
    const response = await fetch(this.apiUrl)
    const data = await response.json()

    return data.map((p: any) => new Product(p.id, p.name, p.price, p))
  }

  async getById(id: number): Promise<Product | null> {
    const response = await fetch(`${this.apiUrl}/${id}`)

    if (!response.ok) return null

    const data = await response.json()
    return new Product(data.id, data.name, data.price, data)
  }

  async getByCategory(category: string): Promise<Product[]> {
    const response = await fetch(`${this.apiUrl}?category=${category}`)
    const data = await response.json()

    return data.map((p: any) => new Product(p.id, p.name, p.price, p))
  }

  async search(query: string): Promise<Product[]> {
    const response = await fetch(`${this.apiUrl}/search?q=${query}`)
    const data = await response.json()

    return data.map((p: any) => new Product(p.id, p.name, p.price, p))
  }
}

// Factory to get the appropriate repository
export class ProductRepositoryFactory {
  static getRepository(): IProductRepository {
    // In a real app, we might choose based on environment or config
    return new LocalStorageProductRepository()
  }
}
