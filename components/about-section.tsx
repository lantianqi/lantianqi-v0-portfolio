"use client"

import { useLanguage } from "@/contexts/language-context"
import TechStackWordCloud from "./tech-stack-word-cloud"

// Sample skills data - replace with your actual skills
const sampleSkills = [
  { name: "React", proficiency: 5, type: "Frontend" },
  { name: "Next.js", proficiency: 5, type: "Frontend" },
  { name: "TypeScript", proficiency: 4, type: "Languages" },
  { name: "JavaScript", proficiency: 5, type: "Languages" },
  { name: "Node.js", proficiency: 4, type: "Backend" },
  { name: "Python", proficiency: 4, type: "Languages" },
  { name: "PostgreSQL", proficiency: 4, type: "Database" },
  { name: "MongoDB", proficiency: 3, type: "Database" },
  { name: "Docker", proficiency: 3, type: "DevOps" },
  { name: "AWS", proficiency: 3, type: "DevOps" },
  { name: "Git", proficiency: 5, type: "Tools" },
  { name: "Tailwind CSS", proficiency: 5, type: "Frontend" },
  { name: "Vue.js", proficiency: 3, type: "Frontend" },
  { name: "Express.js", proficiency: 4, type: "Backend" },
  { name: "GraphQL", proficiency: 3, type: "Backend" },
  { name: "React Native", proficiency: 3, type: "Mobile" },
  { name: "Flutter", proficiency: 2, type: "Mobile" },
  { name: "Redis", proficiency: 3, type: "Database" },
  { name: "Kubernetes", proficiency: 2, type: "DevOps" },
  { name: "Figma", proficiency: 4, type: "Tools" },
]

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("about.title")}</h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">{t("about.description")}</p>

          {/* Tech Stack Word Cloud */}
          <div className="mt-16">
            <TechStackWordCloud skills={sampleSkills} />
          </div>
        </div>
      </div>
    </section>
  )
}
