"use client"

import { useLanguage } from "@/contexts/language-context"
import TechStackWordCloud from "./tech-stack-word-cloud"

const skillsData = [
  // Frontend
  { name: "React", proficiency: 5, type: "Frontend" },
  { name: "Next.js", proficiency: 5, type: "Frontend" },
  { name: "TypeScript", proficiency: 4, type: "Frontend" },
  { name: "JavaScript", proficiency: 5, type: "Frontend" },
  { name: "HTML5", proficiency: 5, type: "Frontend" },
  { name: "CSS3", proficiency: 5, type: "Frontend" },
  { name: "Tailwind CSS", proficiency: 4, type: "Frontend" },
  { name: "Vue.js", proficiency: 3, type: "Frontend" },
  { name: "Angular", proficiency: 3, type: "Frontend" },
  { name: "Sass", proficiency: 4, type: "Frontend" },

  // Backend
  { name: "Node.js", proficiency: 4, type: "Backend" },
  { name: "Express.js", proficiency: 4, type: "Backend" },
  { name: "Python", proficiency: 4, type: "Backend" },
  { name: "Django", proficiency: 3, type: "Backend" },
  { name: "FastAPI", proficiency: 3, type: "Backend" },
  { name: "Java", proficiency: 3, type: "Backend" },
  { name: "Spring Boot", proficiency: 3, type: "Backend" },
  { name: "PHP", proficiency: 3, type: "Backend" },

  // Database
  { name: "PostgreSQL", proficiency: 4, type: "Database" },
  { name: "MongoDB", proficiency: 4, type: "Database" },
  { name: "MySQL", proficiency: 4, type: "Database" },
  { name: "Redis", proficiency: 3, type: "Database" },
  { name: "Supabase", proficiency: 4, type: "Database" },
  { name: "Firebase", proficiency: 3, type: "Database" },

  // DevOps
  { name: "Docker", proficiency: 4, type: "DevOps" },
  { name: "AWS", proficiency: 3, type: "DevOps" },
  { name: "Vercel", proficiency: 4, type: "DevOps" },
  { name: "GitHub Actions", proficiency: 3, type: "DevOps" },
  { name: "Nginx", proficiency: 3, type: "DevOps" },
  { name: "Kubernetes", proficiency: 2, type: "DevOps" },

  // Mobile
  { name: "React Native", proficiency: 3, type: "Mobile" },
  { name: "Flutter", proficiency: 2, type: "Mobile" },
  { name: "Expo", proficiency: 3, type: "Mobile" },

  // Tools
  { name: "Git", proficiency: 5, type: "Tools" },
  { name: "VS Code", proficiency: 5, type: "Tools" },
  { name: "Figma", proficiency: 3, type: "Tools" },
  { name: "Postman", proficiency: 4, type: "Tools" },
  { name: "Webpack", proficiency: 3, type: "Tools" },
  { name: "Vite", proficiency: 4, type: "Tools" },

  // Languages
  { name: "C++", proficiency: 3, type: "Languages" },
  { name: "Go", proficiency: 2, type: "Languages" },
  { name: "Rust", proficiency: 2, type: "Languages" },
  { name: "C#", proficiency: 2, type: "Languages" },
]

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="min-h-screen py-20 bg-black/20 backdrop-blur-sm flex items-center">
      <div className="container mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">{t("about.title")}</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">{t("about.description")}</p>
        </div>

        {/* Tech Stack Word Cloud */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t("about.skills")}</h3>
          <TechStackWordCloud skills={skillsData} />
        </div>
      </div>
    </section>
  )
}
