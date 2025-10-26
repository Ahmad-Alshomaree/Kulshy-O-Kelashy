"use client"

import Link from "next/link"
import { Heart, Search, ShoppingCart, User, Bell, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryNav } from "@/components/category-nav"
import { HoverButton } from "@/components/motion"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { authClient, useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { LogoSplashScreen } from "@/components/logo-splash-screen"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SiteSettings {
  siteName: string
}

export function HomeHeader() {
  const [isClient, setIsClient] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({ siteName: 'Kulshy O-Klashy' })
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()

  // Use optional chaining to safely access itemCount
  const cart = useCart()
  const cartItemCount = cart && typeof cart.itemCount === "number" ? cart.itemCount : 0

  // Use optional chaining to safely access wishlist itemCount
  const wishlist = useWishlist()
  const wishlistItemCount = wishlist && typeof wishlist.itemCount === "number" ? wishlist.itemCount : 0

  useEffect(() => {
    setIsClient(true)
    
    // Fetch site settings
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(error => console.error('Error fetching site settings:', error))
  }, [])

  const handleSignOut = async () => {
    const { error } = await authClient.signOut()
    if (error?.code) {
      toast.error("Failed to sign out")
    } else {
      localStorage.removeItem("bearer_token")
      refetch()
      toast.success("Successfully signed out")
      router.push("/")
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowSplash(true)
  }

  return (
    <header className="w-full bg-palette-darkGreen text-white">
      <LogoSplashScreen isVisible={showSplash} onClose={() => setShowSplash(false)} />
      
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-4">
          {isClient ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <a href="/" onClick={handleLogoClick} className="font-bold text-2xl cursor-pointer">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, staggerChildren: 0.1 }}
                  className="inline-block"
                >
                  {siteSettings.siteName.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.03 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </a>
            </motion.div>
          ) : (
            <a href="/" onClick={handleLogoClick} className="font-bold text-2xl cursor-pointer">
              Kulshy O-Klashy
            </a>
          )}

          {isClient ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex relative w-full max-w-md mx-4"
            >
              <Input
                type="search"
                placeholder="Search for products..."
                className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </motion.div>
          ) : (
            <div className="hidden md:flex relative w-full max-w-md mx-4">
              <Input
                type="search"
                placeholder="Search for products..."
                className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </div>
          )}

          {isClient ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link href="/wishlist">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                    <Heart className="h-5 w-5" />
                    {wishlistItemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                          delay: 0.5,
                        }}
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center"
                      >
                        {wishlistItemCount}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </Link>
              <Link href="/cart">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                          delay: 0.5,
                        }}
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-palette-cream text-xs text-palette-darkGreen flex items-center justify-center"
                      >
                        {cartItemCount}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </Link>

              {!isPending && session?.user ? (
                // Show Account dropdown when logged in
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                          <User className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account">Account Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/addresses">Addresses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/account/notifications">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <Bell className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Link>
                </>
              ) : (
                // Show Sign in and Sign up buttons when logged out
                <>
                  <Link href="/login">
                    <HoverButton>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Sign in
                      </Button>
                    </HoverButton>
                  </Link>
                  <Link href="/signup">
                    <HoverButton>
                      <Button size="sm" className="bg-palette-cream text-palette-darkGreen hover:bg-white">
                        Sign up
                      </Button>
                    </HoverButton>
                  </Link>
                </>
              )}
            </motion.div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                  <Heart className="h-5 w-5" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {wishlistItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-palette-cream text-xs text-palette-darkGreen flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {!isPending && session?.user ? (
                // Show Account dropdown when logged in
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account">Account Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/addresses">Addresses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/account/notifications">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              ) : (
                // Show Sign in and Sign up buttons when logged out
                <>
                  <Link href="/login">
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-palette-cream text-palette-darkGreen hover:bg-white">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        <CategoryNav />
      </div>
    </header>
  )
}