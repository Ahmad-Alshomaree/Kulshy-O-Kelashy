"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, BarChart, Settings, HelpCircle, History, Database, LogOut } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SellerNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const links = [
    { name: "Dashboard", href: "/seller/dashboard", icon: LayoutDashboard },
    { name: "History", href: "/seller/history", icon: History },
    { name: "Products", href: "/seller/products", icon: Package },
    { name: "Storage", href: "/seller/storage", icon: Database },
    { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
    { name: "Help", href: "/seller/help", icon: HelpCircle },
    { name: "Analytics", href: "/seller/analytics", icon: BarChart },
    { name: "Settings", href: "/seller/settings", icon: Settings },
  ]

  const handleSignOut = async () => {
    const { error } = await authClient.signOut()
    if (error?.code) {
      toast.error("Failed to sign out")
    } else {
      localStorage.removeItem("bearer_token")
      toast.success("Successfully signed out")
      router.push("/login/seller")
    }
  }

  return (
    <nav className="bg-palette-darkGreen text-white border-b border-palette-darkGreen/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/seller/dashboard" className="text-xl font-bold hover:opacity-80 transition-opacity">
            Kulshy Seller
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-palette-olive text-white" 
                      : "text-white/80 hover:bg-palette-olive/50 hover:text-white"
                  }`}
                >
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-palette-olive/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-palette-olive flex items-center justify-center text-sm font-medium">
                        {session.user.name?.charAt(0).toUpperCase() || 'S'}
                      </div>
                      <span className="hidden lg:block">{session.user.name}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user.email}</p>
                      {session.user.storeId && (
                        <p className="text-xs text-muted-foreground">Store: {session.user.storeId}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/seller/settings" className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive 
                      ? "bg-palette-olive text-white" 
                      : "text-white/80 hover:bg-palette-olive/50 hover:text-white"
                  }`}
                >
                  <link.icon className="w-4 h-4 mr-1" />
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
