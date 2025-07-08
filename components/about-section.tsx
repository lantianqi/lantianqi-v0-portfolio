"use client"

import { useLanguage } from "@/contexts/language-context"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("about.title")}</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{t("about.description")}</p>
        </div>
      </div>
    </section>
  )
}
