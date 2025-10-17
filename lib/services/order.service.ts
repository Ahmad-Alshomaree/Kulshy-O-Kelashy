import { BaseService } from "./base-service"
import { Order, type OrderStatus } from "../models/order.model"
import { CartService } from "./cart.service"
import { UserService } from "./user.service"

export class OrderService extends BaseService<Order> {
  protected storageKey = "orders"
  private static instance: OrderService
  private cartService: CartService
  private userService: UserService

  private constructor() {
    super()
    this.cartService = CartService.getInstance()
    this.userService = UserService.getInstance()
  }

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService()
    }
    return OrderService.instance
  }

  getOrders(userId?: number): Order[] {
    const orders = this.getFromStorage()

    if (userId) {
      return orders
        .filter((order) => order.userId === userId)
        .map(
          (order) => new Order(order.id, order.userId, order.items, order.shippingAddress, order.billingAddress, order),
        )
    }

    return orders.map(
      (order) => new Order(order.id, order.userId, order.items, order.shippingAddress, order.billingAddress, order),
    )
  }

  getOrderById(orderId: number): Order | null {
    const orders = this.getFromStorage()
    const order = orders.find((o) => o.id === orderId)

    if (!order) return null

    return new Order(order.id, order.userId, order.items, order.shippingAddress, order.billingAddress, order)
  }

  createOrder(shippingMethod: string, paymentMethod: string, notes?: string): Order {
    const currentUser = this.userService.getCurrentUser()

    if (!currentUser) {
      throw new Error("User must be logged in to create an order")
    }

    if (!currentUser.defaultAddress) {
      throw new Error("User must have a default shipping address")
    }

    const cart = this.cartService.getCart(currentUser.id)

    if (cart.isEmpty) {
      throw new Error("Cart is empty")
    }

    const order = new Order(
      Date.now(),
      currentUser.id,
      cart.items,
      currentUser.defaultAddress,
      currentUser.defaultAddress, // Using same address for billing
      {
        shippingMethod,
        paymentMethod,
        notes,
        shipping: shippingMethod === "express" ? 12.99 : cart.subtotal > 50 ? 0 : 5.99,
      },
    )

    // Save the order
    const orders = this.getFromStorage()
    orders.push(order.toJSON())
    this.saveToStorage(orders)

    // Clear the cart
    this.cartService.clearCart(currentUser.id)

    return order
  }

  updateOrderStatus(orderId: number, status: OrderStatus): Order | null {
    const orders = this.getFromStorage()
    const orderIndex = orders.findIndex((o) => o.id === orderId)

    if (orderIndex === -1) return null

    const order = new Order(
      orders[orderIndex].id,
      orders[orderIndex].userId,
      orders[orderIndex].items,
      orders[orderIndex].shippingAddress,
      orders[orderIndex].billingAddress,
      orders[orderIndex],
    )

    order.updateStatus(status)

    orders[orderIndex] = order.toJSON()
    this.saveToStorage(orders)

    return order
  }

  addTrackingNumber(orderId: number, trackingNumber: string): Order | null {
    const orders = this.getFromStorage()
    const orderIndex = orders.findIndex((o) => o.id === orderId)

    if (orderIndex === -1) return null

    const order = new Order(
      orders[orderIndex].id,
      orders[orderIndex].userId,
      orders[orderIndex].items,
      orders[orderIndex].shippingAddress,
      orders[orderIndex].billingAddress,
      orders[orderIndex],
    )

    order.addTrackingNumber(trackingNumber)

    orders[orderIndex] = order.toJSON()
    this.saveToStorage(orders)

    return order
  }
}
