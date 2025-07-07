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
      className="text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm">{language === "en" ? t("lang.chinese") : t("lang.english")}</span>
    </Button>
  )
}
