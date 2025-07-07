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
    console.log(`Navigating to section: ${sectionId}`) // Debug log
    navigateToSection(sectionId)
    setMobileMenuOpen(false) // Close mobile menu if open
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
      <style jsx>{`
        .nav-button {
          height: 44px;
          min-width: 100px;
          padding: 0 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          outline: none;
          background: transparent;
          white-space: nowrap;
        }

        .nav-button-inactive {
          color: rgba(255, 255, 255, 0.8);
          border-color: transparent;
        }

        .nav-button-inactive:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-button-active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        .nav-button:active {
          transform: translateY(0) scale(1.02);
        }

        .nav-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .nav-button:hover::before {
          left: 100%;
        }

        /* Consistent glass morphism base styles */
        .glass-morphism-base {
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .nav-container {
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
        }

        .mobile-dropdown {
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
          padding: 8px;
          min-width: 120px;
          width: max-content;
          position: relative;
          overflow: hidden;
          z-index: 9999;
        }

        /* Enhanced backdrop for better content separation */
        .mobile-dropdown::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
        }

        .mobile-dropdown-button {
          height: 40px;
          padding: 0 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          outline: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 4px;
          white-space: nowrap;
          text-align: left;
          width: 100%;
          z-index: 1;
        }

        .mobile-dropdown-button:last-child {
          margin-bottom: 0;
        }

        .mobile-dropdown-button:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .mobile-dropdown-button:active {
          transform: translateY(0) scale(1.01);
        }

        .mobile-dropdown-button.active {
          color: white;
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 12px rgba(255, 255, 255, 0.1);
        }

        .mobile-dropdown-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .mobile-dropdown-button:hover::before {
          left: 100%;
        }

        @media (max-width: 768px) {
          .nav-button {
            min-width: 80px;
            padding: 0 12px;
            font-size: 13px;
          }
        }
      `}</style>

      <nav className="fixed top-0 w-full z-50 nav-container">
        <div className="container mx-auto px-6 py-4">
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

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="fixed top-20 right-6 md:hidden z-50">
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
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
