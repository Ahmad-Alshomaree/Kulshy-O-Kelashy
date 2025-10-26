import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        <div className="flex-1 bg-palette-darkGreen text-white flex flex-col items-center justify-center px-4 py-12">
          <Link href="/" className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif hover:opacity-80 transition-opacity">Kulshy O-Klashy</h1>
          </Link>

          <div className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl mb-8 text-palette-cream">Sign In</h2>

            <div className="w-full space-y-6">
              <p className="text-center text-xl mb-4">Sign in as:</p>

              <Link href="/login/customer" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full py-6 text-lg bg-palette-taupe/50 hover:bg-palette-taupe/70 border-none text-white"
                >
                  Customer
                </Button>
              </Link>

              <Link href="/login/seller" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full py-6 text-lg bg-palette-taupe/50 hover:bg-palette-taupe/70 border-none text-white"
                >
                  Seller
                </Button>
              </Link>

              <div className="text-center mt-6 space-y-3">
                <p className="text-sm text-white/70">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-palette-cream font-semibold hover:underline">
                    Sign up
                  </Link>
                </p>
                <p className="text-sm">
                  <Link href="/forgot-password" className="text-palette-cream/80 hover:text-palette-cream hover:underline">
                    Forgot my password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li className="text-white/70">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
                <li className="text-white/70">exclusive@gmail.com</li>
                <li className="text-white/70">+88015-88888-9999</li>
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
              </ul>
            </div>

            <div>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
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