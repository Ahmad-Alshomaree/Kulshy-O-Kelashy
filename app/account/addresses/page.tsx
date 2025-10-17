"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

export default function AddressesPage() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      recipient: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "(123) 456-7890",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      recipient: "John Doe",
      street: "456 Office Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "(123) 456-7890",
      isDefault: false,
    },
  ])

  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleEditAddress = (address: any) => {
    setEditingAddress({ ...address })
    setIsAddingNew(false)
  }

  const handleAddNewAddress = () => {
    setEditingAddress({
      id: Date.now(),
      name: "",
      recipient: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      isDefault: addresses.length === 0,
    })
    setIsAddingNew(true)
  }

  const handleSaveAddress = () => {
    if (isAddingNew) {
      setAddresses([...addresses, editingAddress])
    } else {
      setAddresses(addresses.map((address) => (address.id === editingAddress.id ? editingAddress : address)))
    }
    setEditingAddress(null)
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
                  <h1 className="text-3xl font-bold text-palette-darkGreen">Address Information</h1>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleAddNewAddress}
                      className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{isAddingNew ? "Add New Address" : "Edit Address"}</DialogTitle>
                    </DialogHeader>
                    {editingAddress && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Address Name</Label>
                            <Input
                              id="name"
                              value={editingAddress.name}
                              onChange={(e) => setEditingAddress({ ...editingAddress, name: e.target.value })}
                              placeholder="Home, Work, etc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="recipient">Full Name</Label>
                            <Input
                              id="recipient"
                              value={editingAddress.recipient}
                              onChange={(e) => setEditingAddress({ ...editingAddress, recipient: e.target.value })}
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            value={editingAddress.street}
                            onChange={(e) => setEditingAddress({ ...editingAddress, street: e.target.value })}
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={editingAddress.city}
                              onChange={(e) => setEditingAddress({ ...editingAddress, city: e.target.value })}
                              placeholder="New York"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input
                              id="state"
                              value={editingAddress.state}
                              onChange={(e) => setEditingAddress({ ...editingAddress, state: e.target.value })}
                              placeholder="NY"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                            <Input
                              id="zipCode"
                              value={editingAddress.zipCode}
                              onChange={(e) => setEditingAddress({ ...editingAddress, zipCode: e.target.value })}
                              placeholder="10001"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={editingAddress.country}
                              onChange={(e) => setEditingAddress({ ...editingAddress, country: e.target.value })}
                              placeholder="United States"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={editingAddress.phone}
                            onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isDefault"
                            checked={editingAddress.isDefault}
                            onChange={(e) => setEditingAddress({ ...editingAddress, isDefault: e.target.checked })}
                            className="rounded border-gray-300 text-palette-olive focus:ring-palette-olive"
                          />
                          <Label htmlFor="isDefault">Set as default address</Label>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleSaveAddress}>Save Address</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className={address.isDefault ? "border-palette-olive" : ""}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-palette-darkGreen text-lg">{address.name}</h3>
                              {address.isDefault && (
                                <span className="bg-palette-olive/10 text-palette-olive text-xs px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-palette-darkGreen/70 space-y-1">
                              <p>{address.recipient}</p>
                              <p>{address.street}</p>
                              <p>
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p>{address.country}</p>
                              <p className="mt-2">{address.phone}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-palette-olive hover:text-palette-darkGreen hover:bg-palette-olive/10"
                                  onClick={() => handleEditAddress(address)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>{isAddingNew ? "Add New Address" : "Edit Address"}</DialogTitle>
                                </DialogHeader>
                                {editingAddress && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="name">Address Name</Label>
                                        <Input
                                          id="name"
                                          value={editingAddress.name}
                                          onChange={(e) =>
                                            setEditingAddress({ ...editingAddress, name: e.target.value })
                                          }
                                          placeholder="Home, Work, etc."
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="recipient">Full Name</Label>
                                        <Input
                                          id="recipient"
                                          value={editingAddress.recipient}
                                          onChange={(e) =>
                                            setEditingAddress({ ...editingAddress, recipient: e.target.value })
                                          }
                                          placeholder="John Doe"
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="street">Street Address</Label>
                                      <Input
                                        id="street"
                                        value={editingAddress.street}
                                        onChange={(e) =>
                                          setEditingAddress({ ...editingAddress, street: e.target.value })
                                        }
                                        placeholder="123 Main Street"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                          id="city"
                                          value={editingAddress.city}
                                          onChange={(e) =>
                                            setEditingAddress({ ...editingAddress, city: e.target.value })
                                          }
                                          placeholder="New York"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="state">State/Province</Label>
                                        <Input
                                          id="state"
                                          value={editingAddress.state}
                                          onChange={(e) =>
                                            setEditingAddress({ ...editingAddress, state: e.target.value })
                                          }
                                          placeholder="NY"
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                                        <Input
                                          id="zipCode"
                                          value={editingAddress.zipCode}
                                          onChange={(e) =>
                                            setEditingAddress({ ...editingAddress, zipCode: e.target.value })
                                          }
                                          placeholder="10001"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                          id="country"
                                          value={editingAddress.country}
                                          onChange={(e) =>
                                            setEditingAddress({ ...editingAddress, country: e.target.value })
                                          }
                                          placeholder="United States"
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="phone">Phone Number</Label>
                                      <Input
                                        id="phone"
                                        value={editingAddress.phone}
                                        onChange={(e) =>
                                          setEditingAddress({ ...editingAddress, phone: e.target.value })
                                        }
                                        placeholder="(123) 456-7890"
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="isDefault"
                                        checked={editingAddress.isDefault}
                                        onChange={(e) =>
                                          setEditingAddress({ ...editingAddress, isDefault: e.target.checked })
                                        }
                                        className="rounded border-gray-300 text-palette-olive focus:ring-palette-olive"
                                      />
                                      <Label htmlFor="isDefault">Set as default address</Label>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <DialogClose asChild>
                                    <Button onClick={handleSaveAddress}>Save Address</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-palette-darkGreen/50 hover:text-red-500 hover:bg-red-50"
                              onClick={() => handleDeleteAddress(address.id)}
                              disabled={address.isDefault}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {!address.isDefault && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-palette-olive hover:bg-palette-olive/10"
                                onClick={() => handleSetDefault(address.id)}
                              >
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {addresses.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-palette-olive/10 rounded-full flex items-center justify-center mb-4">
                      <Home className="h-8 w-8 text-palette-olive" />
                    </div>
                    <h2 className="text-xl font-semibold text-palette-darkGreen mb-2">No addresses saved</h2>
                    <p className="text-palette-darkGreen/70 mb-6">Add your first address to make checkout faster.</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={handleAddNewAddress}
                          className="bg-palette-olive hover:bg-palette-darkGreen text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Add New Address</DialogTitle>
                        </DialogHeader>
                        {editingAddress && <div className="grid gap-4 py-4">{/* Form fields (same as above) */}</div>}
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleSaveAddress}>Save Address</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
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
