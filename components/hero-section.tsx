"use client"

import { useLanguage } from "@/contexts/language-context"
import HandwrittenName from "./handwritten-name"
import CTAButtons from "./cta-buttons"
import SocialLinks from "./social-links"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <p className="text-xl md:text-2xl text-white/80 mb-4 animate-fade-in">{t("hero.greeting")}</p>

          {/* Name */}
          <div className="mb-6">
            <HandwrittenName />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="mb-12">
            <CTAButtons />
          </div>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}
