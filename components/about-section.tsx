"use client"

import { useLanguage } from "@/contexts/language-context"
import TechStackWordCloud from "./tech-stack-word-cloud"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("about.title")}</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{t("about.description")}</p>
        </div>

        {/* Tech Stack Word Cloud */}
        <div className="mt-16">
          <TechStackWordCloud />
        </div>
      </div>
    </section>
  )
}
