import { ArrowLeft, Package, RefreshCw, CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ReturnsPage() {
  const returnSteps = [
    {
      icon: <Package className="h-8 w-8 text-palette-olive" />,
      title: "Request a Return",
      description:
        "Log into your account and go to your orders. Select the item you wish to return and follow the prompts.",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-palette-olive" />,
      title: "Package Your Item",
      description:
        "Carefully package your item in its original packaging if possible. Include all tags, accessories, and documentation.",
    },
    {
      icon: <ArrowLeft className="h-8 w-8 text-palette-olive" />,
      title: "Ship Your Return",
      description:
        "Use the prepaid shipping label provided and drop off your package at the designated carrier location.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-palette-olive" />,
      title: "Receive Your Refund",
      description:
        "Once we receive and inspect your return, we'll process your refund to your original payment method within 5-7 business days.",
    },
  ]

  const faqItems = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Some products like intimate apparel and personalized items cannot be returned.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Once we receive your return, it typically takes 1-2 business days to inspect and process. After processing, refunds take 5-7 business days to appear in your account, depending on your payment provider.",
    },
    {
      question: "Can I exchange an item instead of returning it?",
      answer:
        "Yes, you can exchange items for a different size or color. Simply select 'Exchange' instead of 'Return' when initiating the process in your account.",
    },
    {
      question: "Do I have to pay for return shipping?",
      answer:
        "For standard returns, we provide a prepaid shipping label, but a $5.95 fee will be deducted from your refund. Returns due to our error (wrong item, defective product) ship free with no deductions.",
    },
    {
      question: "What items cannot be returned?",
      answer:
        "Items that cannot be returned include: intimate apparel, personalized items, gift cards, final sale items, and products without original packaging or tags.",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Returns & Refunds</h1>
        <p className="text-palette-darkGreen/70">
          Learn about our return policy and how to return items for a refund or exchange.
        </p>
      </div>

      <div className="bg-palette-cream/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Return Policy Highlights</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-palette-olive mr-2 mt-0.5" />
            <span className="text-palette-darkGreen">30-day return window from the date of delivery</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-palette-olive mr-2 mt-0.5" />
            <span className="text-palette-darkGreen">
              Items must be unused, unwashed, and in original condition with tags attached
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-palette-olive mr-2 mt-0.5" />
            <span className="text-palette-darkGreen">Original packaging required when possible</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-palette-olive mr-2 mt-0.5" />
            <span className="text-palette-darkGreen">Refunds are issued to the original payment method</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-palette-olive mr-2 mt-0.5" />
            <span className="text-palette-darkGreen">Gift returns are issued as store credit</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">How to Return an Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {returnSteps.map((step, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-palette-cream/50 flex items-center justify-center mb-4 mt-2">
                  {step.icon}
                </div>
                <h3 className="font-medium text-lg text-palette-darkGreen">{step.title}</h3>
                <p className="text-palette-darkGreen/70 text-sm mt-1">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
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

      <div className="bg-palette-cream/30 p-6 rounded-lg text-center">
        <h3 className="text-lg font-medium text-palette-darkGreen mb-2">Need more help with returns?</h3>
        <p className="text-palette-darkGreen/70 mb-4">Our customer support team is ready to assist you</p>
        <Link href="/support/contact">
          <button className="bg-palette-darkGreen hover:bg-palette-olive text-white px-6 py-2 rounded-md">
            Contact Support
          </button>
        </Link>
      </div>
    </div>
  )
}
