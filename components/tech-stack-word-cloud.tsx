"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/contexts/language-context"

interface Skill {
  name: string
  proficiency: number // 1-5 scale
  type: string
  color?: string
}

interface TechStackWordCloudProps {
  skills: Skill[]
}

export default function TechStackWordCloud({ skills }: TechStackWordCloudProps) {
  const { t } = useLanguage()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Get unique skill types
  const skillTypes = useMemo(() => {
    const types = Array.from(new Set(skills.map((skill) => skill.type)))
    return types
  }, [skills])

  // Filter skills based on selected types
  const filteredSkills = useMemo(() => {
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

  // Generate word cloud positions and sizes
  const wordCloudItems = useMemo(() => {
    return filteredSkills.map((skill, index) => {
      // Size based on proficiency (1-5 scale to 0.8-2.5 scale)
      const sizeScale = 0.8 + (skill.proficiency - 1) * 0.425

      // Generate pseudo-random positions for word cloud effect
      const angle = (index * 137.5) % 360 // Golden angle for better distribution
      const radius = 20 + (index % 8) * 15
      const x = Math.cos((angle * Math.PI) / 180) * radius
      const y = Math.sin((angle * Math.PI) / 180) * radius

      // Color based on type
      const colors = {
        Frontend: "text-blue-400",
        Backend: "text-green-400",
        Database: "text-purple-400",
        DevOps: "text-orange-400",
        Mobile: "text-pink-400",
        Tools: "text-yellow-400",
        Languages: "text-red-400",
      }

      return {
        ...skill,
        x,
        y,
        scale: sizeScale,
        colorClass: colors[skill.type as keyof typeof colors] || "text-gray-400",
      }
    })
  }, [filteredSkills])

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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {wordCloudItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="absolute transition-all duration-500 ease-out cursor-pointer hover:scale-110"
                style={{
                  left: `calc(50% + ${item.x}px)`,
                  top: `calc(50% + ${item.y}px)`,
                  transform: `translate(-50%, -50%) scale(${item.scale})`,
                  fontSize: `${16 + item.proficiency * 4}px`,
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span
                  className={`font-bold ${item.colorClass} hover:text-white transition-colors duration-200 whitespace-nowrap select-none`}
                  title={`${item.name} - ${t("techStack.proficiency")}: ${item.proficiency}/5`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
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
              Frontend: "text-blue-400",
              Backend: "text-green-400",
              Database: "text-purple-400",
              DevOps: "text-orange-400",
              Mobile: "text-pink-400",
              Tools: "text-yellow-400",
              Languages: "text-red-400",
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
    </div>
  )
}
