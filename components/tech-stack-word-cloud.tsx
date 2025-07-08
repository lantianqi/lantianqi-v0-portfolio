"use client"

import type React from "react"
import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/contexts/language-context"

// Dynamic import to prevent SSR issues
const ReactWordcloud = dynamic(() => import("react-wordcloud"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
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

const TechStackWordCloud: React.FC = () => {
  const { language, translations } = useLanguage()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Sample skills data - replace with your actual skills
  const skills: Skill[] = [
    { name: "React", proficiency: 5, type: "Frontend" },
    { name: "TypeScript", proficiency: 5, type: "Languages" },
    { name: "Next.js", proficiency: 4, type: "Frontend" },
    { name: "Node.js", proficiency: 4, type: "Backend" },
    { name: "Python", proficiency: 4, type: "Languages" },
    { name: "JavaScript", proficiency: 5, type: "Languages" },
    { name: "PostgreSQL", proficiency: 4, type: "Database" },
    { name: "MongoDB", proficiency: 3, type: "Database" },
    { name: "Docker", proficiency: 3, type: "DevOps" },
    { name: "AWS", proficiency: 3, type: "DevOps" },
    { name: "Vue.js", proficiency: 3, type: "Frontend" },
    { name: "Express.js", proficiency: 4, type: "Backend" },
    { name: "GraphQL", proficiency: 3, type: "Backend" },
    { name: "Redis", proficiency: 3, type: "Database" },
    { name: "Kubernetes", proficiency: 2, type: "DevOps" },
    { name: "React Native", proficiency: 3, type: "Mobile" },
    { name: "Flutter", proficiency: 2, type: "Mobile" },
    { name: "Git", proficiency: 5, type: "Tools" },
    { name: "Webpack", proficiency: 3, type: "Tools" },
    { name: "Jest", proficiency: 4, type: "Tools" },
  ]

  const skillTypes = Array.from(new Set(skills.map((skill) => skill.type)))

  const filteredSkills = useMemo(() => {
    if (selectedTypes.length === 0) return skills
    return skills.filter((skill) => selectedTypes.includes(skill.type))
  }, [selectedTypes])

  const words: WordCloudWord[] = useMemo(() => {
    return filteredSkills.map((skill) => ({
      text: skill.name,
      value: Math.max(10, skill.proficiency * 15), // Ensure minimum value and scale
    }))
  }, [filteredSkills])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Frontend: "#3B82F6",
      Backend: "#10B981",
      Database: "#F59E0B",
      DevOps: "#EF4444",
      Mobile: "#8B5CF6",
      Languages: "#06B6D4",
      Tools: "#F97316",
    }
    return colors[type] || "#6B7280"
  }

  const wordCloudOptions = {
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316"],
    enableTooltip: true,
    deterministic: true,
    fontFamily: "Inter, sans-serif",
    fontSizes: [16, 60] as [number, number],
    fontStyle: "normal" as const,
    fontWeight: "normal" as const,
    padding: 8,
    rotations: 0,
    rotationAngles: [0, 0] as [number, number],
    scale: "sqrt" as const,
    spiral: "archimedean" as const,
    transitionDuration: 500,
  }

  // Handle empty data
  if (!words || words.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center text-gray-400">
          <p>{translations.techStack?.noSkills || "No skills to display"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">{translations.techStack?.title || "Technical Skills"}</h3>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skillTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeToggle(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTypes.includes(type) ? "text-white shadow-lg" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
              style={{
                backgroundColor: selectedTypes.includes(type) ? getTypeColor(type) : undefined,
              }}
            >
              {type}
            </button>
          ))}
          {selectedTypes.length > 0 && (
            <button
              onClick={() => setSelectedTypes([])}
              className="px-3 py-1 rounded-full text-sm font-medium bg-gray-600 text-white hover:bg-gray-500 transition-colors"
            >
              {translations.techStack?.clearFilters || "Clear All"}
            </button>
          )}
        </div>

        {/* Skills Counter */}
        <p className="text-sm text-gray-400 mb-4">
          {translations.techStack?.showingSkills || "Showing"} {filteredSkills.length}{" "}
          {translations.techStack?.of || "of"} {skills.length} {translations.techStack?.skills || "skills"}
        </p>
      </div>

      {/* Word Cloud */}
      <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div style={{ height: "400px", width: "100%" }}>
          <ReactWordcloud words={words} options={wordCloudOptions} />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {skillTypes.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTypeColor(type) }} />
            <span className="text-sm text-gray-300">{type}</span>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        {translations.techStack?.instruction || "Click on categories above to filter skills"}
      </p>
    </div>
  )
}

export default TechStackWordCloud
