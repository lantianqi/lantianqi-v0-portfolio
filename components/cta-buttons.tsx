"use client"

import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, Mail } from "lucide-react"

export default function CTAButtons() {
  const { t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        onClick={() => scrollToSection("projects")}
        className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
      >
        {t("hero.cta.projects")}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <button
        onClick={() => scrollToSection("contact")}
        className="group px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-white/10 hover:scale-105"
      >
        <Mail className="w-5 h-5" />
        {t("hero.cta.contact")}
      </button>
    </div>
  )
}
