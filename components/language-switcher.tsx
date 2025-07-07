"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-10 px-4 py-2 rounded-lg transition-all duration-300 ease-out cursor-pointer group overflow-hidden border border-transparent text-white/80 hover:text-white hover:bg-white/5 hover:backdrop-blur-sm hover:shadow-md hover:border-white/10 hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center min-w-[80px] gap-2"
    >
      <span className="relative z-10 flex items-center gap-2">
        <Globe className="w-4 h-4" />
        <span className="text-sm">{language === "en" ? t("lang.chinese") : t("lang.english")}</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Button>
  )
}
