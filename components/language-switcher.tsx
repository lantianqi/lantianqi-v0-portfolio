"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher">
      <button
        onClick={() => setLanguage(language === "en" ? "zh" : "en")}
        className="language-button px-3 py-1 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-200"
      >
        {language === "en" ? "中文" : "EN"}
      </button>
    </div>
  )
}
