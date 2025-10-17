import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"

export default function FAQPage() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-palette-cream/50">
        <HomeHeader />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-palette-darkGreen mb-8">Frequently Asked Questions</h1>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Orders & Shipping</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">How do I track my order?</h3>
                    <p className="text-gray-700">
                      Once your order has been shipped, you will receive a tracking number via email. You can also track
                      your order by logging into your account and visiting the "Order History" section.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">
                      How long will it take to receive my order?
                    </h3>
                    <p className="text-gray-700">
                      Standard shipping typically takes 5-7 business days. Express shipping takes 2-3 business days, and
                      Next Day Delivery ensures your order arrives by the end of the next business day (for orders
                      placed before 2 PM).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Do you ship internationally?</h3>
                    <p className="text-gray-700">
                      Yes, we ship to select international destinations. International shipping rates and delivery times
                      vary by location. Please check our Shipping Information page for more details.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">
                      Can I change or cancel my order?
                    </h3>
                    <p className="text-gray-700">
                      You can change or cancel your order within 1 hour of placing it. After that, your order may have
                      already been processed and cannot be modified. Please contact our customer service team as soon as
                      possible if you need to make changes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Returns & Refunds</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">What is your return policy?</h3>
                    <p className="text-gray-700">
                      We accept returns within 30 days of delivery for a full refund or exchange. Items must be in their
                      original condition with all tags attached and original packaging.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">How do I return an item?</h3>
                    <p className="text-gray-700">
                      To return an item, log into your account, navigate to "Order History," select the order containing
                      the item(s) you wish to return, and click "Return Items." Follow the instructions to complete the
                      return process.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">When will I receive my refund?</h3>
                    <p className="text-gray-700">
                      Once we receive your return, it typically takes 3-5 business days to inspect and process. Refunds
                      are issued to your original payment method and may take an additional 5-10 business days to appear
                      on your statement, depending on your financial institution.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">
                      Do I have to pay for return shipping?
                    </h3>
                    <p className="text-gray-700">
                      Return shipping is free for exchanges. For returns, there is a $5.99 shipping fee that will be
                      deducted from your refund. If the return is due to our error or a defective product, return
                      shipping is free.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Products & Inventory</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Are your products eco-friendly?</h3>
                    <p className="text-gray-700">
                      Yes, all of our products are designed with sustainability in mind. We use eco-friendly materials
                      and packaging whenever possible, and we work with suppliers who share our commitment to
                      environmental responsibility.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">
                      What if an item is out of stock?
                    </h3>
                    <p className="text-gray-700">
                      You can sign up for email notifications on product pages for out-of-stock items. We'll let you
                      know as soon as the item is back in stock. Alternatively, you can contact our customer service
                      team for information about restocking timelines.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Do you offer gift wrapping?</h3>
                    <p className="text-gray-700">
                      Yes, we offer eco-friendly gift wrapping for an additional $5 per item. You can select this option
                      during checkout.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Can I purchase items in bulk?</h3>
                    <p className="text-gray-700">
                      Yes, we offer bulk purchasing options for businesses and organizations. Please contact our
                      business sales team at business@ecoshop.com for more information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Account & Payment</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">How do I create an account?</h3>
                    <p className="text-gray-700">
                      To create an account, click on the "Sign Up" button in the top right corner of the page. Fill in
                      your details and follow the instructions to complete the registration process.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">
                      What payment methods do you accept?
                    </h3>
                    <p className="text-gray-700">
                      We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple
                      Pay, and Google Pay.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">
                      Is my payment information secure?
                    </h3>
                    <p className="text-gray-700">
                      Yes, we use industry-standard encryption and security measures to protect your payment
                      information. We do not store your full credit card details on our servers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-palette-darkGreen mb-2">How do I reset my password?</h3>
                    <p className="text-gray-700">
                      To reset your password, click on the "Login" button, then select "Forgot Password." Enter your
                      email address, and we'll send you instructions to reset your password.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Still Have Questions?</h2>
              <p className="text-gray-700 mb-4">
                If you couldn't find the answer to your question, please contact our customer service team.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/contact"
                  className="px-6 py-2 bg-palette-darkGreen text-white rounded-md hover:bg-palette-darkGreen/90 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="mailto:support@ecoshop.com"
                  className="px-6 py-2 bg-white border border-palette-darkGreen text-palette-darkGreen rounded-md hover:bg-palette-cream/50 transition-colors"
                >
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </main>

        <HomeFooter />
      </div>
    </PageTransitionWrapper>
  )
}
