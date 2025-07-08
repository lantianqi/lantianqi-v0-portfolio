"use client"

import { useState, useMemo, useRef, useEffect } from "react"
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

interface WordCloudItem {
  name: string
  proficiency: number
  type: string
  x: number
  y: number
  width: number
  height: number
  scale: number
  colorClass: string
  fontSize: number
}

export default function TechStackWordCloud({ skills }: TechStackWordCloudProps) {
  const { t } = useLanguage()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 400 })

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

  // Update container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Collision detection function
  const checkCollision = (item1: WordCloudItem, item2: WordCloudItem): boolean => {
    const padding = 8 // Minimum space between words

    const left1 = item1.x - item1.width / 2 - padding
    const right1 = item1.x + item1.width / 2 + padding
    const top1 = item1.y - item1.height / 2 - padding
    const bottom1 = item1.y + item1.height / 2 + padding

    const left2 = item2.x - item2.width / 2 - padding
    const right2 = item2.x + item2.width / 2 + padding
    const top2 = item2.y - item2.height / 2 - padding
    const bottom2 = item2.y + item2.height / 2 + padding

    return !(right1 < left2 || left1 > right2 || bottom1 < top2 || top1 > bottom2)
  }

  // Check if item is within container bounds
  const isWithinBounds = (item: WordCloudItem): boolean => {
    const margin = 20
    const left = item.x - item.width / 2
    const right = item.x + item.width / 2
    const top = item.y - item.height / 2
    const bottom = item.y + item.height / 2

    return (
      left >= margin &&
      right <= containerDimensions.width - margin &&
      top >= margin &&
      bottom <= containerDimensions.height - margin
    )
  }

  // Find non-overlapping position using spiral algorithm
  const findNonOverlappingPosition = (
    item: WordCloudItem,
    placedItems: WordCloudItem[],
    centerX: number,
    centerY: number,
  ): { x: number; y: number } => {
    const maxAttempts = 500
    const spiralStep = 5
    let angle = 0
    let radius = 0

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      const testItem = { ...item, x, y }

      // Check if position is within bounds and doesn't collide
      if (isWithinBounds(testItem) && !placedItems.some((placedItem) => checkCollision(testItem, placedItem))) {
        return { x, y }
      }

      // Update spiral parameters
      angle += 0.5
      radius += spiralStep * 0.1
    }

    // Fallback to original position if no suitable position found
    return { x: centerX, y: centerY }
  }

  // Generate word cloud with collision detection
  const wordCloudItems = useMemo(() => {
    const centerX = containerDimensions.width / 2
    const centerY = containerDimensions.height / 2
    const placedItems: WordCloudItem[] = []

    // Color mapping
    const colors = {
      Frontend: "text-blue-400",
      Backend: "text-green-400",
      Database: "text-purple-400",
      DevOps: "text-orange-400",
      Mobile: "text-pink-400",
      Tools: "text-yellow-400",
      Languages: "text-red-400",
    }

    // Sort skills by proficiency (highest first) for better placement
    const sortedSkills = [...filteredSkills].sort((a, b) => b.proficiency - a.proficiency)

    sortedSkills.forEach((skill, index) => {
      // Calculate size based on proficiency
      const sizeScale = 0.8 + (skill.proficiency - 1) * 0.4
      const fontSize = 14 + skill.proficiency * 6

      // Estimate text dimensions (approximate)
      const charWidth = fontSize * 0.6
      const estimatedWidth = skill.name.length * charWidth * sizeScale
      const estimatedHeight = fontSize * sizeScale * 1.2

      // Initial position attempt (center for first item, then spiral outward)
      let initialX = centerX
      let initialY = centerY

      if (index > 0) {
        // Use golden angle for better distribution
        const angle = (index * 137.5) % 360
        const radius = Math.min(50 + index * 8, Math.min(containerDimensions.width, containerDimensions.height) / 3)
        initialX = centerX + Math.cos((angle * Math.PI) / 180) * radius
        initialY = centerY + Math.sin((angle * Math.PI) / 180) * radius
      }

      const initialItem: WordCloudItem = {
        name: skill.name,
        proficiency: skill.proficiency,
        type: skill.type,
        x: initialX,
        y: initialY,
        width: estimatedWidth,
        height: estimatedHeight,
        scale: sizeScale,
        fontSize,
        colorClass: colors[skill.type as keyof typeof colors] || "text-gray-400",
      }

      // Find non-overlapping position
      const { x, y } = findNonOverlappingPosition(initialItem, placedItems, centerX, centerY)

      const finalItem: WordCloudItem = {
        ...initialItem,
        x,
        y,
      }

      placedItems.push(finalItem)
    })

    return placedItems
  }, [filteredSkills, containerDimensions])

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
      <div
        ref={containerRef}
        className="relative w-full h-96 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden"
      >
        <div className="absolute inset-0">
          {wordCloudItems.map((item, index) => (
            <div
              key={`${item.name}-${selectedTypes.join("-")}-${index}`}
              className="absolute transition-all duration-700 ease-out cursor-pointer hover:scale-110 hover:z-10"
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                transform: `translate(-50%, -50%) scale(${item.scale})`,
                fontSize: `${item.fontSize}px`,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span
                className={`font-bold ${item.colorClass} hover:text-white transition-colors duration-200 whitespace-nowrap select-none drop-shadow-lg`}
                title={`${item.name} - ${t("techStack.proficiency")}: ${item.proficiency}/5`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/50 text-lg">{t("techStack.noSkillsFound")}</p>
          </div>
        )}

        {/* Loading indicator for repositioning */}
        {wordCloudItems.length === 0 && filteredSkills.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/50"></div>
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
    </div>
  )
}
