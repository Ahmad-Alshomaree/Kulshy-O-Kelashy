import { BaseModel } from "./base-model"
import type { Product } from "./product.model"

export class CartItem extends BaseModel {
  product: Product
  quantity: number
  variantId?: number
  color?: string
  size?: string

  constructor(id: number, product: Product, quantity = 1, data: Partial<CartItem> = {}) {
    super(id, data)
    this.product = product
    this.quantity = quantity
    this.variantId = data.variantId
    this.color = data.color
    this.size = data.size
  }

  get subtotal(): number {
    return this.product.price * this.quantity
  }

  incrementQuantity(amount = 1): void {
    this.quantity += amount
  }

  decrementQuantity(amount = 1): void {
    this.quantity = Math.max(1, this.quantity - amount)
  }

  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      product: this.product.toJSON(),
      quantity: this.quantity,
      variantId: this.variantId,
      color: this.color,
      size: this.size,
      subtotal: this.subtotal,
    }
  }
}
