"use client"

import type React from "react"

import "./navigation-analysis.css"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useState, useEffect, useRef } from "react"

export default function NavigationImproved() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const navRef = useRef<HTMLElement>(null)

  // Track active section for highlighting
  const { activeSection, navigateToSection } = useScrollSpy({
    sections: ["hero", "about", "projects", "contact"],
    offset: 100,
    updateUrl: true,
  })

  // Calculate dropdown position relative to nav container
  useEffect(() => {
    if (mobileMenuOpen && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: navRect.bottom + 8,
        right: window.innerWidth - navRect.right,
      })
    }
  }, [mobileMenuOpen])

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
    <>
      {/* SOLUTION 1: Relative positioning within nav-container */}
      <nav ref={navRef} className="nav-container-solution-1" style={{ position: "relative" }}>
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

          {/* Mobile Navigation Menu - SOLUTION 1: Absolute positioning within nav */}
          {mobileMenuOpen && (
            <div className="mobile-dropdown-solution-1">
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

      {/* SOLUTION 3: Portal-based positioning with calculated coordinates */}
      {mobileMenuOpen && (
        <div
          className="mobile-dropdown-portal"
          style={
            {
              "--dropdown-top": `${dropdownPosition.top}px`,
              "--dropdown-right": `${dropdownPosition.right}px`,
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col min-w-max">
            {navItems.map((item) => (
              <button
                key={`portal-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-dropdown-button ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
