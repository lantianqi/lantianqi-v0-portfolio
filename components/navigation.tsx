"use client"

import { Menu, X } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useState } from "react"
import "./navigation.css" // Import the CSS file

export default function Navigation() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track active section for highlighting
  const { activeSection, navigateToSection } = useScrollSpy({
    sections: ["hero", "about", "projects", "contact"],
    offset: 100,
    updateUrl: true,
  })

  const handleNavClick = (sectionId: string) => {
    console.log(`Navigating to section: ${sectionId}`) // Debug log
    navigateToSection(sectionId)
    setMobileMenuOpen(false) // Close mobile menu if open
  }

  const navItems = [
    { href: "#about", label: t("nav.about"), id: "about" },
    { href: "#projects", label: t("nav.projects"), id: "projects" },
    { href: "#contact", label: t("nav.contact"), id: "contact" },
  ]

  // Base button styles - simplified and working
  const baseButtonStyles = {
    height: "44px",
    minWidth: "100px",
    padding: "0 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
    border: "1px solid transparent",
    position: "relative" as const,
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textDecoration: "none",
    outline: "none",
    backgroundColor: "transparent",
  }

  const getButtonClassName = (isActive = false) => {
    return `nav-button ${isActive ? "nav-button-active" : "nav-button-inactive"}`
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 w-full nav-container">
      <div className="container mx-auto px-6 py-4 min-h-100">
        
      </div>
    </nav>
  )
}
