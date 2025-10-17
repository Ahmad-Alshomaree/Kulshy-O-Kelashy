"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrdersTable } from "@/components/seller/orders-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Printer, ChevronDown, FileText, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for demonstration
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-05-01",
    status: "Delivered",
    total: "$129.99",
    items: 3,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-05-02",
    status: "Processing",
    total: "$79.50",
    items: 2,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-05-03",
    status: "Shipped",
    total: "$199.99",
    items: 1,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-05-04",
    status: "Pending",
    total: "$45.00",
    items: 1,
    paymentStatus: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "2023-05-05",
    status: "Cancelled",
    total: "$89.99",
    items: 2,
    paymentStatus: "Refunded",
  },
  {
    id: "ORD-006",
    customer: "Sarah Brown",
    date: "2023-05-06",
    status: "Delivered",
    total: "$159.99",
    items: 4,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-007",
    customer: "David Miller",
    date: "2023-05-07",
    status: "Processing",
    total: "$65.50",
    items: 1,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-008",
    customer: "Jennifer Taylor",
    date: "2023-05-08",
    status: "Shipped",
    total: "$129.99",
    items: 3,
    paymentStatus: "Paid",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const tableRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)

  // Function to handle exporting orders
  const handleExport = (format: "csv" | "excel" | "pdf") => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)

      let fileName = ""
      switch (format) {
        case "csv":
          fileName = "orders_export.csv"
          break
        case "excel":
          fileName = "orders_export.xlsx"
          break
        case "pdf":
          fileName = "orders_export.pdf"
          break
      }

      toast({
        title: "Export Successful",
        description: `Orders have been exported as ${fileName}`,
      })

      // In a real application, you would generate and download the file here
      // This is a simulation for demonstration purposes
      const dummyLink = document.createElement("a")
      dummyLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent("Order export data would be here")}`
      dummyLink.download = fileName
      document.body.appendChild(dummyLink)
      dummyLink.click()
      document.body.removeChild(dummyLink)
    }, 1500)
  }

  // Function to handle printing orders
  const handlePrint = () => {
    setIsPrinting(true)

    // Prepare print-friendly version
    setTimeout(() => {
      setIsPrinting(false)

      // In a real application, you would use a library like react-to-print
      // This is a simulation for demonstration purposes
      const printContent = document.createElement("div")
      printContent.innerHTML = `
        <h1 style="text-align: center; margin-bottom: 20px;">Orders Report</h1>
        <p style="text-align: center; margin-bottom: 30px;">Generated on ${new Date().toLocaleDateString()}</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Order ID</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Customer</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orders
              .map(
                (order) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${order.id}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${order.customer}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${order.date}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${order.status}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${order.total}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      `

      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Orders Report</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()

        // Wait for content to load then print
        printWindow.onload = () => {
          printWindow.print()
          toast({
            title: "Print Prepared",
            description: "The print dialog has been opened.",
          })
        }
      }
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1" disabled={isExporting}>
                <Download className="h-4 w-4 mr-1" />
                {isExporting ? "Exporting..." : "Export"}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("csv")} className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")} className="cursor-pointer">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")} className="cursor-pointer">
                <FilePdf className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={handlePrint} disabled={isPrinting} className="flex items-center gap-1">
            <Printer className="h-4 w-4 mr-1" />
            {isPrinting ? "Preparing..." : "Print"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-[300px]"
            />
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Value</SelectItem>
                <SelectItem value="lowest">Lowest Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Manage all your customer orders from one place.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable orders={orders} searchTerm={searchTerm} ref={tableRef} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>Orders that are currently being processed.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable
                orders={orders.filter((order) => order.status === "Processing")}
                searchTerm={searchTerm}
                ref={tableRef}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipped">
          <Card>
            <CardHeader>
              <CardTitle>Shipped Orders</CardTitle>
              <CardDescription>Orders that have been shipped to customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable
                orders={orders.filter((order) => order.status === "Shipped")}
                searchTerm={searchTerm}
                ref={tableRef}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>Orders that have been successfully delivered.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable
                orders={orders.filter((order) => order.status === "Delivered")}
                searchTerm={searchTerm}
                ref={tableRef}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Orders</CardTitle>
              <CardDescription>Orders that have been cancelled.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable
                orders={orders.filter((order) => order.status === "Cancelled")}
                searchTerm={searchTerm}
                ref={tableRef}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
