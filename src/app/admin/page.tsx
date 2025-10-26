'use client'

import Link from 'next/link'
import { Settings, Image, LayoutList, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  const sections = [
    {
      title: 'Site Settings',
      description: 'Manage site name, logo, and contact information',
      href: '/admin/site-settings',
      icon: Settings,
      color: 'text-blue-500',
    },
    {
      title: 'Hero Section',
      description: 'Edit homepage hero banner content and images',
      href: '/admin/hero',
      icon: Image,
      color: 'text-purple-500',
    },
    {
      title: 'Footer Content',
      description: 'Manage footer links, newsletter, and download app section',
      href: '/admin/footer',
      icon: FileText,
      color: 'text-green-500',
    },
    {
      title: 'Homepage Sections',
      description: 'Configure dynamic product sections on the homepage',
      href: '/admin/sections',
      icon: LayoutList,
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Content Management</h2>
          <p className="text-gray-600">
            Manage all dynamic content for your website from this dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`h-8 w-8 ${section.color}`} />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Manage →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
