import { BaseModel } from "./base-model"

export interface User {
  id: string
  email: string
  firstName: string
  lastName?: string
}

export interface Address {
  street: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: number
  type: "card" | "paypal" | "other"
  lastFour?: string
  expiryDate?: string
  isDefault: boolean
}

export class BaseModelUser extends BaseModel {
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses: Address[] = []
  paymentMethods: PaymentMethod[] = []
  isVerified = false
  role: "customer" | "seller" | "admin" = "customer"

  constructor(id: number, email: string, firstName: string, lastName: string, data: Partial<BaseModelUser> = {}) {
    super(id, data)
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.phone = data.phone
    this.addresses = data.addresses || []
    this.paymentMethods = data.paymentMethods || []
    this.isVerified = data.isVerified || false
    this.role = data.role || "customer"
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  get defaultAddress(): Address | undefined {
    return this.addresses.find((address) => address.isDefault)
  }

  get defaultPaymentMethod(): PaymentMethod | undefined {
    return this.paymentMethods.find((method) => method.isDefault)
  }

  addAddress(address: Address): void {
    if (address.isDefault) {
      // Set all other addresses to non-default
      this.addresses.forEach((addr) => (addr.isDefault = false))
    }
    this.addresses.push(address)
  }

  addPaymentMethod(method: PaymentMethod): void {
    if (method.isDefault) {
      // Set all other payment methods to non-default
      this.paymentMethods.forEach((m) => (m.isDefault = false))
    }
    this.paymentMethods.push(method)
  }

  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      phone: this.phone,
      addresses: this.addresses,
      paymentMethods: this.paymentMethods,
      isVerified: this.isVerified,
      role: this.role,
    }
  }
}
