"use client"

import "./about-section.css"
import { useLanguage } from "@/contexts/language-context"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">{t("about.title")}</h2>
        <p className="about-description">{t("about.description")}</p>
      </div>
    </section>
  )
}
