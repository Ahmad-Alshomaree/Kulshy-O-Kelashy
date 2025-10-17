import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Orders & Payments",
      questions: [
        {
          question: "How do I track my order?",
          answer:
            "You can track your order by logging into your account and visiting the Orders section. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. For certain regions, we also offer payment installment options.",
        },
        {
          question: "Can I change or cancel my order?",
          answer:
            "Orders can be changed or canceled within 1 hour of placing them. After that, please contact our customer support team who will try to accommodate your request if the order hasn't shipped.",
        },
      ],
    },
    {
      title: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is 1-2 business days. International shipping varies by location and can take 7-21 business days.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to over 100 countries worldwide. Shipping rates and delivery times vary by location. Import duties and taxes may apply and are the responsibility of the customer.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes, we offer free standard shipping on domestic orders over $50 and international orders over $100. Some exclusions may apply for oversized items or remote locations.",
        },
      ],
    },
    {
      title: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some products like intimate apparel and personalized items cannot be returned.",
        },
        {
          question: "How do I return an item?",
          answer:
            "To return an item, log into your account, go to your orders, select the item you wish to return, and follow the prompts. You'll receive a prepaid shipping label to return the item.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Once we receive your return, it typically takes 1-2 business days to inspect and process. After processing, refunds take 5-7 business days to appear in your account, depending on your payment provider.",
        },
      ],
    },
    {
      title: "Products & Sizing",
      questions: [
        {
          question: "How do I find the right size?",
          answer:
            "We provide detailed size guides on each product page. You can also refer to our general size guide in the Help Center for more information on measurements and fit.",
        },
        {
          question: "Are your products sustainable?",
          answer:
            "We are committed to sustainability and ethical production. Many of our products are made from sustainable materials, and we're continuously working to improve our environmental impact.",
        },
        {
          question: "Do you offer gift wrapping?",
          answer:
            "Yes, we offer gift wrapping services for a small fee. You can select this option during checkout and include a personalized message for the recipient.",
        },
      ],
    },
    {
      title: "Account & Privacy",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking on the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address and create a password.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on 'Login', then 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password.",
        },
        {
          question: "How is my personal information used?",
          answer:
            "We take your privacy seriously. Your personal information is used only to process orders, improve your shopping experience, and communicate with you. Please refer to our Privacy Policy for more details.",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Frequently Asked Questions</h1>
        <p className="text-palette-darkGreen/70">
          Find answers to common questions about our products, orders, shipping, and more.
        </p>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Search for answers..."
          className="pl-10 py-6 text-lg border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palette-darkGreen/50 h-5 w-5" />
      </div>

      <div className="space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">{category.title}</h2>
            <div className="space-y-4">
              {category.questions.map((item, itemIndex) => (
                <details key={itemIndex} className="group bg-palette-cream/20 rounded-lg">
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
            {categoryIndex < faqCategories.length - 1 && <Separator className="my-6" />}
          </div>
        ))}
      </div>

      <div className="bg-palette-cream/30 p-6 rounded-lg text-center">
        <h3 className="text-lg font-medium text-palette-darkGreen mb-2">Still have questions?</h3>
        <p className="text-palette-darkGreen/70 mb-4">Our customer support team is ready to help you</p>
        <a
          href="/support/contact"
          className="bg-palette-darkGreen hover:bg-palette-olive text-white px-6 py-2 rounded-md inline-block"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}
