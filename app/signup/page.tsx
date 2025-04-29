import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        <div className="flex-1 bg-palette-darkGreen text-white flex flex-col items-center justify-center px-4 py-12">
          <Link href="/" className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif">Kulshy O-Klashy</h1>
          </Link>

          <div className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl mb-8 text-palette-cream">Create Account</h2>

            <div className="w-full space-y-6">
              <p className="text-center text-xl mb-4">Sign up as:</p>

              <Link href="/signup/customer" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full py-6 text-lg bg-palette-taupe/50 hover:bg-palette-taupe/70 border-none text-white"
                >
                  Customer
                </Button>
              </Link>

              <Link href="/signup/seller" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full py-6 text-lg bg-palette-taupe/50 hover:bg-palette-taupe/70 border-none text-white"
                >
                  Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Exclusive</h3>
              <p className="text-white/70 mb-4">Subscribe to get special offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-l-md flex-1"
                />
                <button className="bg-palette-taupe/50 hover:bg-palette-taupe/70 px-3 rounded-r-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li className="text-white/70">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
                <li className="text-white/70">exclusive@gmail.com</li>
                <li className="text-white/70">+88015-88888-9999</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="text-white/70 hover:text-palette-cream">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-white/70 hover:text-palette-cream">
                    Login / Register
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-white/70 hover:text-palette-cream">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="text-white/70 hover:text-palette-cream">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-white/70 hover:text-palette-cream">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Link</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-white/70 hover:text-palette-cream">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/70 hover:text-palette-cream">
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white/70 hover:text-palette-cream">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-palette-cream">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Download App</h3>
              <p className="text-white/70 mb-2">Save $3 with App New User Only</p>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <div className="bg-white/10 p-2 rounded-md">
                    <img src="/placeholder.svg?height=80&width=80&text=QR+Code" alt="QR Code" className="h-20 w-20" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link href="#" className="block">
                      <img
                        src="/placeholder.svg?height=40&width=120&text=Google+Play"
                        alt="Get it on Google Play"
                        className="h-10"
                      />
                    </Link>
                    <Link href="#" className="block">
                      <img
                        src="/placeholder.svg?height=40&width=120&text=App+Store"
                        alt="Download on App Store"
                        className="h-10"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Link href="#" className="text-white/70 hover:text-white">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-white/70 hover:text-white">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-white/70 hover:text-white">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-white/70 hover:text-white">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-white/70">© Copyright Rimel 2023. All right reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
