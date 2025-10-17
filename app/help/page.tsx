import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"

export default function HelpCenterPage() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-palette-cream/50">
        <HomeHeader />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-palette-darkGreen mb-8">Help Center</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">How do I create an account?</h3>
                  <p className="text-gray-700">
                    To create an account, click on the "Sign Up" button in the top right corner of the page. Fill in
                    your details and follow the instructions to complete the registration process.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">How can I track my order?</h3>
                  <p className="text-gray-700">
                    Once your order is shipped, you will receive a tracking number via email. You can also track your
                    order by logging into your account and visiting the "Order History" section.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-700">
                    We accept all major credit cards, PayPal, and Apple Pay. For more information, please visit our
                    Payment Methods page.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Contact Support</h2>
              <p className="text-gray-700 mb-4">
                Our customer support team is available 24/7 to assist you with any questions or concerns.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-palette-cream/30 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Email Support</h3>
                  <p className="text-gray-700 mb-2">For general inquiries, please email us at:</p>
                  <a href="mailto:support@ecoshop.com" className="text-palette-darkGreen font-medium hover:underline">
                    support@ecoshop.com
                  </a>
                </div>

                <div className="bg-palette-cream/30 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Phone Support</h3>
                  <p className="text-gray-700 mb-2">For urgent matters, please call our customer service line:</p>
                  <a href="tel:+18001234567" className="text-palette-darkGreen font-medium hover:underline">
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Help Topics</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="#"
                  className="block p-4 bg-palette-cream/30 rounded-lg hover:bg-palette-cream/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Shipping & Delivery</h3>
                  <p className="text-sm text-gray-600">Information about shipping options and delivery times</p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-palette-cream/30 rounded-lg hover:bg-palette-cream/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Returns & Refunds</h3>
                  <p className="text-sm text-gray-600">Learn about our return policy and refund process</p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-palette-cream/30 rounded-lg hover:bg-palette-cream/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Account Management</h3>
                  <p className="text-sm text-gray-600">How to manage your account settings and preferences</p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-palette-cream/30 rounded-lg hover:bg-palette-cream/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Payment Issues</h3>
                  <p className="text-sm text-gray-600">Troubleshooting payment problems and billing questions</p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-palette-cream/30 rounded-lg hover:bg-palette-cream/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Product Information</h3>
                  <p className="text-sm text-gray-600">Details about product specifications and usage</p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-palette-cream/30 rounded-lg hover:bg-palette-cream/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Technical Support</h3>
                  <p className="text-sm text-gray-600">Help with website issues and technical problems</p>
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
