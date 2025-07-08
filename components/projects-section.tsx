"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function ProjectsSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const images = [
    "/assets/images/project1.png",
    "/assets/images/project2.png",
    "/assets/images/project3.png",
  ]

  return (
    <section id="projects" className="min-h-screen py-20 flex items-center">
      <div className="container mx-auto px-6 text-center w-full">
      <h2 className="text-4xl font-bold text-white mb-12">{t("projects.title")}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setOpenIndex(i)}
        >
          <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={images[i - 1]}
            alt={t(`project${i}.title`)}
            className="object-cover h-full w-full"
          />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
          {t(`project${i}.title`)}
          </h3>
          <p className="text-white/70">{t(`project${i}.description`)}</p>
        </div>
        ))}
      </div>

      {/* Modal */}
      {openIndex && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpenIndex(null)}
        >
          <div
        className="bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-all duration-300 scale-105 cursor-pointer w-full max-w-md sm:max-w-lg md:max-w-xl relative flex flex-col items-center"
        style={{
          boxShadow: "0 10px 40px 0 rgba(0,0,0,0.5)",
          maxHeight: "90vh",
          overflow: "auto",
        }}
        onClick={e => e.stopPropagation()}
          >
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={() => setOpenIndex(null)}
          aria-label="Close"
        >
          ×
        </button>
        <div className="w-full flex justify-center mb-4">
          <img
            src={images[openIndex - 1]}
            alt={t(`projects.project${openIndex}.title`)}
            style={{
          maxWidth: "100%",
          maxHeight: "60vh",
          height: "auto",
          width: "auto",
          objectFit: "contain",
          borderRadius: "0.5rem",
          background: "linear-gradient(to bottom right, #a78bfa, #f472b6)",
            }}
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {t(`project${openIndex}.title`)}
        </h3>
        <p className="text-white/70">{t(`project${openIndex}.description`)}</p>
          </div>
        </div>
      )}
      </div>
    </section>
  )
}
