"use client"

import "./projects-section.css"
import { useLanguage } from "@/contexts/language-context"

export default function ProjectsSection() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">{t("projects.title")}</h2>
        <div className="projects-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="project-card">
              <div className="project-image"></div>
              <h3 className="project-title">
                {t("projects.project")} {i}
              </h3>
              <p className="project-description">{t("projects.description")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
