"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import "./language-switcher.css"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label={`Switch to ${language === "en" ? "Chinese" : "English"}`}
    >
      <Globe size={16} className="language-icon" />
      <span className="language-text">{language === "en" ? "中文" : "EN"}</span>
    </button>
  )
}
