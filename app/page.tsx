"use client"

import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import ScrollIndicator from "@/components/scroll-indicator"
import BackgroundAnimation from "@/components/background-animation"
import { LanguageProvider } from "@/contexts/language-context"
import { useEffect } from "react"

export default function Home() {
  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      // Small delay to ensure elements are rendered
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [])

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <BackgroundAnimation />
        <Navigation />
        <ScrollIndicator />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </LanguageProvider>
  )
}
