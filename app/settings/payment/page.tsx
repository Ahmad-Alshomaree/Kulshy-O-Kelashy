"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Plus, Trash2, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock payment methods
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2024,
    isDefault: false,
  },
]

export default function PaymentMethodsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  })

  if (!user) {
    return null
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, you would process the card with a payment processor
    const last4 = newCard.cardNumber.slice(-4)
    
    const newPaymentMethod = {
      id: `pm_${Date.now()}`,
      type: "card",
      brand: "visa", // This would be determined by the payment processor
      last4,
      expMonth: parseInt(newCard.expMonth),
      expYear: parseInt(newCard.expYear),
      isDefault: paymentMethods.length === 0,
    }
    
    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setIsAddingCard(false)
    setNewCard({
      cardNumber: "",
      cardName: "",
      expMonth: "",
      expYear: "",
      cvv: "",
    })
    
    toast({
      title: "Card added",
      description: "Your new payment method has been added successfully.",
    })
  }

  const handleRemoveCard = (id: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id)
    
    // If we removed the default card and there are other cards, make the first one default
    if (paymentMethods.find(m => m.id === id)?.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }
    
    setPaymentMethods(updatedMethods)
    
    toast({
      title: "Card removed",
      description: "Your payment method has been removed.",
    })
  }

  const handleSetDefault = (id: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    }))
    
    setPaymentMethods(updatedMethods)
    
    toast({
      title: "Default updated",
      description: "Your default payment method has been updated.",
    })
  }

  const getCardIcon = (brand: string) => {
    switch (brand) {
      case "visa":
        return "💳 Visa"
      case "mastercard":
        return "💳 Mastercard"
      case "amex":
        return "💳 Amex"
      default:
        return "💳 Card"
    }
  }

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-palette-cream/30">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center mb-6">
                <Link href="/settings">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold text-palette-darkGreen">Payment Methods</h1>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-palette-olive/10 flex items-center justify-center text-palette-olive">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-palette-darkGreen">Your Payment Methods</CardTitle>
                      <CardDescription>Manage your saved payment methods</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {paymentMethods.length > 0 ? (
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-lg">{getCardIcon(method.brand)}</div>
                            <div>
                              <p className="font-medium">•••• •••• •••• {method.last4}</p>
                              <p className="text-sm text-palette-darkGreen/70">
                                Expires {method.expMonth}/{method.expYear}
                                {method.isDefault && <span className="ml-2 text-palette-olive">(Default)</span>}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!method.isDefault && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSetDefault(method.id)}
                              >
                                Set Default
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => handleRemoveCard(method.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-palette-darkGreen/70 mb-4">You don't have any payment methods saved yet.</p>
                    </div>
                  )}

                  <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-4 bg-palette-olive hover:bg-palette-darkGreen text-white">
                        <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>
                          Enter your card details to add a new payment method.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddCard}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input 
                              id="cardName" 
                              value={newCard.cardName}
                              onChange={(e) => setNewCard({...newCard, cardName: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber" 
                              value={newCard.cardNumber}
                              onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expMonth">Month</Label>
                              <Select 
                                value={newCard.expMonth} 
                                onValueChange={(value) => setNewCard({...newCard, expMonth: value})}
                              >
                                <SelectTrigger id="expMonth">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                                    <SelectItem key={month} value={month.toString()}>
                                      {month.toString().padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="expYear">Year</Label>
                              <Select 
                                value={newCard.expYear} 
                                onValueChange={(value) => setNewCard({...newCard, expYear: value})}
                              >
                                <SelectTrigger id="expYear">
                                  <SelectValue placeholder="YY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv" 
                                value={newCard.cvv}
                                onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                                placeholder="123"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsAddingCard(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-palette-olive hover:bg-palette-darkGreen text-white">
                            Add Card
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-palette-darkGreen">Billing Address</CardTitle>
                  <CardDescription>Your default billing address for payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-palette-darkGreen/70">123 Main Street</p>
                      <p className="text-palette-darkGreen/70">Apt 4B</p>
                      <p className="text-palette-darkGreen/70">New York, NY 10001</p>
                      <p className="text-palette-darkGreen/70">United States</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
