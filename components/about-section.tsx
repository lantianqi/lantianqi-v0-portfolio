"use client"

import { useLanguage } from "@/contexts/language-context"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="min-h-screen py-20 bg-black/20 backdrop-blur-sm flex items-center">
      <div className="container mx-auto px-6 text-center w-full">
        <h2 className="text-4xl font-bold text-white mb-8">{t("about.title")}</h2>
        <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">{t("about.description")}</p>
      </div>
    </section>
  )
}
