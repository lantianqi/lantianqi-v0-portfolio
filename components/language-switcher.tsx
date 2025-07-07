"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    console.log(`Switching language from ${language} to ${language === "en" ? "zh" : "en"}`) // Debug log
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <>
      <style jsx>{`
        .language-switcher {
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
          color: rgba(255, 255, 255, 0.8);
          white-space: nowrap;
        }

        .language-switcher:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .language-switcher:active {
          transform: translateY(0) scale(1.02);
        }

        .language-switcher::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .language-switcher:hover::before {
          left: 100%;
        }

        .language-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .language-switcher {
            min-width: 80px;
            padding: 0 12px;
            font-size: 13px;
          }
        }
      `}</style>

      <button onClick={toggleLanguage} className="language-switcher">
        <Globe className="language-icon" />
        <span>{language === "en" ? t("lang.chinese") : t("lang.english")}</span>
      </button>
    </>
  )
}
