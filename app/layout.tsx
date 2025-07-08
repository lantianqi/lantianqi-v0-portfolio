import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lantianqi - Full Stack Developer",
  description: "Passionate full-stack developer creating innovative web solutions with modern technologies.",
  keywords: ["developer", "full-stack", "web development", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Lantianqi" }],
  creator: "Lantianqi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lantianqi.dev",
    title: "Lantianqi - Full Stack Developer",
    description: "Passionate full-stack developer creating innovative web solutions with modern technologies.",
    siteName: "Lantianqi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lantianqi - Full Stack Developer",
    description: "Passionate full-stack developer creating innovative web solutions with modern technologies.",
    creator: "@lantianqi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
