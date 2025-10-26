"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SlideUp, HoverButton } from "@/components/motion"
import { LogoSplashScreen } from "@/components/logo-splash-screen"

interface FooterData {
  newsletter: {
    title: string
    description: string
  }
  columns: Array<{
    title: string
    links: Array<{
      label: string
      url: string
    }>
  }>
  downloadApp: {
    title: string
    description: string
    appStoreUrl?: string
    playStoreUrl?: string
    qrCode?: string
  }
  copyright: string
}

export function HomeFooter() {
  const [isClient, setIsClient] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    
    // Fetch footer data
    fetch('/api/footer-section')
      .then(res => res.json())
      .then(data => {
        setFooterData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching footer data:', error)
        setLoading(false)
      })
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowSplash(true)
  }

  if (loading || !footerData) {
    return (
      <footer className="bg-palette-darkGreen text-white py-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 bg-white/20 rounded mb-4 w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/20 rounded"></div>
                  <div className="h-4 bg-white/20 rounded"></div>
                  <div className="h-4 bg-white/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-palette-darkGreen text-white py-10">
      <LogoSplashScreen isVisible={showSplash} onClose={() => setShowSplash(false)} />
      
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {isClient ? (
            <>
              <SlideUp delay={0.1}>
                <h3 className="font-bold text-lg mb-4">{footerData.newsletter.title}</h3>
                <p className="text-white/70 mb-4">{footerData.newsletter.description}</p>
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

              {footerData.columns.map((column, columnIndex) => (
                <SlideUp key={columnIndex} delay={0.2 + columnIndex * 0.1}>
                  <h3 className="font-bold text-lg mb-4">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <motion.li 
                        key={linkIndex}
                        whileHover={{ x: 5 }} 
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link href={link.url} className="text-white/70 hover:text-palette-cream">
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </SlideUp>
              ))}

              <SlideUp delay={0.4}>
                <h3 className="font-bold text-lg mb-4">{footerData.downloadApp.title}</h3>
                <p className="text-white/70 mb-4">{footerData.downloadApp.description}</p>
                <div className="flex space-x-2">
                  {footerData.downloadApp.appStoreUrl && (
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <Link href={footerData.downloadApp.appStoreUrl} className="block">
                        <img
                          src="/placeholder.svg?height=40&width=120&text=App+Store"
                          alt="Download on App Store"
                          className="h-10"
                        />
                      </Link>
                    </motion.div>
                  )}
                  {footerData.downloadApp.playStoreUrl && (
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <Link href={footerData.downloadApp.playStoreUrl} className="block">
                        <img
                          src="/placeholder.svg?height=40&width=120&text=Google+Play"
                          alt="Get it on Google Play"
                          className="h-10"
                        />
                      </Link>
                    </motion.div>
                  )}
                </div>
                {footerData.downloadApp.qrCode && (
                  <motion.div className="mt-4" whileHover={{ rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <img src={footerData.downloadApp.qrCode} alt="QR Code" className="h-24 w-24" />
                  </motion.div>
                )}
              </SlideUp>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-lg mb-4">{footerData.newsletter.title}</h3>
                <p className="text-white/70 mb-4">{footerData.newsletter.description}</p>
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

              {footerData.columns.map((column, columnIndex) => (
                <div key={columnIndex}>
                  <h3 className="font-bold text-lg mb-4">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.url} className="text-white/70 hover:text-palette-cream">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="font-bold text-lg mb-4">{footerData.downloadApp.title}</h3>
                <p className="text-white/70 mb-4">{footerData.downloadApp.description}</p>
                <div className="flex space-x-2">
                  {footerData.downloadApp.appStoreUrl && (
                    <Link href={footerData.downloadApp.appStoreUrl} className="block">
                      <img
                        src="/placeholder.svg?height=40&width=120&text=App+Store"
                        alt="Download on App Store"
                        className="h-10"
                      />
                    </Link>
                  )}
                  {footerData.downloadApp.playStoreUrl && (
                    <Link href={footerData.downloadApp.playStoreUrl} className="block">
                      <img
                        src="/placeholder.svg?height=40&width=120&text=Google+Play"
                        alt="Get it on Google Play"
                        className="h-10"
                      />
                    </Link>
                  )}
                </div>
                {footerData.downloadApp.qrCode && (
                  <div className="mt-4">
                    <img src={footerData.downloadApp.qrCode} alt="QR Code" className="h-24 w-24" />
                  </div>
                )}
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
            <p className="text-white/70" dangerouslySetInnerHTML={{ __html: footerData.copyright }} />
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
            <p className="text-white/70" dangerouslySetInnerHTML={{ __html: footerData.copyright }} />
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
