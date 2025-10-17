"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Plus, Trash2, Check, Edit } from "lucide-react"
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
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"

export default function PaymentMethodsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      cardNumber: "•••• •••• •••• 4242",
      expiryDate: "12/25",
      cardholderName: "John Doe",
      isDefault: true,
    },
    {
      id: 2,
      type: "mastercard",
      cardNumber: "•••• •••• •••• 5555",
      expiryDate: "10/24",
      cardholderName: "John Doe",
      isDefault: false,
    },
  ])

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    isDefault: false,
  })

  const [editingCard, setEditingCard] = useState<any>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleDeletePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed.",
    })
  }

  const handleAddNewCard = () => {
    setNewCard({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      isDefault: paymentMethods.length === 0,
    })
    setIsAddingNew(true)
  }

  const handleEditCard = (card: any) => {
    setEditingCard({
      ...card,
      cardNumber: "", // For security, we don't pre-fill the card number
      cvv: "", // For security, we don't pre-fill the CVV
    })
    setIsAddingNew(false)
  }

  const handleSaveCard = () => {
    if (isAddingNew) {
      // Format card number for display
      const maskedCardNumber = `•••• •••• •••• ${newCard.cardNumber.slice(-4)}`

      // Determine card type based on first digit
      let cardType = "unknown"
      if (newCard.cardNumber.startsWith("4")) {
        cardType = "visa"
      } else if (newCard.cardNumber.startsWith("5")) {
        cardType = "mastercard"
      } else if (newCard.cardNumber.startsWith("3")) {
        cardType = "amex"
      } else if (newCard.cardNumber.startsWith("6")) {
        cardType = "discover"
      }

      const newPaymentMethod = {
        id: Date.now(),
        type: cardType,
        cardNumber: maskedCardNumber,
        expiryDate: newCard.expiryDate,
        cardholderName: newCard.cardholderName,
        isDefault: newCard.isDefault,
      }

      // If this is set as default, update all other cards
      if (newCard.isDefault) {
        setPaymentMethods(
          paymentMethods.map((method) => ({
            ...method,
            isDefault: false,
          })),
        )
      }

      setPaymentMethods([...paymentMethods, newPaymentMethod])
      toast({
        title: "Payment Method Added",
        description: "Your new payment method has been added.",
      })
    } else {
      // Update existing card
      setPaymentMethods(
        paymentMethods.map((method) => {
          if (method.id === editingCard.id) {
            // If this is set as default, update all other cards
            if (editingCard.isDefault && !method.isDefault) {
              setPaymentMethods(
                paymentMethods.map((m) => ({
                  ...m,
                  isDefault: m.id === editingCard.id,
                })),
              )
            }

            return {
              ...method,
              expiryDate: editingCard.expiryDate || method.expiryDate,
              cardholderName: editingCard.cardholderName || method.cardholderName,
              isDefault: editingCard.isDefault,
            }
          }
          return method
        }),
      )
      toast({
        title: "Payment Method Updated",
        description: "Your payment method has been updated.",
      })
    }
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳 Visa"
      case "mastercard":
        return "💳 Mastercard"
      case "amex":
        return "💳 American Express"
      case "discover":
        return "💳 Discover"
      default:
        return "💳 Card"
    }
  }

  if (!user) {
    return null // Don't render anything while redirecting
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
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
                  <h1 className="text-3xl font-bold text-palette-darkGreen">Payment Methods</h1>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleAddNewCard}
                      className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{isAddingNew ? "Add New Card" : "Edit Card"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          value={isAddingNew ? newCard.cardholderName : editingCard?.cardholderName}
                          onChange={(e) =>
                            isAddingNew
                              ? setNewCard({ ...newCard, cardholderName: e.target.value })
                              : setEditingCard({ ...editingCard, cardholderName: e.target.value })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={isAddingNew ? newCard.cardNumber : editingCard?.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 16)
                            isAddingNew
                              ? setNewCard({ ...newCard, cardNumber: value })
                              : setEditingCard({ ...editingCard, cardNumber: value })
                          }}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={isAddingNew ? newCard.expiryDate : editingCard?.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "")
                              if (value.length > 2) {
                                value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
                              }
                              isAddingNew
                                ? setNewCard({ ...newCard, expiryDate: value })
                                : setEditingCard({ ...editingCard, expiryDate: value })
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
                            value={isAddingNew ? newCard.cvv : editingCard?.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                              isAddingNew
                                ? setNewCard({ ...newCard, cvv: value })
                                : setEditingCard({ ...editingCard, cvv: value })
                            }}
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={isAddingNew ? newCard.isDefault : editingCard?.isDefault}
                          onChange={(e) => {
                            isAddingNew
                              ? setNewCard({ ...newCard, isDefault: e.target.checked })
                              : setEditingCard({ ...editingCard, isDefault: e.target.checked })
                          }}
                          className="rounded border-gray-300 text-palette-olive focus:ring-palette-olive"
                        />
                        <Label htmlFor="isDefault">Set as default payment method</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleSaveCard}>Save Card</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className={method.isDefault ? "border-palette-olive" : ""}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-palette-darkGreen">{getCardIcon(method.type)}</h3>
                                {method.isDefault && (
                                  <span className="bg-palette-olive/10 text-palette-olive text-xs px-2 py-1 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-palette-darkGreen/70">{method.cardNumber}</p>
                              <div className="flex items-center gap-4 text-sm text-palette-darkGreen/70">
                                <span>{method.cardholderName}</span>
                                <span>Expires {method.expiryDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-palette-olive hover:text-palette-darkGreen hover:bg-palette-olive/10"
                                  onClick={() => handleEditCard(method)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Card</DialogTitle>
                                </DialogHeader>
                                {/* Dialog content is the same as the add card dialog */}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-palette-darkGreen/50 hover:text-red-500 hover:bg-red-50"
                              onClick={() => handleDeletePaymentMethod(method.id)}
                              disabled={method.isDefault}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {!method.isDefault && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-palette-olive hover:bg-palette-olive/10"
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

                {paymentMethods.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-palette-olive/10 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-palette-olive" />
                    </div>
                    <h2 className="text-xl font-semibold text-palette-darkGreen mb-2">No payment methods</h2>
                    <p className="text-palette-darkGreen/70 mb-6">Add a payment method to make checkout faster.</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={handleAddNewCard}
                          className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Card
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Add New Card</DialogTitle>
                        </DialogHeader>
                        {/* Dialog content is the same as above */}
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>

              {paymentMethods.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Payment Security</h2>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-palette-darkGreen">Secure Payment Processing</h3>
                          <p className="text-sm text-palette-darkGreen/70">
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
                          <h3 className="font-medium text-palette-darkGreen">Fraud Protection</h3>
                          <p className="text-sm text-palette-darkGreen/70">
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

        <footer className="bg-palette-darkGreen text-white py-4 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70">© 2023 Kulshy O-Klashy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransitionWrapper>
  )
}
