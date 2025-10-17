import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"

export default function ShippingInfoPage() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-palette-cream/50">
        <HomeHeader />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-palette-darkGreen mb-8">Shipping Information</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Shipping Options</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Standard Shipping</h3>
                  <p className="text-gray-700 mb-2">Delivery within 5-7 business days</p>
                  <p className="text-gray-700">
                    <span className="font-medium">Cost:</span> $4.99 for orders under $50, FREE for orders over $50
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Express Shipping</h3>
                  <p className="text-gray-700 mb-2">Delivery within 2-3 business days</p>
                  <p className="text-gray-700">
                    <span className="font-medium">Cost:</span> $9.99 for all orders
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Next Day Delivery</h3>
                  <p className="text-gray-700 mb-2">
                    Delivery by the end of the next business day (order must be placed before 2 PM)
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Cost:</span> $14.99 for all orders
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Shipping Policies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Shipping Destinations</h3>
                  <p className="text-gray-700">
                    We currently ship to all 50 U.S. states, Canada, and select international destinations.
                    International shipping rates and delivery times vary by location.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Order Processing</h3>
                  <p className="text-gray-700">
                    Orders are typically processed within 1-2 business days. Once your order has been shipped, you will
                    receive a confirmation email with tracking information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Shipping Delays</h3>
                  <p className="text-gray-700">
                    Shipping times may be affected by holidays, weather conditions, or other unforeseen circumstances.
                    We will notify you of any significant delays affecting your order.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Tracking Your Order</h2>
              <p className="text-gray-700 mb-4">
                Once your order has been shipped, you will receive a tracking number via email. You can also track your
                order by logging into your account and visiting the "Order History" section.
              </p>

              <div className="bg-palette-cream/30 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Need Help?</h3>
                <p className="text-gray-700 mb-2">
                  If you have any questions about your shipment or need assistance, please contact our customer service
                  team:
                </p>
                <a href="mailto:shipping@ecoshop.com" className="text-palette-darkGreen font-medium hover:underline">
                  shipping@ecoshop.com
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
