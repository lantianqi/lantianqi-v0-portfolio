"use client"

import "./navigation.css"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useScrollSpy } from "@/hooks/use-scroll-spy"

const navItems = [
  { key: "hero", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const activeSection = useScrollSpy(navItems.map((item) => item.key))

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="nav-container">
      <div className="nav-inner">
        <Link href="#hero" className="nav-logo" onClick={() => handleNavClick("#hero")}>
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-desktop">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className={`nav-link ${activeSection === item.key ? "active" : ""}`}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
          <div className="nav-language-switcher">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="nav-mobile-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mobile-dropdown">
          <div className="mobile-dropdown-inner">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className={`mobile-nav-link ${activeSection === item.key ? "active" : ""}`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
            <div className="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
