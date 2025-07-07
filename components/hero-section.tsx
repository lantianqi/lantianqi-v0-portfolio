"use client"

import "./hero-section.css"
import { useLanguage } from "@/contexts/language-context"
import HandwrittenName from "@/components/handwritten-name"
import CTAButtons from "@/components/cta-buttons"
import ScrollIndicator from "@/components/scroll-indicator"
import BackgroundAnimation from "@/components/background-animation"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="hero-section">
      <BackgroundAnimation />
      <div className="hero-content">
        <h1 className="hero-title">{t("hero.greeting")}</h1>
        <div className="hero-handwritten-name">
          <HandwrittenName />
        </div>
        <h2 className="hero-subtitle">{t("hero.title")}</h2>
        <p className="hero-description">{t("hero.description")}</p>
        <CTAButtons />
      </div>
      <ScrollIndicator />
    </section>
  )
}
