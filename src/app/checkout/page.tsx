"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, CreditCard, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

// Define user information type
type UserInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  address2: string
  city: string
  state: string
  sameAsBilling: boolean
  billingAddress: string
  billingAddress2: string
  billingCity: string
  billingState: string
}

// Define payment information type
type PaymentInfo = {
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvc: string
  nameOnCard: string
}

// Function to mask card number for display
const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return ""
  // Remove spaces and non-numeric characters
  const cleaned = cardNumber.replace(/\D/g, "")
  // Only show last 4 digits
  return cleaned.length > 4 ? `•••• •••• •••• ${cleaned.slice(-4)}` : cleaned
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const { items, subtotal, clearCart } = useCart()
  const { user, addOrder } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [editingContact, setEditingContact] = useState(false)
  const [editingShipping, setEditingShipping] = useState(false)
  const [editingPayment, setEditingPayment] = useState(false)

  // Calculate shipping cost
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue with checkout.",
      })
      router.push("/login")
    }
  }, [user, router, toast])

  // Check if cart is empty and redirect if needed
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checkout.",
      })
      // Use window.location for client-side navigation when needed
      router.push("/cart")
    }
  }, [items, step, toast, router])

  // Initialize user information from localStorage or with empty values
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    // Try to get saved user info from localStorage
    if (typeof window !== "undefined" && user) {
      const userInfoKey = `userCheckoutInfo_${user.email}`
      const savedInfo = localStorage.getItem(userInfoKey)
      if (savedInfo) {
        try {
          return JSON.parse(savedInfo)
        } catch (e) {
          console.error("Failed to parse saved user info:", e)
        }
      }
    }

    // Default values if no saved info exists
    return {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      phone: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      sameAsBilling: true,
      billingAddress: "",
      billingAddress2: "",
      billingCity: "",
      billingState: "",
    }
  })

  // Initialize payment information from localStorage or with empty values
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(() => {
    // Try to get saved payment info from localStorage
    if (typeof window !== "undefined" && user) {
      const userPaymentKey = `userPaymentInfo_${user.email}`
      const savedPaymentInfo = localStorage.getItem(userPaymentKey)
      if (savedPaymentInfo) {
        try {
          return JSON.parse(savedPaymentInfo)
        } catch (e) {
          console.error("Failed to parse saved payment info:", e)
        }
      }
    }

    // Default values if no saved info exists
    return {
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      nameOnCard: "",
    }
  })

  // Update nameOnCard when userInfo changes
  useEffect(() => {
    if (userInfo.firstName || userInfo.lastName) {
      setPaymentInfo((prev) => ({
        ...prev,
        nameOnCard: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
      }))
    }
  }, [userInfo.firstName, userInfo.lastName])

  // Save user info to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const userInfoKey = `userCheckoutInfo_${user.email}`
      localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
    }
  }, [userInfo, user])

  // Save payment info to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const userPaymentKey = `userPaymentInfo_${user.email}`
      localStorage.setItem(userPaymentKey, JSON.stringify(paymentInfo))
    }
  }, [paymentInfo, user])

  // Handle form input changes for user info
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form input changes for payment info
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setUserInfo((prev) => ({
      ...prev,
      sameAsBilling: checked,
      billingAddress: checked ? prev.address : prev.billingAddress,
      billingAddress2: checked ? prev.address2 : prev.billingAddress2,
      billingCity: checked ? prev.city : prev.billingCity,
      billingState: checked ? prev.state : prev.billingState,
    }))
  }

  // Handle select changes for user info
  const handleSelectChange = (name: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setPaymentInfo((prev) => ({ ...prev, paymentMethod: value }))
  }

  // Handle order completion
  const handleCompleteOrder = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to complete your order.",
      })
      router.push("/login")
      return
    }

    // Create a new order
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      total: total,
      status: "processing",
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
    }

    // Add the order to the user's orders
    addOrder(newOrder)

    // Move to confirmation step
    setStep(3)

    // Clear the cart after successful order
    clearCart()
  }

  // Check if user has filled out required fields
  const hasFilledContactInfo = userInfo.firstName && userInfo.lastName && userInfo.email && userInfo.phone
  const hasFilledShippingInfo = userInfo.address && userInfo.city && userInfo.state
  const hasFilledPaymentInfo =
    paymentInfo.paymentMethod === "paypal" ||
    (paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvc && paymentInfo.nameOnCard)

  // Don't render anything until we check authentication
  if (!user) {
    return null
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="flex items-center justify-between max-w-3xl">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {step > 1 ? <Check className="h-5 w-5" /> : 1}
            </div>
            <span className="text-sm mt-2">Shipping</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {step > 2 ? <Check className="h-5 w-5" /> : 2}
            </div>
            <span className="text-sm mt-2">Payment</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <span className="text-sm mt-2">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Contact Information</h2>
                  {hasFilledContactInfo && !editingContact && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingContact(true)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>

                {hasFilledContactInfo && !editingContact ? (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Name:</span> {userInfo.firstName} {userInfo.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {userInfo.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {userInfo.phone}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={userInfo.firstName}
                          onChange={handleChange}
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={userInfo.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={userInfo.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    {hasFilledContactInfo && (
                      <Button size="sm" onClick={() => setEditingContact(false)}>
                        Save Contact Info
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Shipping Address</h2>
                  {hasFilledShippingInfo && !editingShipping && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingShipping(true)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>

                {hasFilledShippingInfo && !editingShipping ? (
                  <div className="space-y-2">
                    <p>{userInfo.address}</p>
                    {userInfo.address2 && <p>{userInfo.address2}</p>}
                    <p>
                      {userInfo.city}, {userInfo.state}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="address2"
                        name="address2"
                        value={userInfo.address2}
                        onChange={handleChange}
                        placeholder="Apt 4B"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={userInfo.city}
                          onChange={handleChange}
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select value={userInfo.state} onValueChange={(value) => handleSelectChange("state", value)}>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {hasFilledShippingInfo && (
                      <Button size="sm" onClick={() => setEditingShipping(false)}>
                        Save Shipping Info
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4">Shipping Method</h2>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between border rounded-lg p-4 mb-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-medium">
                        Standard Shipping
                      </Label>
                    </div>
                    <div className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</div>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-4 mb-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-medium">
                        Express Shipping
                      </Label>
                    </div>
                    <div className="font-medium">$12.99</div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Link href="/cart">
                  <Button variant="outline">Back to Basket</Button>
                </Link>
                <Button onClick={() => setStep(2)} disabled={!hasFilledContactInfo || !hasFilledShippingInfo}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Payment Method</h2>
                  {hasFilledPaymentInfo && !editingPayment && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingPayment(true)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>

                {hasFilledPaymentInfo && !editingPayment ? (
                  <div className="space-y-4">
                    {paymentInfo.paymentMethod === "card" ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          <span className="font-medium">Credit / Debit Card</span>
                        </div>
                        <p>
                          <span className="font-medium">Card Number:</span> {maskCardNumber(paymentInfo.cardNumber)}
                        </p>
                        <p>
                          <span className="font-medium">Expiry Date:</span> {paymentInfo.expiryDate}
                        </p>
                        <p>
                          <span className="font-medium">Name on Card:</span> {paymentInfo.nameOnCard}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">PayPal</span>
                        <p>You'll be redirected to PayPal to complete your payment.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <RadioGroup value={paymentInfo.paymentMethod} onValueChange={handlePaymentMethodChange}>
                      <div className="flex items-center justify-between border rounded-lg p-4 mb-2">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="font-medium flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Credit / Debit Card
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border rounded-lg p-4 mb-2">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="font-medium">
                            PayPal
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentInfo.paymentMethod === "card" && (
                      <div className="mt-4 grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              name="cvc"
                              value={paymentInfo.cvc}
                              onChange={handlePaymentChange}
                              placeholder="123"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            name="nameOnCard"
                            value={paymentInfo.nameOnCard}
                            onChange={handlePaymentChange}
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}

                    {hasFilledPaymentInfo && (
                      <Button size="sm" onClick={() => setEditingPayment(false)} className="mt-4">
                        Save Payment Info
                      </Button>
                    )}
                  </>
                )}
              </div>

              <div className="rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4">Billing Address</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Checkbox id="same-address" checked={userInfo.sameAsBilling} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="same-address">Same as shipping address</Label>
                </div>

                {!userInfo.sameAsBilling && (
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-address">Address</Label>
                      <Input
                        id="billing-address"
                        name="billingAddress"
                        value={userInfo.billingAddress}
                        onChange={handleChange}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-address2">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="billing-address2"
                        name="billingAddress2"
                        value={userInfo.billingAddress2}
                        onChange={handleChange}
                        placeholder="Apt 4B"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">City</Label>
                        <Input
                          id="billing-city"
                          name="billingCity"
                          value={userInfo.billingCity}
                          onChange={handleChange}
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-state">State</Label>
                        <Select
                          value={userInfo.billingState}
                          onValueChange={(value) => handleSelectChange("billingState", value)}
                        >
                          <SelectTrigger id="billing-state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back to Shipping
                </Button>
                <Button onClick={handleCompleteOrder} disabled={!hasFilledPaymentInfo}>
                  Complete Order
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-bold text-2xl mb-2">Thank You for Your Order!</h2>
                <p className="text-muted-foreground mb-6">
                  Your order has been placed and is being processed. You will receive an email confirmation shortly.
                </p>
                <div className="text-left p-4 bg-muted/50 rounded-lg mb-6">
                  <div className="font-medium mb-2">Order #{Math.floor(Math.random() * 100000)}</div>
                  <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
                </div>
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="rounded-lg border p-6 sticky top-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.color}, {item.size}
                    </div>
                    <div className="text-sm">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </div>
                  </div>
                  <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
