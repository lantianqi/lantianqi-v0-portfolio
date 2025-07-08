"use client"

import { useLanguage } from "@/contexts/language-context"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export default function HeroSection() {
  const { t } = useLanguage()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-purple-400 mb-4">{t("hero.greeting")}</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{t("hero.name")}</h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-white/90 mb-6">{t("hero.title")}</h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">{t("hero.subtitle")}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => scrollToSection("#projects")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            {t("hero.cta.projects")}
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            {t("hero.cta.contact")}
          </button>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors p-2"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors p-2"
          >
            <Linkedin size={24} />
          </a>
          <a href="mailto:contact@example.com" className="text-white/60 hover:text-white transition-colors p-2">
            <Mail size={24} />
          </a>
        </div>

        <button
          onClick={() => scrollToSection("#about")}
          className="text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  )
}
