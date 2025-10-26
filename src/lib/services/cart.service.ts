import { BaseService } from "./base-service"
import { Cart } from "../models/cart.model"
import { Product } from "../models/product.model"
import { CartItem } from "../models/cart-item.model"

export class CartService extends BaseService<Cart> {
  protected storageKey = "cart"
  private static instance: CartService
  private currentCart: Cart | null = null

  private constructor() {
    super()
  }

  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService()
    }
    return CartService.instance
  }

  private getUserCartKey(userId?: number): string {
    return userId ? `${this.storageKey}_${userId}` : this.storageKey
  }

  getCart(userId?: number): Cart {
    if (this.currentCart) return this.currentCart

    const storageKey = this.getUserCartKey(userId)
    let cart: Cart

    try {
      const data = localStorage.getItem(storageKey)
      if (data) {
        const parsedData = JSON.parse(data)
        cart = new Cart(parsedData.id || Date.now(), parsedData)

        // Convert plain objects to CartItem instances
        cart.items = parsedData.items.map((item: any) => {
          const product = new Product(item.product.id, item.product.name, item.product.price, item.product)

          return new CartItem(item.id, product, item.quantity, {
            variantId: item.variantId,
            color: item.color,
            size: item.size,
          })
        })
      } else {
        cart = new Cart(Date.now(), { userId })
      }
    } catch (error) {
      console.error("Error retrieving cart from localStorage:", error)
      cart = new Cart(Date.now(), { userId })
    }

    this.currentCart = cart
    return cart
  }

  saveCart(cart: Cart): void {
    const storageKey = this.getUserCartKey(cart.userId)
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart.toJSON()))
      this.currentCart = cart
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }

  addItem(product: Product, quantity = 1, options: Partial<CartItem> = {}, userId?: number): CartItem {
    const cart = this.getCart(userId)
    const item = cart.addItem(product, quantity, options)
    this.saveCart(cart)
    return item
  }

  removeItem(itemId: number, userId?: number): void {
    const cart = this.getCart(userId)
    cart.removeItem(itemId)
    this.saveCart(cart)
  }

  updateItemQuantity(itemId: number, quantity: number, userId?: number): void {
    const cart = this.getCart(userId)
    cart.updateItemQuantity(itemId, quantity)
    this.saveCart(cart)
  }

  clearCart(userId?: number): void {
    const cart = this.getCart(userId)
    cart.clear()
    this.saveCart(cart)
  }

  getItemCount(userId?: number): number {
    const cart = this.getCart(userId)
    return cart.itemCount
  }

  getSubtotal(userId?: number): number {
    const cart = this.getCart(userId)
    return cart.subtotal
  }

  hasProduct(productId: number, userId?: number): boolean {
    const cart = this.getCart(userId)
    return cart.hasProduct(productId)
  }
}
