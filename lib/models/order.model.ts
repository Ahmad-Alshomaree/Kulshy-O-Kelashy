import { BaseModel } from "./base-model"
import type { CartItem } from "./cart-item.model"
import type { Address } from "./user.model"

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

export class OrderItem extends BaseModel {
  productId: number
  productName: string
  price: number
  quantity: number
  variantId?: number
  color?: string
  size?: string
  image: string

  constructor(id: number, cartItem: CartItem) {
    super(id)
    this.productId = cartItem.product.id
    this.productName = cartItem.product.name
    this.price = cartItem.product.price
    this.quantity = cartItem.quantity
    this.variantId = cartItem.variantId
    this.color = cartItem.color
    this.size = cartItem.size
    this.image = cartItem.product.mainImage
  }

  get subtotal(): number {
    return this.price * this.quantity
  }

  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      productId: this.productId,
      productName: this.productName,
      price: this.price,
      quantity: this.quantity,
      variantId: this.variantId,
      color: this.color,
      size: this.size,
      image: this.image,
      subtotal: this.subtotal,
    }
  }
}

export class Order extends BaseModel {
  userId: number
  items: OrderItem[] = []
  status: OrderStatus = "pending"
  shippingAddress: Address
  billingAddress: Address
  shippingMethod: string
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  notes?: string
  trackingNumber?: string

  constructor(
    id: number,
    userId: number,
    cartItems: CartItem[],
    shippingAddress: Address,
    billingAddress: Address,
    data: Partial<Order> = {},
  ) {
    super(id, data)
    this.userId = userId
    this.items = cartItems.map((item) => new OrderItem(Date.now() + item.id, item))
    this.shippingAddress = shippingAddress
    this.billingAddress = billingAddress
    this.shippingMethod = data.shippingMethod || "standard"
    this.paymentMethod = data.paymentMethod || "card"
    this.subtotal = this.calculateSubtotal()
    this.shipping = data.shipping || 0
    this.tax = data.tax || this.calculateTax()
    this.total = this.calculateTotal()
    this.notes = data.notes
    this.trackingNumber = data.trackingNumber
    this.status = data.status || "pending"
  }

  private calculateSubtotal(): number {
    return this.items.reduce((total, item) => total + item.subtotal, 0)
  }

  private calculateTax(): number {
    // Default tax rate of 8%
    return this.subtotal * 0.08
  }

  private calculateTotal(): number {
    return this.subtotal + this.shipping + this.tax
  }

  updateStatus(status: OrderStatus): void {
    this.status = status
    this.updatedAt = new Date()
  }

  addTrackingNumber(trackingNumber: string): void {
    this.trackingNumber = trackingNumber
    this.updatedAt = new Date()
  }

  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      userId: this.userId,
      items: this.items.map((item) => item.toJSON()),
      status: this.status,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      shippingMethod: this.shippingMethod,
      paymentMethod: this.paymentMethod,
      subtotal: this.subtotal,
      shipping: this.shipping,
      tax: this.tax,
      total: this.total,
      notes: this.notes,
      trackingNumber: this.trackingNumber,
    }
  }
}

export interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  image: string
}

export interface Order {
  id: string
  date: string
  total: number
  status: string
  items: OrderItem[]
}
