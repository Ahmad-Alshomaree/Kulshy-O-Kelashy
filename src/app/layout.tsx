import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import ClientLayout from "./ClientLayout"
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { WelcomeOverlay } from "@/components/welcome-overlay";
import { QueryProvider } from "@/lib/providers/query-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { generateMetadata as generateSeoMetadata, generateOrganizationSchema, siteConfig } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { GoogleAnalytics } from "@/components/google-analytics";

import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = generateSeoMetadata({
  title: "EcoShop - Sustainable Shopping",
  description: "Shop eco-friendly products for a sustainable lifestyle. Discover sustainable, organic, and eco-conscious products for your home and lifestyle.",
  keywords: ["eco-friendly", "sustainable", "organic", "green products", "eco shop", "sustainable shopping"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4A7C59" />
        <StructuredData data={organizationSchema} />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <GoogleAnalytics />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <WelcomeOverlay />
        <QueryProvider>
          <ClientLayout>{children}</ClientLayout>
        </QueryProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      
        <VisualEditsMessenger />
      </body>
    </html>
  )
}