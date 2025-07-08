"use client"

import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import { LanguageProvider } from "@/contexts/language-context"
import { useEffect } from "react"

export default function LandingPage() {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </LanguageProvider>
  )
}
