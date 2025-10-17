"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, BarChart, Settings, HelpCircle, LogOut } from "lucide-react"
import { useSellerAuth } from "@/contexts/seller-auth-context"

export function SellerSidebar() {
  const pathname = usePathname()
  const { seller, logoutSeller } = useSellerAuth()

  const links = [
    { name: "Dashboard", href: "/seller", icon: LayoutDashboard },
    { name: "Products", href: "/seller/products", icon: Package },
    { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
    { name: "Analytics", href: "/seller/analytics", icon: BarChart },
    { name: "Settings", href: "/seller/settings", icon: Settings },
    { name: "Help", href: "/seller/help", icon: HelpCircle },
  ]

  return (
    <div className="w-64 bg-palette-darkGreen text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-palette-darkGreen/20">
        <Link href="/seller" className="text-xl font-bold">
          Seller Dashboard
        </Link>
      </div>

      {seller && (
        <div className="p-4 border-b border-palette-darkGreen/20">
          <div className="text-sm opacity-75">Logged in as</div>
          <div className="font-medium">{seller.businessName}</div>
          <div className="text-xs opacity-75">Store ID: {seller.storeId}</div>
        </div>
      )}

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive ? "bg-palette-olive text-white" : "text-white/80 hover:bg-palette-olive/50"
                  }`}
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  {link.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-palette-darkGreen/20">
        <button
          onClick={logoutSeller}
          className="flex items-center p-2 w-full text-white/80 hover:bg-palette-olive/50 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}
