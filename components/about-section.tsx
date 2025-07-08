"use client"

import { useLanguage } from "@/contexts/language-context"
import TechStackWordCloud from "./tech-stack-word-cloud"

export default function AboutSection() {
  const { translations } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{translations.about.title}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">{translations.about.description}</p>
        </div>

        {/* Tech Stack Word Cloud */}
        <div className="mt-16">
          <TechStackWordCloud />
        </div>
      </div>
    </section>
  )
}
