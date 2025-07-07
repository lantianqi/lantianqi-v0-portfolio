"use client"

import { Button } from "@/components/ui/button"
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
    navigateToSection(sectionId)
    setMobileMenuOpen(false) // Close mobile menu if open
  }

  const navItems = [
    { href: "#about", label: t("nav.about"), id: "about" },
    { href: "#projects", label: t("nav.projects"), id: "projects" },
    { href: "#contact", label: t("nav.contact"), id: "contact" },
  ]

  // Unified button classes for consistent sizing
  const baseButtonClasses =
    "h-10 px-4 py-2 rounded-lg transition-all duration-300 ease-out cursor-pointer group overflow-hidden border flex items-center justify-center min-w-[80px]"
  const activeClasses = "text-white bg-white/10 backdrop-blur-sm shadow-lg border-white/20"
  const hoverClasses =
    "hover:text-white hover:bg-white/5 hover:backdrop-blur-sm hover:shadow-md hover:border-white/10 hover:scale-105 hover:-translate-y-0.5"
  const inactiveClasses = "text-white/80 border-transparent"

  const getButtonClassName = (sectionId: string) => {
    return activeSection === sectionId
      ? `${baseButtonClasses} ${activeClasses}`
      : `${baseButtonClasses} ${inactiveClasses} ${hoverClasses}`
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button onClick={() => handleNavClick("hero")} className={`font-bold text-xl ${getButtonClassName("hero")}`}>
            <span className="relative z-10">{t("nav.portfolio")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 items-center">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleNavClick(item.id)} className={getButtonClassName(item.id)}>
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${baseButtonClasses} ${inactiveClasses} ${hoverClasses}`}
            >
              <span className="relative z-10">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 backdrop-blur-xl bg-black/20 rounded-lg">
            <div className="flex flex-col space-y-2 pt-4 px-2">
              {navItems.map((item) => (
                <button
                  key={`mobile-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`${getButtonClassName(item.id)} text-lg text-left w-full`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
