"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SlideUp, HoverButton } from "@/components/motion"
import { LogoSplashScreen } from "@/components/logo-splash-screen"

export function HomeFooter() {
  const [isClient, setIsClient] = useState(false)
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowSplash(true)
  }

  return (
    <footer className="bg-palette-darkGreen text-white py-10">
      <LogoSplashScreen isVisible={showSplash} onClose={() => setShowSplash(false)} />
      
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {isClient ? (
            <>
              <SlideUp delay={0.1}>
                <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                <p className="text-white/70 mb-4">Subscribe to our newsletter to get updates on our latest offers!</p>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <HoverButton>
                    <Button className="rounded-l-none bg-palette-cream text-palette-darkGreen hover:bg-white">
                      Subscribe
                    </Button>
                  </HoverButton>
                </div>
              </SlideUp>

              <SlideUp delay={0.2}>
                <h3 className="font-bold text-lg mb-4">Support</h3>
                <ul className="space-y-2">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/support/contact" className="text-white/70 hover:text-palette-cream">
                      Contact Us
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/support/shipping" className="text-white/70 hover:text-palette-cream">
                      Shipping Info
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/support/returns" className="text-white/70 hover:text-palette-cream">
                      Returns
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/support/faq" className="text-white/70 hover:text-palette-cream">
                      FAQ
                    </Link>
                  </motion.li>
                </ul>
              </SlideUp>

              <SlideUp delay={0.3}>
                <h3 className="font-bold text-lg mb-4">Account</h3>
                <ul className="space-y-2">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/account" className="text-white/70 hover:text-palette-cream">
                      My Account
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/account/orders" className="text-white/70 hover:text-palette-cream">
                      Order History
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/wishlist" className="text-white/70 hover:text-palette-cream">
                      Wishlist
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="/account/personal-info" className="text-white/70 hover:text-palette-cream">
                      Profile
                    </Link>
                  </motion.li>
                </ul>
              </SlideUp>

              <SlideUp delay={0.4}>
                <h3 className="font-bold text-lg mb-4">Download App</h3>
                <p className="text-white/70 mb-4">Get our mobile app for a better experience</p>
                <div className="flex space-x-2">
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="#" className="block">
                      <img
                        src="/placeholder.svg?height=40&width=120&text=App+Store"
                        alt="Download on App Store"
                        className="h-10"
                      />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href="#" className="block">
                      <img
                        src="/placeholder.svg?height=40&width=120&text=Google+Play"
                        alt="Get it on Google Play"
                        className="h-10"
                      />
                    </Link>
                  </motion.div>
                </div>
                <motion.div className="mt-4" whileHover={{ rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <img src="/placeholder.svg?height=100&width=100&text=QR+Code" alt="QR Code" className="h-24 w-24" />
                </motion.div>
              </SlideUp>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                <p className="text-white/70 mb-4">Subscribe to our newsletter to get updates on our latest offers!</p>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button className="rounded-l-none bg-palette-cream text-palette-darkGreen hover:bg-white">
                    Subscribe
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/support/contact" className="text-white/70 hover:text-palette-cream">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/support/shipping" className="text-white/70 hover:text-palette-cream">
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link href="/support/returns" className="text-white/70 hover:text-palette-cream">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/support/faq" className="text-white/70 hover:text-palette-cream">
                      FAQ
                    </Link>
                  </li>
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
                    <Link href="/account/orders" className="text-white/70 hover:text-palette-cream">
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link href="/wishlist" className="text-white/70 hover:text-palette-cream">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/personal-info" className="text-white/70 hover:text-palette-cream">
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Download App</h3>
                <p className="text-white/70 mb-4">Get our mobile app for a better experience</p>
                <div className="flex space-x-2">
                  <Link href="#" className="block">
                    <img
                      src="/placeholder.svg?height=40&width=120&text=App+Store"
                      alt="Download on App Store"
                      className="h-10"
                    />
                  </Link>
                  <Link href="#" className="block">
                    <img
                      src="/placeholder.svg?height=40&width=120&text=Google+Play"
                      alt="Get it on Google Play"
                      className="h-10"
                    />
                  </Link>
                </div>
                <div className="mt-4">
                  <img src="/placeholder.svg?height=100&width=100&text=QR+Code" alt="QR Code" className="h-24 w-24" />
                </div>
              </div>
            </>
          )}
        </div>

        {isClient ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-white/70">
              © 2023{" "}
              <a href="/" onClick={handleLogoClick} className="hover:text-palette-cream cursor-pointer">
                Kulshy O-Klashy
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link href="#" className="text-white/70 hover:text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70">
              © 2023{" "}
              <a href="/" onClick={handleLogoClick} className="hover:text-palette-cream cursor-pointer">
                Kulshy O-Klashy
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {[1, 2, 3].map((_, index) => (
                <Link key={index} href="#" className="text-white/70 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}