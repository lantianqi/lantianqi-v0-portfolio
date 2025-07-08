"use client"

import { useState, useMemo, useEffect } from "react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/contexts/language-context"

// Dynamically import ReactWordcloud to avoid SSR issues
const ReactWordcloud = dynamic(() => import("react-wordcloud"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  ),
})

interface Skill {
  name: string
  proficiency: number
  type: string
}

interface WordCloudWord {
  text: string
  value: number
}

const skillsData: Skill[] = [
  // Frontend
  { name: "React", proficiency: 5, type: "Frontend" },
  { name: "Vue.js", proficiency: 4, type: "Frontend" },
  { name: "TypeScript", proficiency: 5, type: "Frontend" },
  { name: "JavaScript", proficiency: 5, type: "Frontend" },
  { name: "HTML5", proficiency: 5, type: "Frontend" },
  { name: "CSS3", proficiency: 5, type: "Frontend" },
  { name: "Tailwind CSS", proficiency: 4, type: "Frontend" },
  { name: "Next.js", proficiency: 4, type: "Frontend" },
  { name: "Nuxt.js", proficiency: 3, type: "Frontend" },

  // Backend
  { name: "Node.js", proficiency: 5, type: "Backend" },
  { name: "Express.js", proficiency: 4, type: "Backend" },
  { name: "Python", proficiency: 4, type: "Backend" },
  { name: "Django", proficiency: 3, type: "Backend" },
  { name: "FastAPI", proficiency: 3, type: "Backend" },
  { name: "Java", proficiency: 3, type: "Backend" },
  { name: "Spring Boot", proficiency: 3, type: "Backend" },

  // Database
  { name: "MongoDB", proficiency: 4, type: "Database" },
  { name: "PostgreSQL", proficiency: 4, type: "Database" },
  { name: "MySQL", proficiency: 4, type: "Database" },
  { name: "Redis", proficiency: 3, type: "Database" },

  // DevOps
  { name: "Docker", proficiency: 4, type: "DevOps" },
  { name: "AWS", proficiency: 3, type: "DevOps" },
  { name: "Vercel", proficiency: 4, type: "DevOps" },
  { name: "Netlify", proficiency: 3, type: "DevOps" },

  // Tools
  { name: "Git", proficiency: 5, type: "Tools" },
  { name: "VS Code", proficiency: 5, type: "Tools" },
  { name: "Figma", proficiency: 3, type: "Tools" },
  { name: "Postman", proficiency: 4, type: "Tools" },
]

const skillTypes = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"]

const typeColors: { [key: string]: string } = {
  Frontend: "#3B82F6",
  Backend: "#10B981",
  Database: "#F59E0B",
  DevOps: "#EF4444",
  Tools: "#8B5CF6",
  All: "#6B7280",
}

export default function TechStackWordCloud() {
  const { t } = useLanguage()
  const [selectedType, setSelectedType] = useState("All")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredSkills = useMemo(() => {
    if (selectedType === "All") {
      return skillsData
    }
    return skillsData.filter((skill) => skill.type === selectedType)
  }, [selectedType])

  const words: WordCloudWord[] = useMemo(() => {
    if (!filteredSkills || filteredSkills.length === 0) {
      return []
    }
    return filteredSkills.map((skill) => ({
      text: skill.name,
      value: Math.max(skill.proficiency * 15, 10), // Ensure minimum size
    }))
  }, [filteredSkills])

  const options = useMemo(
    () => ({
      colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#F97316", "#06B6D4"],
      enableTooltip: true,
      deterministic: true,
      fontFamily: "Inter, sans-serif",
      fontSizes: [16, 60] as [number, number],
      fontStyle: "normal",
      fontWeight: "normal",
      padding: 8,
      rotations: 0,
      rotationAngles: [0, 0] as [number, number],
      scale: "sqrt" as const,
      spiral: "archimedean" as const,
      transitionDuration: 500,
    }),
    [],
  )

  const callbacks = useMemo(
    () => ({
      onWordClick: (word: any) => {
        console.log(`Clicked on: ${word.text}`)
      },
      onWordMouseOver: (word: any) => {
        console.log(`Hovered: ${word.text}`)
      },
    }),
    [],
  )

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
          <div className="flex items-center justify-center h-96 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  // Don't render word cloud if no words
  if (!words || words.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">{t("about.skills.title")}</h3>
          <div className="flex items-center justify-center h-96 text-white/60 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <p>No skills to display</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">{t("about.skills.title")}</h3>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skillTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedType === type
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
              style={{
                borderColor: selectedType === type ? typeColors[type] : undefined,
                backgroundColor: selectedType === type ? `${typeColors[type]}20` : undefined,
              }}
            >
              {type === "All" ? "All Skills" : type}
            </button>
          ))}
        </div>

        {/* Skills Count */}
        <p className="text-white/60 text-sm mb-4">
          Showing {filteredSkills.length} of {skillsData.length} skills
        </p>
      </div>

      {/* Word Cloud */}
      <div
        className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6"
        style={{ height: "400px" }}
      >
        {words.length > 0 && <ReactWordcloud words={words} options={options} callbacks={callbacks} />}
      </div>
    </div>
  )
}
