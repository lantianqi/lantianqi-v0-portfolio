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
    console.log(`Navigating to section: ${sectionId}`)
    navigateToSection(sectionId)
    setMobileMenuOpen(false)
  }

  const navItems = [
    { href: "#about", label: t("nav.about"), id: "about" },
    { href: "#projects", label: t("nav.projects"), id: "projects" },
    { href: "#contact", label: t("nav.contact"), id: "contact" },
  ]

  const getButtonClassName = (isActive = false) => {
    return `nav-button ${isActive ? "nav-button-active" : "nav-button-inactive"}`
  }

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
            className={`${getButtonClassName(activeSection === "hero")} font-bold`}
            style={{ minWidth: "120px" }}
          >
            {t("nav.portfolio")}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center" style={{ gap: "12px" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={getButtonClassName(activeSection === item.id)}
              >
                {item.label}
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center" style={{ gap: "12px" }}>
            <LanguageSwitcher />
            <button onClick={toggleMobileMenu} className={getButtonClassName()} style={{ minWidth: "44px" }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Now properly positioned within nav-container */}
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
