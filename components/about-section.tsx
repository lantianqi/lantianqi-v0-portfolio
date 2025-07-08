"use client"

import { useLanguage } from "@/contexts/language-context"
import TechStackWordCloud from "./tech-stack-word-cloud"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">{t("about.title")}</h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">{t("about.description")}</p>
        </div>

        {/* Tech Stack Word Cloud */}
        <div className="mt-16">
          <TechStackWordCloud />
        </div>
      </div>
    </section>
  )
}
