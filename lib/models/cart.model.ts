import { BaseModel } from "./base-model"
import { CartItem } from "./cart-item.model"
import type { Product } from "./product.model"

export class Cart extends BaseModel {
  items: CartItem[] = []
  userId?: number

  constructor(id: number, data: Partial<Cart> = {}) {
    super(id, data)
    this.items = data.items || []
    this.userId = data.userId
  }

  get itemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  get subtotal(): number {
    return this.items.reduce((total, item) => total + item.subtotal, 0)
  }

  get isEmpty(): boolean {
    return this.items.length === 0
  }

  addItem(product: Product, quantity = 1, options: Partial<CartItem> = {}): CartItem {
    const existingItemIndex = this.items.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.variantId === options.variantId &&
        item.color === options.color &&
        item.size === options.size,
    )

    if (existingItemIndex >= 0) {
      this.items[existingItemIndex].incrementQuantity(quantity)
      return this.items[existingItemIndex]
    } else {
      const newItem = new CartItem(
        Date.now(), // Using timestamp as temporary ID
        product,
        quantity,
        options,
      )
      this.items.push(newItem)
      return newItem
    }
  }

  removeItem(itemId: number): void {
    this.items = this.items.filter((item) => item.id !== itemId)
  }

  updateItemQuantity(itemId: number, quantity: number): void {
    const item = this.items.find((item) => item.id === itemId)
    if (item && quantity > 0) {
      item.quantity = quantity
    } else if (item && quantity <= 0) {
      this.removeItem(itemId)
    }
  }

  clear(): void {
    this.items = []
  }

  hasProduct(productId: number): boolean {
    return this.items.some((item) => item.product.id === productId)
  }

  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      items: this.items.map((item) => item.toJSON()),
      userId: this.userId,
      itemCount: this.itemCount,
      subtotal: this.subtotal,
    }
  }
}
