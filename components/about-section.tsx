"use client"

import { useLanguage } from "@/contexts/language-context"
import TechStackWordCloud from "./tech-stack-word-cloud"

export default function AboutSection() {
  const { t } = useLanguage()

  // Sample skills data - you can replace this with your actual skills
  const skills = [
    // Frontend
    { name: "React", proficiency: 5, type: "Frontend" },
    { name: "Next.js", proficiency: 5, type: "Frontend" },
    { name: "TypeScript", proficiency: 4, type: "Frontend" },
    { name: "JavaScript", proficiency: 5, type: "Frontend" },
    { name: "HTML5", proficiency: 5, type: "Frontend" },
    { name: "CSS3", proficiency: 5, type: "Frontend" },
    { name: "Tailwind CSS", proficiency: 5, type: "Frontend" },
    { name: "Vue.js", proficiency: 3, type: "Frontend" },
    { name: "Angular", proficiency: 2, type: "Frontend" },

    // Backend
    { name: "Node.js", proficiency: 4, type: "Backend" },
    { name: "Express.js", proficiency: 4, type: "Backend" },
    { name: "Python", proficiency: 4, type: "Backend" },
    { name: "Django", proficiency: 3, type: "Backend" },
    { name: "FastAPI", proficiency: 3, type: "Backend" },
    { name: "PHP", proficiency: 3, type: "Backend" },
    { name: "Laravel", proficiency: 3, type: "Backend" },

    // Database
    { name: "PostgreSQL", proficiency: 4, type: "Database" },
    { name: "MySQL", proficiency: 4, type: "Database" },
    { name: "MongoDB", proficiency: 3, type: "Database" },
    { name: "Redis", proficiency: 3, type: "Database" },
    { name: "SQLite", proficiency: 4, type: "Database" },

    // DevOps
    { name: "Docker", proficiency: 4, type: "DevOps" },
    { name: "AWS", proficiency: 3, type: "DevOps" },
    { name: "Vercel", proficiency: 5, type: "DevOps" },
    { name: "Netlify", proficiency: 4, type: "DevOps" },
    { name: "GitHub Actions", proficiency: 3, type: "DevOps" },
    { name: "Nginx", proficiency: 3, type: "DevOps" },

    // Mobile
    { name: "React Native", proficiency: 3, type: "Mobile" },
    { name: "Flutter", proficiency: 2, type: "Mobile" },

    // Tools
    { name: "Git", proficiency: 5, type: "Tools" },
    { name: "VS Code", proficiency: 5, type: "Tools" },
    { name: "Figma", proficiency: 4, type: "Tools" },
    { name: "Postman", proficiency: 4, type: "Tools" },
    { name: "Webpack", proficiency: 3, type: "Tools" },
    { name: "Vite", proficiency: 4, type: "Tools" },

    // Languages
    { name: "Java", proficiency: 3, type: "Languages" },
    { name: "C++", proficiency: 2, type: "Languages" },
    { name: "Go", proficiency: 2, type: "Languages" },
    { name: "Rust", proficiency: 1, type: "Languages" },
  ]

  return (
    <section id="about" className="min-h-screen py-20 bg-black/20 backdrop-blur-sm flex items-center">
      <div className="container mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">{t("about.title")}</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">{t("about.description")}</p>
        </div>

        {/* Tech Stack Word Cloud */}
        <div className="mt-16">
          <TechStackWordCloud skills={skills} />
        </div>
      </div>
    </section>
  )
}
