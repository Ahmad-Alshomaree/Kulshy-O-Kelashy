"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          className="pl-10"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Seller Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about selling on our platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I add a new product?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To add a new product, navigate to the Products section in your seller dashboard and click on the
                      "Add New Product" button. Fill in the required information such as product name, description,
                      price, and images. Once you've completed all the necessary fields, click "Save" to publish your
                      product.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I process an order?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      When a customer places an order, you'll receive a notification. Go to the Orders section in your
                      dashboard to view all orders. Click on the order to see details. Once you've prepared the order
                      for shipping, click "Mark as Shipped" and enter the tracking information. The customer will be
                      automatically notified.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I get paid?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Payments are processed according to your selected payout schedule (daily, weekly, bi-weekly, or
                      monthly). The funds will be transferred directly to your connected bank account. You can view your
                      payment history and upcoming payouts in the Analytics section of your dashboard.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What fees do I pay as a seller?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our platform charges a 5% transaction fee on each sale. Payment processing fees (typically 2.9% +
                      $0.30 per transaction) are also deducted. There are no monthly fees or listing fees. You can view
                      a breakdown of all fees in your sales reports in the Analytics section.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I handle returns and refunds?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      When a customer requests a return, you'll receive a notification. Review the return request in the
                      Orders section. If approved, the customer will ship the item back to you. Once you receive the
                      returned item, go to the order details and click "Process Refund." The refund will be processed
                      according to your store's return policy.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>How can I promote my products?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our platform offers several ways to promote your products. You can create discount codes, run
                      flash sales, or participate in platform-wide promotions. Additionally, you can boost your product
                      visibility by using our advertising program. Go to the Marketing section in your dashboard to
                      explore these options.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>How do I manage my inventory?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Inventory management is handled in the Products section of your dashboard. You can update stock
                      levels manually for each product, or use our bulk update feature for multiple products. Set up low
                      stock alerts in your Settings to receive notifications when inventory reaches a specified
                      threshold.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>Can I sell internationally?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, you can sell internationally. In your Settings, you can specify which countries you ship to
                      and set different shipping rates for each region. You can also set up different currencies for
                      display on your store. Be aware of international shipping regulations and customs requirements for
                      the countries you ship to.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>Seller Guides</CardTitle>
              <CardDescription>Comprehensive guides to help you succeed as a seller.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn the basics of setting up your seller account and listing your first product.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Product Photography Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to take professional product photos that increase sales.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Pricing Strategies</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover effective pricing strategies to maximize your profits.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Shipping Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to ship products efficiently and cost-effectively.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Marketing Your Products</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Strategies to promote your products and increase visibility.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Customer Service Excellence</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Tips for providing outstanding customer service to increase repeat business.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Need help? Reach out to our seller support team.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What do you need help with?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Please describe your issue in detail..." rows={6} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="attachment" className="text-sm font-medium">
                    Attachment (optional)
                  </label>
                  <Input id="attachment" type="file" />
                </div>

                <div className="pt-2">
                  <Button>Submit Ticket</Button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-medium mb-4">Other Ways to Get Help</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Email Support</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Send us an email and we'll respond within 24 hours.
                    </p>
                    <p className="text-sm font-medium">support@example.com</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Phone Support</h4>
                    <p className="text-sm text-muted-foreground mb-2">Available Monday-Friday, 9am-5pm EST.</p>
                    <p className="text-sm font-medium">+1 (555) 123-4567</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Live Chat</h4>
                    <p className="text-sm text-muted-foreground mb-2">Chat with our support team in real-time.</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
