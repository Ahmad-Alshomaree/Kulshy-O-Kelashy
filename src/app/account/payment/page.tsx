"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CreditCard, Plus, Trash2, Check, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useSession } from "@/lib/auth-client"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { toast } from "sonner"

interface PaymentMethod {
  id: number
  userId: string
  type: string
  cardLastFour: string | null
  cardBrand: string | null
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export default function PaymentMethodsPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)

  const [newCard, setNewCard] = useState({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardBrand: "",
    cardLastFour: "",
    isDefault: false,
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login")
    }
  }, [session, isPending, router])

  // Fetch payment methods
  useEffect(() => {
    if (session?.user?.id) {
      fetchPaymentMethods()
    }
  }, [session?.user?.id])

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/payment-methods?userId=${session?.user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setPaymentMethods(data)
      } else {
        toast.error("Failed to load payment methods")
      }
    } catch (error) {
      toast.error("An error occurred while loading payment methods")
    } finally {
      setLoading(false)
    }
  }

  const handleAddPaymentMethod = async () => {
    if (!newCard.cardNumber || newCard.cardNumber.length < 4) {
      toast.error("Please enter a valid card number")
      return
    }

    // Extract last 4 digits
    const lastFour = newCard.cardNumber.replace(/\D/g, "").slice(-4)
    
    // Determine card brand from first digit if not provided
    let cardBrand = newCard.cardBrand
    if (!cardBrand) {
      const firstDigit = newCard.cardNumber.replace(/\D/g, "")[0]
      if (firstDigit === "4") cardBrand = "Visa"
      else if (firstDigit === "5") cardBrand = "Mastercard"
      else if (firstDigit === "3") cardBrand = "American Express"
      else if (firstDigit === "6") cardBrand = "Discover"
      else cardBrand = "Card"
    }

    try {
      const response = await fetch("/api/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          type: newCard.type,
          cardLastFour: lastFour,
          cardBrand: cardBrand,
          isDefault: newCard.isDefault || paymentMethods.length === 0
        })
      })

      if (response.ok) {
        toast.success("Payment method added successfully")
        setIsAddDialogOpen(false)
        setNewCard({
          type: "card",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardBrand: "",
          cardLastFour: "",
          isDefault: false,
        })
        fetchPaymentMethods()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to add payment method")
      }
    } catch (error) {
      toast.error("An error occurred while adding payment method")
    }
  }

  const handleUpdatePaymentMethod = async (id: number, updates: Partial<PaymentMethod>) => {
    try {
      const response = await fetch(`/api/payment-methods?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        toast.success("Payment method updated successfully")
        setIsEditDialogOpen(false)
        setEditingMethod(null)
        fetchPaymentMethods()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update payment method")
      }
    } catch (error) {
      toast.error("An error occurred while updating payment method")
    }
  }

  const handleSetDefault = async (id: number) => {
    // First, set all to non-default
    for (const method of paymentMethods) {
      if (method.isDefault && method.id !== id) {
        await fetch(`/api/payment-methods?id=${method.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDefault: false })
        })
      }
    }
    
    // Then set the selected one as default
    await handleUpdatePaymentMethod(id, { isDefault: true })
  }

  const handleDeletePaymentMethod = async (id: number, isDefault: boolean) => {
    if (isDefault) {
      toast.error("Cannot delete default payment method. Set another as default first.")
      return
    }

    if (!confirm("Are you sure you want to delete this payment method?")) return

    try {
      const response = await fetch(`/api/payment-methods?id=${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        toast.success("Payment method deleted successfully")
        fetchPaymentMethods()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to delete payment method")
      }
    } catch (error) {
      toast.error("An error occurred while deleting payment method")
    }
  }

  const getCardIcon = (brand: string | null) => {
    const brandLower = brand?.toLowerCase() || ""
    if (brandLower.includes("visa")) return "💳 Visa"
    if (brandLower.includes("master")) return "💳 Mastercard"
    if (brandLower.includes("amex") || brandLower.includes("american")) return "💳 American Express"
    if (brandLower.includes("discover")) return "💳 Discover"
    return "💳 Card"
  }

  if (isPending || loading) {
    return (
      <PageTransitionWrapper>
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading payment methods...</p>
          </div>
        </div>
      </PageTransitionWrapper>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-secondary/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <h1 className="text-3xl font-bold">Payment Methods</h1>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New Card</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardBrand">Card Brand</Label>
                        <Input
                          id="cardBrand"
                          value={newCard.cardBrand}
                          onChange={(e) => setNewCard({ ...newCard, cardBrand: e.target.value })}
                          placeholder="Visa, Mastercard, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={newCard.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 16)
                            setNewCard({ ...newCard, cardNumber: value })
                          }}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={newCard.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "")
                              if (value.length > 2) {
                                value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
                              }
                              setNewCard({ ...newCard, expiryDate: value })
                            }}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            value={newCard.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                              setNewCard({ ...newCard, cvv: value })
                            }}
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={newCard.isDefault}
                          onChange={(e) => setNewCard({ ...newCard, isDefault: e.target.checked })}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="isDefault">Set as default payment method</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleAddPaymentMethod}>Save Card</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <Card className={method.isDefault ? "border-primary" : ""}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <CreditCard className="h-6 w-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{getCardIcon(method.cardBrand)}</h3>
                                  {method.isDefault && (
                                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-muted-foreground">
                                  •••• •••• •••• {method.cardLastFour}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Added {new Date(method.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDeletePaymentMethod(method.id, method.isDefault)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              {!method.isDefault && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSetDefault(method.id)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Set as Default
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {paymentMethods.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No payment methods</h2>
                    <p className="text-muted-foreground mb-6">Add a payment method to make checkout faster.</p>
                  </div>
                )}
              </div>

              {paymentMethods.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Payment Security</h2>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Secure Payment Processing</h3>
                          <p className="text-sm text-muted-foreground">
                            Your payment information is encrypted and securely stored. We never store your full card
                            details on our servers.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Fraud Protection</h3>
                          <p className="text-sm text-muted-foreground">
                            Our system monitors transactions for suspicious activity to protect your account.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <footer className="bg-primary text-primary-foreground py-4 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary-foreground/70">© 2023 Kulshy O-Klashy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransitionWrapper>
  )
}