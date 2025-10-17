import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"

export default function ReturnsPage() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-palette-cream/50">
        <HomeHeader />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-palette-darkGreen mb-8">Returns & Refunds</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Return Policy</h2>
              <p className="text-gray-700 mb-4">
                We want you to be completely satisfied with your purchase. If you're not happy with your order for any
                reason, we accept returns within 30 days of delivery for a full refund or exchange.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Eligible Items</h3>
                  <p className="text-gray-700">
                    Most items are eligible for return if they are in their original condition with all tags attached
                    and original packaging. Some exceptions apply, including personalized items, intimate apparel, and
                    final sale items.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Return Process</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>Log into your account and navigate to "Order History"</li>
                    <li>Select the order containing the item(s) you wish to return</li>
                    <li>Click "Return Items" and follow the instructions</li>
                    <li>Print the return shipping label (free for exchanges, $5.99 for returns)</li>
                    <li>Package your items securely with all tags and original packaging</li>
                    <li>Drop off your package at any authorized shipping location</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Refund Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Processing Time</h3>
                  <p className="text-gray-700">
                    Once we receive your return, it typically takes 3-5 business days to inspect and process. Refunds
                    are issued to your original payment method and may take an additional 5-10 business days to appear
                    on your statement, depending on your financial institution.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Refund Amount</h3>
                  <p className="text-gray-700">
                    For returns, we will refund the full purchase price of the item(s) minus any return shipping fees.
                    Original shipping charges are non-refundable unless the return is due to our error or a defective
                    product.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Damaged or Defective Items</h2>
              <p className="text-gray-700 mb-4">
                If you receive a damaged or defective item, please contact our customer service team within 48 hours of
                delivery. We will arrange for a return and replacement at no additional cost to you.
              </p>

              <div className="bg-palette-cream/30 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Need Help?</h3>
                <p className="text-gray-700 mb-2">
                  If you have any questions about returns or refunds, please contact our customer service team:
                </p>
                <a href="mailto:returns@ecoshop.com" className="text-palette-darkGreen font-medium hover:underline">
                  returns@ecoshop.com
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
