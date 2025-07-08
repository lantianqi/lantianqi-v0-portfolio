"use client"

import { useState, useMemo, useCallback } from "react"
import { useLanguage } from "@/contexts/language-context"
import dynamic from "next/dynamic"

// Dynamically import ReactWordcloud to avoid SSR issues
const ReactWordcloud = dynamic(() => import("react-wordcloud"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/50"></div>
    </div>
  ),
})

interface Skill {
  name: string
  proficiency: number // 1-5 scale
  type: string
  color?: string
}

interface TechStackWordCloudProps {
  skills: Skill[]
}

interface WordCloudWord {
  text: string
  value: number
  type?: string
  proficiency?: number
}

export default function TechStackWordCloud({ skills }: TechStackWordCloudProps) {
  const { t } = useLanguage()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Get unique skill types
  const skillTypes = useMemo(() => {
    if (!skills || skills.length === 0) return []
    const types = Array.from(new Set(skills.map((skill) => skill.type)))
    return types
  }, [skills])

  // Filter skills based on selected types
  const filteredSkills = useMemo(() => {
    if (!skills || skills.length === 0) return []
    if (selectedTypes.length === 0) return skills
    return skills.filter((skill) => selectedTypes.includes(skill.type))
  }, [skills, selectedTypes])

  // Handle type selection
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedTypes([])
  }

  // Transform skills to word cloud format
  const words: WordCloudWord[] = useMemo(() => {
    if (!filteredSkills || filteredSkills.length === 0) return []

    return filteredSkills.map((skill) => ({
      text: skill.name,
      value: Math.max(skill.proficiency * 15, 10), // Ensure minimum size and scale proficiency
      type: skill.type,
      proficiency: skill.proficiency,
    }))
  }, [filteredSkills])

  // Color function based on skill type
  const getColor = useCallback((word: WordCloudWord) => {
    const colors = {
      Frontend: "#60A5FA", // blue-400
      Backend: "#4ADE80", // green-400
      Database: "#A78BFA", // purple-400
      DevOps: "#FB923C", // orange-400
      Mobile: "#F472B6", // pink-400
      Tools: "#FBBF24", // yellow-400
      Languages: "#F87171", // red-400
    }
    return colors[word.type as keyof typeof colors] || "#9CA3AF" // gray-400
  }, [])

  // Word cloud options
  const options = useMemo(
    () => ({
      colors: [getColor],
      enableTooltip: true,
      deterministic: true,
      fontFamily: "Inter, system-ui, sans-serif",
      fontSizes: [14, 48] as [number, number],
      fontStyle: "normal",
      fontWeight: "bold",
      padding: 6,
      rotations: 1,
      rotationAngles: [0] as [number],
      scale: "sqrt" as const,
      spiral: "archimedean" as const,
      transitionDuration: 300,
    }),
    [getColor],
  )

  // Tooltip callback
  const getWordTooltip = useCallback(
    (word: WordCloudWord) => {
      return `${word.text} - ${t("techStack.proficiency")}: ${word.proficiency}/5 (${word.type})`
    },
    [t],
  )

  // Word click callback
  const onWordClick = useCallback((word: WordCloudWord) => {
    console.log(`Clicked on ${word.text}`)
  }, [])

  // Early return if no skills
  if (!skills || skills.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full h-96 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/50 text-lg">{t("techStack.noSkillsFound")}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Filter Controls */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">{t("techStack.filterByType")}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skillTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTypes.includes(type)
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {type}
            </button>
          ))}
          {selectedTypes.length > 0 && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-200"
            >
              {t("techStack.clearFilters")}
            </button>
          )}
        </div>
        <p className="text-white/60 text-sm">
          {selectedTypes.length === 0
            ? t("techStack.showingAll", { count: skills.length })
            : t("techStack.showingFiltered", { count: filteredSkills.length, total: skills.length })}
        </p>
      </div>

      {/* Word Cloud */}
      <div className="relative w-full h-96 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
        {words && words.length > 0 ? (
          <div className="w-full h-full p-4">
            <ReactWordcloud
              words={words}
              options={options}
              callbacks={{
                getWordTooltip,
                onWordClick,
              }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/50 text-lg">{t("techStack.noSkillsFound")}</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm mb-2">{t("techStack.legend")}</p>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          {skillTypes.map((type) => {
            const colors = {
              Frontend: "bg-blue-400",
              Backend: "bg-green-400",
              Database: "bg-purple-400",
              DevOps: "bg-orange-400",
              Mobile: "bg-pink-400",
              Tools: "bg-yellow-400",
              Languages: "bg-red-400",
            }
            return (
              <div key={type} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${colors[type as keyof typeof colors] || "bg-gray-400"}`} />
                <span className="text-white/70">{type}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-white/50 text-xs">
          {t("techStack.instructions")} • {t("techStack.sizeNote")}
        </p>
      </div>
    </div>
  )
}
