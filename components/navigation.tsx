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
        /* ===========================================
           CRITICAL BLUR FACTORS ANALYSIS & FIXES
           =========================================== */

        /* Factor 1: Browser Compatibility & Vendor Prefixes */
        .blur-enhanced {
          /* Multiple vendor prefixes for maximum compatibility */
          -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(110%);
          backdrop-filter: blur(24px) saturate(180%) brightness(110%);
          -moz-backdrop-filter: blur(24px) saturate(180%) brightness(110%);
          -ms-backdrop-filter: blur(24px) saturate(180%) brightness(110%);
          
          /* Fallback for browsers without backdrop-filter support */
          background-image: 
            radial-gradient(circle at 30% 30%, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.3) 0%, transparent 50%);
        }

        /* Factor 2: Stacking Context & Z-Index Hierarchy */
        .nav-container {
          /* Establish proper stacking context */
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          
          /* Optimized blur settings */
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          
          /* Enhanced visual separation */
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          
          /* Force hardware acceleration */
          transform: translateZ(0);
          will-change: backdrop-filter;
        }

        /* Factor 3: Mobile Dropdown - Enhanced Blur Stack */
        .mobile-dropdown {
          /* Critical: Higher z-index than nav-container */
          position: fixed;
          top: 80px;
          right: 24px;
          z-index: 1001;
          
          /* Multi-layered background approach */
          background: 
            linear-gradient(135deg, 
              rgba(0, 0, 0, 0.45) 0%, 
              rgba(0, 0, 0, 0.35) 50%, 
              rgba(0, 0, 0, 0.45) 100%
            );
          
          /* Enhanced blur with multiple filters */
          backdrop-filter: 
            blur(28px) 
            saturate(180%) 
            brightness(110%) 
            contrast(120%);
          -webkit-backdrop-filter: 
            blur(28px) 
            saturate(180%) 
            brightness(110%) 
            contrast(120%);
          
          /* Stronger visual definition */
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 12px;
          
          /* Enhanced shadow stack */
          box-shadow: 
            0 8px 40px rgba(0, 0, 0, 0.7),
            0 4px 20px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 1px 0 rgba(255, 255, 255, 0.2) inset;
          
          /* Layout properties */
          padding: 16px;
          min-width: 160px;
          width: max-content;
          overflow: hidden;
          
          /* Performance optimizations */
          transform: translateZ(0);
          will-change: backdrop-filter, transform;
          
          /* Smooth transitions */
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Factor 4: Multiple Backdrop Layers for Content Blocking */
        .mobile-dropdown::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          
          /* Secondary blur layer */
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          
          pointer-events: none;
          border-radius: inherit;
          z-index: -2;
        }

        /* Factor 5: Tertiary Content Separation Layer */
        .mobile-dropdown::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          
          /* Gradient mask for additional content blocking */
          background: 
            radial-gradient(ellipse at center, 
              rgba(0, 0, 0, 0.2) 0%, 
              rgba(0, 0, 0, 0.4) 100%
            );
          
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
        }

        /* Factor 6: Button Styles with Enhanced Readability */
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
          
          /* Hardware acceleration */
          transform: translateZ(0);
        }

        .nav-button-inactive {
          color: rgba(255, 255, 255, 0.8);
          border-color: transparent;
        }

        .nav-button-inactive:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px) scale(1.05) translateZ(0);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-button-active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        .nav-button:active {
          transform: translateY(0) scale(1.02) translateZ(0);
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

        /* Factor 7: Mobile Dropdown Buttons with Maximum Contrast */
        .mobile-dropdown-button {
          height: 48px;
          padding: 0 20px;
          border-radius: 10px;
          font-size: 16px;
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
          color: rgba(255, 255, 255, 0.98);
          margin-bottom: 8px;
          white-space: nowrap;
          text-align: left;
          width: 100%;
          z-index: 1;
          
          /* Enhanced text readability */
          text-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.8),
            0 0 4px rgba(0, 0, 0, 0.5);
          
          /* Hardware acceleration */
          transform: translateZ(0);
        }

        .mobile-dropdown-button:last-child {
          margin-bottom: 0;
        }

        .mobile-dropdown-button:hover {
          color: white;
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-1px) scale(1.02) translateZ(0);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset;
          text-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.9),
            0 0 6px rgba(0, 0, 0, 0.6);
        }

        .mobile-dropdown-button:active {
          transform: translateY(0) scale(1.01) translateZ(0);
        }

        .mobile-dropdown-button.active {
          color: white;
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 
            0 2px 12px rgba(255, 255, 255, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.3) inset;
          text-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.9),
            0 0 8px rgba(0, 0, 0, 0.7);
        }

        /* Factor 8: Responsive Adjustments */
        @media (max-width: 768px) {
          .nav-button {
            min-width: 80px;
            padding: 0 12px;
            font-size: 13px;
          }
          
          .mobile-dropdown {
            right: 16px;
            min-width: 140px;
            
            /* Enhanced blur for smaller screens */
            backdrop-filter: 
              blur(32px) 
              saturate(200%) 
              brightness(115%) 
              contrast(125%);
            -webkit-backdrop-filter: 
              blur(32px) 
              saturate(200%) 
              brightness(115%) 
              contrast(125%);
          }
        }

        /* Factor 9: High DPI Display Optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .mobile-dropdown {
            /* Stronger blur for high-DPI displays */
            backdrop-filter: 
              blur(36px) 
              saturate(220%) 
              brightness(120%) 
              contrast(130%);
            -webkit-backdrop-filter: 
              blur(36px) 
              saturate(220%) 
              brightness(120%) 
              contrast(130%);
          }
        }

        /* Factor 10: Browser-Specific Optimizations */
        @supports not (backdrop-filter: blur(1px)) {
          /* Fallback for browsers without backdrop-filter support */
          .mobile-dropdown {
            background: rgba(0, 0, 0, 0.85);
            box-shadow: 
              0 8px 40px rgba(0, 0, 0, 0.8),
              0 4px 20px rgba(0, 0, 0, 0.6);
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
    </>
  )
}
