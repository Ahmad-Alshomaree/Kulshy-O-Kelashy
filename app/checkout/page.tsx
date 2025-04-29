"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)

  const cartItems = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      color: "Black",
      size: "M",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 79.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      color: "White",
      size: "One Size",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99

  const total = subtotal + shipping 

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
                <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                    <Input id="address2" placeholder="Apt 4B" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
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
                  <Button variant="outline">Back to Cart</Button>
                </Link>
                <Button onClick={() => setStep(2)}>Continue to Payment</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
                <RadioGroup defaultValue="card">
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
              </div>

              <div className="rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4">Card Information</h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input id="name-on-card" placeholder="John Doe" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4">Billing Address</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Checkbox id="same-address" />
                  <Label htmlFor="same-address">Same as shipping address</Label>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billing-address">Address</Label>
                    <Input id="billing-address" placeholder="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-address2">Apartment, suite, etc. (optional)</Label>
                    <Input id="billing-address2" placeholder="Apt 4B" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-city">City</Label>
                      <Input id="billing-city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-state">State</Label>
                      <Select>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-zip">ZIP Code</Label>
                      <Input id="billing-zip" placeholder="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="billing-country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back to Shipping
                </Button>
                <Button onClick={() => setStep(3)}>Complete Order</Button>
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
                  <div className="font-medium mb-2">Order #12345</div>
                  <div className="text-sm text-muted-foreground">April 29, 2025</div>
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
              {cartItems.map((item) => (
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
