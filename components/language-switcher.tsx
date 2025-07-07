"use client"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  // Matching the exact same dimensions as navigation buttons
  const standardButtonClasses =
    "h-11 min-w-[100px] px-4 py-2.5 rounded-lg font-medium text-sm " +
    "flex items-center justify-center gap-2 " +
    "transition-all duration-300 ease-out cursor-pointer group overflow-hidden " +
    "border relative " +
    "text-white/80 border-transparent " +
    "hover:text-white hover:bg-white/5 hover:backdrop-blur-sm " +
    "hover:shadow-md hover:border-white/10 hover:scale-105 hover:-translate-y-0.5 " +
    "hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"

  return (
    <button onClick={toggleLanguage} className={standardButtonClasses}>
      <span className="relative z-10 flex items-center gap-2">
        <Globe className="w-4 h-4 flex-shrink-0" />
        <span className="whitespace-nowrap text-sm">{language === "en" ? t("lang.chinese") : t("lang.english")}</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
    </button>
  )
}
