"use client"

import { useState, useRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, Eye, Copy, AlertCircle, Tag, Archive, BarChart } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: "Wireless Gaming Controller",
    category: "Electronics",
    price: "$49.99",
    stock: 24,
    status: "Active",
    image: "/placeholder.svg?height=50&width=50&text=Controller",
  },
  {
    id: 2,
    name: "RGB Mechanical Keyboard",
    category: "Electronics",
    price: "$89.99",
    stock: 18,
    status: "Active",
    image: "/placeholder.svg?height=50&width=50&text=Keyboard",
  },
  {
    id: 3,
    name: "27-inch Gaming Monitor",
    category: "Electronics",
    price: "$299.99",
    stock: 7,
    status: "Low Stock",
    image: "/placeholder.svg?height=50&width=50&text=Monitor",
  },
  {
    id: 4,
    name: "Modern Dining Chair",
    category: "Furniture",
    price: "$129.99",
    stock: 32,
    status: "Active",
    image: "/placeholder.svg?height=50&width=50&text=Chair",
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: "$199.99",
    stock: 15,
    status: "Active",
    image: "/placeholder.svg?height=50&width=50&text=Chair",
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "$79.99",
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=50&width=50&text=Earbuds",
  },
]

export function ProductsTable() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false)
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
  const [promoteDialogOpen, setPromoteDialogOpen] = useState(false)
  const [analyticsDialogOpen, setAnalyticsDialogOpen] = useState(false)
  const nameInputRef = useRef(null)

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle product viewing
  const handleViewProduct = (product) => {
    setCurrentProduct(product)
    setViewDialogOpen(true)
  }

  // Handle product editing
  const handleEditProduct = (product) => {
    setCurrentProduct({ ...product })
    setEditDialogOpen(true)
  }

  // Handle product duplication
  const handleDuplicate = (product) => {
    setCurrentProduct({
      ...product,
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: `${product.name} (Copy)`,
    })
    setDuplicateDialogOpen(true)
  }

  // Handle product deletion
  const handleDeleteClick = (id) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setDeleteDialogOpen(false)
      setProductToDelete(null)
      toast({
        title: "Product deleted",
        description: "The product has been permanently removed.",
      })
    }
  }

  // Handle product archiving
  const handleArchive = (product) => {
    setCurrentProduct(product)
    setArchiveDialogOpen(true)
  }

  const confirmArchive = () => {
    if (currentProduct) {
      // In a real app, you would update the product status in the database
      const updatedProducts = products.map((p) => (p.id === currentProduct.id ? { ...p, status: "Archived" } : p))
      setProducts(updatedProducts)
      setArchiveDialogOpen(false)
      setCurrentProduct(null)
      toast({
        title: "Product archived",
        description: "The product has been archived and is no longer visible to customers.",
      })
    }
  }

  // Handle product promotion
  const handlePromote = (product) => {
    setCurrentProduct(product)
    setPromoteDialogOpen(true)
  }

  const confirmPromote = (formData) => {
    const discountType = formData.get("discountType")
    const discountValue = formData.get("discountValue")

    // In a real app, you would update the product in the database
    toast({
      title: "Product promotion created",
      description: `Created a ${discountType} promotion of ${discountValue}${discountType === "percentage" ? "%" : "$"} for ${currentProduct.name}`,
    })

    setPromoteDialogOpen(false)
    setCurrentProduct(null)
  }

  // Handle product analytics
  const handleAnalytics = (product) => {
    setCurrentProduct(product)
    setAnalyticsDialogOpen(true)
  }

  // Save edited product
  const saveEditedProduct = (formData) => {
    const name = formData.get("name")
    const category = formData.get("category")
    const price = formData.get("price")
    const stock = Number.parseInt(formData.get("stock"))

    if (currentProduct) {
      const updatedProducts = products.map((p) =>
        p.id === currentProduct.id
          ? {
              ...p,
              name,
              category,
              price,
              stock,
              status: stock === 0 ? "Out of Stock" : stock < 10 ? "Low Stock" : "Active",
            }
          : p,
      )
      setProducts(updatedProducts)
      setEditDialogOpen(false)
      setCurrentProduct(null)
      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      })
    }
  }

  // Save duplicated product
  const saveDuplicatedProduct = () => {
    if (currentProduct) {
      setProducts([...products, currentProduct])
      setDuplicateDialogOpen(false)
      setCurrentProduct(null)
      toast({
        title: "Product duplicated",
        description: "A copy of the product has been created.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search products..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {filteredProducts.length} products
          </Badge>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Active"
                          ? "default"
                          : product.status === "Low Stock"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewProduct(product)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(product)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePromote(product)}>
                          <Tag className="mr-2 h-4 w-4" />
                          Create Promotion
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAnalytics(product)}>
                          <BarChart className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleArchive(product)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive Product
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <p>No products found</p>
                    <p className="text-sm">Try adjusting your search terms</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product from your store.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  className="w-full h-64 object-contain rounded-md border"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{currentProduct.name}</h3>
                  <Badge className="mt-2">{currentProduct.category}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{currentProduct.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p className="font-medium">{currentProduct.stock} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      variant={
                        currentProduct.status === "Active"
                          ? "default"
                          : currentProduct.status === "Low Stock"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {currentProduct.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Product ID</p>
                    <p className="font-medium">#{currentProduct.id}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>
                    This is a high-quality product that customers love. It features premium materials and excellent
                    craftsmanship.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Make changes to your product here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <form action={saveEditedProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" defaultValue={currentProduct.name} ref={nameInputRef} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" defaultValue={currentProduct.category} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" defaultValue={currentProduct.price} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" name="stock" type="number" defaultValue={currentProduct.stock} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue="This is a high-quality product that customers love. It features premium materials and excellent craftsmanship."
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Duplicate Product Dialog */}
      <Dialog open={duplicateDialogOpen} onOpenChange={setDuplicateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duplicate Product</DialogTitle>
            <DialogDescription>
              You're creating a copy of this product. You can edit the details before saving.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duplicate-name">Product Name</Label>
                <Input
                  id="duplicate-name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDuplicateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveDuplicatedProduct}>Create Duplicate</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Archive Product Dialog */}
      <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Product</DialogTitle>
            <DialogDescription>
              Archiving will hide this product from customers but keep it in your inventory. You can unarchive it later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setArchiveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={confirmArchive}>
              Archive Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Promote Product Dialog */}
      <Dialog open={promoteDialogOpen} onOpenChange={setPromoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Promotion</DialogTitle>
            <DialogDescription>Set up a special offer or discount for this product.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <form action={confirmPromote} className="space-y-4">
              <div className="space-y-2">
                <Label>Product</Label>
                <div className="flex items-center space-x-3 p-2 border rounded-md">
                  <img
                    src={currentProduct.image || "/placeholder.svg"}
                    alt={currentProduct.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <span className="font-medium">{currentProduct.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountType">Discount Type</Label>
                <select
                  id="discountType"
                  name="discountType"
                  className="w-full p-2 border rounded-md"
                  defaultValue="percentage"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountValue">Discount Value</Label>
                <Input id="discountValue" name="discountValue" type="number" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promotionDuration">Duration</Label>
                <select
                  id="promotionDuration"
                  name="promotionDuration"
                  className="w-full p-2 border rounded-md"
                  defaultValue="7"
                >
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
              <DialogFooter>
                <Button type="submit">Create Promotion</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={analyticsDialogOpen} onOpenChange={setAnalyticsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Product Analytics</DialogTitle>
            <DialogDescription>Performance metrics and insights for this product.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">{currentProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    #{currentProduct.id} • {currentProduct.category}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="traffic">Traffic</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Views (30 days)</p>
                      <p className="text-2xl font-bold">1,245</p>
                      <p className="text-xs text-green-600">+12.3% vs previous period</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">3.2%</p>
                      <p className="text-xs text-red-600">-0.5% vs previous period</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Revenue (30 days)</p>
                      <p className="text-2xl font-bold">$1,890</p>
                      <p className="text-xs text-green-600">+8.7% vs previous period</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Performance Summary</h4>
                    <p className="text-sm">
                      This product is performing well with steady growth in views and revenue. Consider creating a
                      promotion to improve the conversion rate.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="sales" className="space-y-4">
                  <div className="border rounded-lg p-4 h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Sales chart would appear here</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Top Customers</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>John D.</span>
                          <span>3 purchases</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sarah M.</span>
                          <span>2 purchases</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Robert K.</span>
                          <span>2 purchases</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Sales by Region</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>North America</span>
                          <span>65%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Europe</span>
                          <span>20%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Asia</span>
                          <span>15%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-4">
                  <div className="border rounded-lg p-4 h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Traffic chart would appear here</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Traffic Sources</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Direct</span>
                          <span>45%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Search</span>
                          <span>30%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Social</span>
                          <span>15%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Referral</span>
                          <span>10%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Device Breakdown</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Mobile</span>
                          <span>60%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Desktop</span>
                          <span>35%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Tablet</span>
                          <span>5%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
