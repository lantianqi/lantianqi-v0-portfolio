"use client"

import { useLanguage } from "@/contexts/language-context"

export default function ProjectsSection() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="min-h-screen py-20 flex items-center">
      <div className="container mx-auto px-6 text-center w-full">
        <h2 className="text-4xl font-bold text-white mb-12">{t("projects.title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("projects.project")} {i}
              </h3>
              <p className="text-white/70">{t("projects.description")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
