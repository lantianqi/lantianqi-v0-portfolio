"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 text-sm font-medium rounded transition-all duration-200 ${
          language === "en" ? "bg-white text-black" : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("zh")}
        className={`px-3 py-1 text-sm font-medium rounded transition-all duration-200 ${
          language === "zh" ? "bg-white text-black" : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        中文
      </button>
    </div>
  )
}
