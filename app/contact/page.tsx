import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-palette-cream/50">
        <HomeHeader />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-palette-darkGreen mb-8">Contact Us</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Send Us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      type="text" 
                      placeholder="Order Inquiry" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?" 
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  
                  <Button className="w-full bg-palette-darkGreen hover:bg-palette-darkGreen/90">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Customer Support</h3>
                      <p className="text-gray-700">
                        <a href="mailto:support@ecoshop.com" className="hover:underline">support@ecoshop.com</a>
                      </p>
                      <p className="text-gray-700">
                        <a href="tel:+18001234567" className="hover:underline">+1 (800) 123-4567</a>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Business Inquiries</h3>
                      <p className="text-gray-700">
                        <a href="mailto:business@ecoshop.com" className="hover:underline">business@ecoshop.com</a>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-palette-darkGreen mb-1">Press & Media</h3>
                      <p className="text-gray-700">
                        <a href="mailto:press@ecoshop.com" className="hover:underline">press@ecoshop.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Office Location</h2>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-700">123 Eco Street</p>
                    <p className="text-gray-700">Suite 456</p>
                    <p className="text-gray-700">San Francisco, CA 94105</p>
                    <p className="text-gray-700">United States</p>
                  </div>
                  
                  <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                    <p className="text-gray-500">Map Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-2xl font-semibold text-palette-darkGreen mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">What are your business hours?</h3>
                  <p className="text-gray-700">
                    Our customer service team is available Monday through Friday, 9 AM to 6 PM Eastern Time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">How long will it take to get a response?</h3>
                  <p className="text-gray-700">
                    We strive to respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Can I track my order status?</h3>
                  <p className="text-gray-700">
                    Yes, you can track your order by logging into your account and visiting the "Order History" section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <HomeFooter />
      </div>
    </PageTransitionWrapper>
  )
}
