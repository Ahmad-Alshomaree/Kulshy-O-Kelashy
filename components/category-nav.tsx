"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function CategoryNav() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories = [
    { name: "Women", href: "/category/women" },
    { name: "Men", href: "/category/men" },
    { name: "Children", href: "/category/children" },
    { name: "Home", href: "/category/home" },
    { name: "Make-up", href: "/category/makeup" },
    { name: "Clothes", href: "/category/clothes" },
    { name: "Electronic", href: "/category/electronic" },
  ]

  return (
    <nav className="overflow-x-auto pb-2 mb-2 scrollbar-hide">
      {isClient ? (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex space-x-8 min-w-max"
        >
          {categories.map((category, index) => (
            <motion.li
              key={category.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            >
              <Link
                href={category.href}
                className="text-white/80 hover:text-white whitespace-nowrap text-sm font-medium py-2 inline-block"
              >
                <motion.span
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(255,255,255,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {category.name}
                </motion.span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <ul className="flex space-x-8 min-w-max">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                className="text-white/80 hover:text-white whitespace-nowrap text-sm font-medium py-2 inline-block"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
