"use client"
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

  // Standardized dimensions for all interactive elements
  const standardButtonClasses =
    "h-11 min-w-[100px] px-4 py-2.5 rounded-lg font-medium text-sm " +
    "flex items-center justify-center gap-2 " +
    "transition-all duration-300 ease-out cursor-pointer group overflow-hidden " +
    "border relative"

  const activeStateClasses =
    "text-white bg-white/10 backdrop-blur-sm shadow-lg border-white/20 " + "shadow-[0_0_20px_rgba(255,255,255,0.1)]"

  const inactiveStateClasses =
    "text-white/80 border-transparent " +
    "hover:text-white hover:bg-white/5 hover:backdrop-blur-sm " +
    "hover:shadow-md hover:border-white/10 hover:scale-105 hover:-translate-y-0.5 " +
    "hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"

  const getStandardButtonClassName = (sectionId?: string) => {
    const isActive = sectionId && activeSection === sectionId
    return `${standardButtonClasses} ${isActive ? activeStateClasses : inactiveStateClasses}`
  }

  // Mobile button classes (slightly smaller for mobile)
  const mobileButtonClasses =
    "h-12 min-w-[120px] px-4 py-3 rounded-lg font-medium text-base " +
    "flex items-center justify-center gap-2 " +
    "transition-all duration-300 ease-out cursor-pointer group overflow-hidden " +
    "border relative w-full"

  const getMobileButtonClassName = (sectionId?: string) => {
    const isActive = sectionId && activeSection === sectionId
    return `${mobileButtonClasses} ${isActive ? activeStateClasses : inactiveStateClasses}`
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Portfolio/Logo Button */}
          <button onClick={() => handleNavClick("hero")} className={`${getStandardButtonClassName("hero")} font-bold`}>
            <span className="relative z-10 whitespace-nowrap">{t("nav.portfolio")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={getStandardButtonClassName(item.id)}
              >
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${getStandardButtonClassName()} min-w-[50px]`}
            >
              <span className="relative z-10">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 backdrop-blur-xl bg-black/20 rounded-lg">
            <div className="flex flex-col gap-3 pt-4 px-4">
              {navItems.map((item) => (
                <button
                  key={`mobile-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={getMobileButtonClassName(item.id)}
                >
                  <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
