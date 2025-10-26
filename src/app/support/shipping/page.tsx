import { Truck, Clock, Globe, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ShippingPage() {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      time: "3-5 business days",
      price: "$5.99",
      freeThreshold: "Free on orders over $50",
    },
    {
      name: "Express Shipping",
      time: "1-2 business days",
      price: "$12.99",
      freeThreshold: "Free on orders over $100",
    },
    {
      name: "Next Day Delivery",
      time: "Next business day",
      price: "$19.99",
      freeThreshold: "Not eligible for free shipping",
    },
    {
      name: "International Standard",
      time: "7-14 business days",
      price: "$15.99",
      freeThreshold: "Free on orders over $100",
    },
    {
      name: "International Express",
      time: "3-5 business days",
      price: "$29.99",
      freeThreshold: "Not eligible for free shipping",
    },
  ]

  const shippingFeatures = [
    {
      icon: <Truck className="h-8 w-8 text-palette-olive" />,
      title: "Free Shipping Options",
      description: "Enjoy free standard shipping on domestic orders over $50 and international orders over $100.",
    },
    {
      icon: <Clock className="h-8 w-8 text-palette-olive" />,
      title: "Fast Delivery",
      description: "With our express and next-day options, get your items when you need them most.",
    },
    {
      icon: <Globe className="h-8 w-8 text-palette-olive" />,
      title: "International Shipping",
      description: "We ship to over 100 countries worldwide with reliable tracking and delivery.",
    },
    {
      icon: <MapPin className="h-8 w-8 text-palette-olive" />,
      title: "Order Tracking",
      description: "Track your package every step of the way with our real-time tracking system.",
    },
  ]

  const faqItems = [
    {
      question: "When will my order ship?",
      answer:
        "Orders are typically processed within 1-2 business days. Once shipped, you'll receive a confirmation email with tracking information.",
    },
    {
      question: "Do you ship to PO boxes?",
      answer:
        "Yes, we ship to PO boxes for standard shipping only. Express and next-day delivery require a physical address.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and viewing your order history, or by using the tracking number provided in your shipping confirmation email.",
    },
    {
      question: "What countries do you ship to?",
      answer:
        "We ship to over 100 countries worldwide. During checkout, you can see if your country is eligible for shipping.",
    },
    {
      question: "Are there any additional fees for international shipping?",
      answer:
        "International orders may be subject to import duties, taxes, and customs fees, which are the responsibility of the recipient and are not included in our shipping charges.",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Shipping Information</h1>
        <p className="text-palette-darkGreen/70">
          Learn about our shipping options, delivery times, and tracking information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shippingFeatures.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-start">
              <div className="w-12 h-12 rounded-full bg-palette-cream/50 flex items-center justify-center mr-4">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-lg text-palette-darkGreen">{feature.title}</h3>
                <p className="text-palette-darkGreen/70 text-sm mt-1">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Shipping Methods & Rates</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Shipping Method</TableHead>
                <TableHead>Delivery Time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Free Shipping</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingMethods.map((method, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{method.name}</TableCell>
                  <TableCell>{method.time}</TableCell>
                  <TableCell>{method.price}</TableCell>
                  <TableCell>{method.freeThreshold}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-palette-darkGreen/70 mt-2">
          * Delivery times are estimates and may vary based on location and other factors.
        </p>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details key={index} className="group bg-palette-cream/20 rounded-lg">
              <summary className="flex items-center justify-between p-4 font-medium cursor-pointer list-none text-palette-darkGreen">
                <span>{item.question}</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    width="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="p-4 pt-0 text-palette-darkGreen/80">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-palette-cream/30 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-palette-darkGreen mb-2">Order Tracking</h3>
        <p className="text-palette-darkGreen/70 mb-4">
          Once your order ships, you'll receive a confirmation email with tracking information. You can also track your
          order by logging into your account and viewing your order history.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/account/orders"
            className="bg-palette-darkGreen hover:bg-palette-olive text-white px-6 py-2 rounded-md text-center"
          >
            Track Your Order
          </a>
          <a
            href="/support/contact"
            className="bg-white border border-palette-darkGreen text-palette-darkGreen hover:bg-palette-cream/50 px-6 py-2 rounded-md text-center"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
