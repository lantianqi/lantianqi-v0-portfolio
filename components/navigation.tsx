"use client"

import "./navigation.css"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useState } from "react"

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="flex justify-between items-center">
          {/* Portfolio/Logo Button */}
          <button
            onClick={() => handleNavClick("hero")}
            className={`nav-button font-bold nav-portfolio-button ${
              activeSection === "hero" ? "nav-button-active" : "nav-button-inactive"
            }`}
          >
            {t("nav.portfolio")}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center nav-desktop-container">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-button ${activeSection === item.id ? "nav-button-active" : "nav-button-inactive"}`}
              >
                {item.label}
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center nav-mobile-container">
            <LanguageSwitcher />
            <button onClick={toggleMobileMenu} className="nav-button nav-button-inactive nav-mobile-toggle">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown">
            <div className="flex flex-col min-w-max">
              {navItems.map((item) => (
                <button
                  key={`mobile-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-dropdown-button ${activeSection === item.id ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
