import { ProductService } from "./product.service"
import { CartService } from "./cart.service"
import { UserService } from "./user.service"
import { OrderService } from "./order.service"

export class ServiceFactory {
  static getProductService(): ProductService {
    return ProductService.getInstance()
  }

  static getCartService(): CartService {
    return CartService.getInstance()
  }

  static getUserService(): UserService {
    return UserService.getInstance()
  }

  static getOrderService(): OrderService {
    return OrderService.getInstance()
  }
}
