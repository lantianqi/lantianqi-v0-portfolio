"use client"

import "./navigation-analysis.css"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useState, useEffect } from "react"

export default function NavigationDebug() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState({
    navRect: null as DOMRect | null,
    dropdownRect: null as DOMRect | null,
    stackingContext: "",
  })

  // Track active section for highlighting
  const { activeSection, navigateToSection } = useScrollSpy({
    sections: ["hero", "about", "projects", "contact"],
    offset: 100,
    updateUrl: true,
  })

  useEffect(() => {
    if (mobileMenuOpen) {
      const navElement = document.querySelector(".debug-nav-container") as HTMLElement
      const dropdownElement = document.querySelector(".debug-mobile-dropdown") as HTMLElement

      if (navElement && dropdownElement) {
        const navRect = navElement.getBoundingClientRect()
        const dropdownRect = dropdownElement.getBoundingClientRect()

        // Analyze stacking context
        const navStyles = window.getComputedStyle(navElement)
        const dropdownStyles = window.getComputedStyle(dropdownElement)

        const stackingContext = `
          Nav: position=${navStyles.position}, z-index=${navStyles.zIndex}, transform=${navStyles.transform}
          Dropdown: position=${dropdownStyles.position}, z-index=${dropdownStyles.zIndex}, transform=${dropdownStyles.transform}
        `

        setDebugInfo({
          navRect,
          dropdownRect,
          stackingContext,
        })
      }
    }
  }, [mobileMenuOpen])

  const handleNavClick = (sectionId: string) => {
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
      <nav className="nav-container debug-nav-container">
        <div className="nav-content">
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleNavClick("hero")}
              className={`${getButtonClassName(activeSection === "hero")} font-bold`}
              style={{ minWidth: "120px" }}
            >
              {t("nav.portfolio")}
            </button>

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

            <div className="md:hidden flex items-center" style={{ gap: "12px" }}>
              <LanguageSwitcher />
              <button onClick={toggleMobileMenu} className={getButtonClassName()} style={{ minWidth: "44px" }}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Debug Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown debug-mobile-dropdown">
          <div className="flex flex-col min-w-max">
            {navItems.map((item) => (
              <button
                key={`debug-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-dropdown-button ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Debug Information Panel */}
      {mobileMenuOpen && debugInfo.navRect && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "12px",
            zIndex: 10001,
            maxWidth: "300px",
          }}
        >
          <h4>Debug Information:</h4>
          <p>
            <strong>Nav Container:</strong>
          </p>
          <p>
            Position: {debugInfo.navRect.top}, {debugInfo.navRect.left}
          </p>
          <p>
            Size: {debugInfo.navRect.width} x {debugInfo.navRect.height}
          </p>

          {debugInfo.dropdownRect && (
            <>
              <p>
                <strong>Mobile Dropdown:</strong>
              </p>
              <p>
                Position: {debugInfo.dropdownRect.top}, {debugInfo.dropdownRect.left}
              </p>
              <p>
                Size: {debugInfo.dropdownRect.width} x {debugInfo.dropdownRect.height}
              </p>

              <p>
                <strong>Relationship:</strong>
              </p>
              <p>Dropdown is {debugInfo.dropdownRect.top > debugInfo.navRect.bottom ? "below" : "overlapping"} nav</p>
              <p>Distance: {Math.abs(debugInfo.dropdownRect.top - debugInfo.navRect.bottom)}px</p>
            </>
          )}

          <p>
            <strong>Stacking Context:</strong>
          </p>
          <pre style={{ fontSize: "10px", whiteSpace: "pre-wrap" }}>{debugInfo.stackingContext}</pre>
        </div>
      )}
    </>
  )
}
