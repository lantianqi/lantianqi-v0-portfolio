"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, any>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.portfolio": "lantianqi",

    // Hero Section
    "hero.subtitle": "Full Stack Developer & Creative Problem Solver",
    "hero.viewWork": "View My Work",
    "hero.getInTouch": "Get In Touch",

    // About Section
    "about.title": "About Me",
    "about.description":
      "I'm a passionate developer who loves creating beautiful, functional, and user-friendly applications. With expertise in modern web technologies, I bring ideas to life through clean code and innovative solutions.",
    "about.skills": "Technical Skills",

    // Tech Stack
    "techStack.filterByType": "Filter by Technology Type",
    "techStack.clearFilters": "Clear All",
    "techStack.showingAll": "Showing all {count} skills",
    "techStack.showingFiltered": "Showing {count} of {total} skills",
    "techStack.noSkillsFound": "No skills found for selected filters",
    "techStack.proficiency": "Proficiency",
    "techStack.legend": "Technology Categories",
    "techStack.instructions": "Hover over words for details • Click to interact",
    "techStack.sizeNote": "Word size reflects proficiency level",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.project": "Project",
    "projects.description": "A brief description of this amazing project and the technologies used.",

    // Contact Section
    "contact.title": "Let's Work Together",
    "contact.description":
      "Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.",
    "contact.startConversation": "Start a Conversation",

    // Language Switcher
    "lang.english": "English",
    "lang.chinese": "中文",
  },
  zh: {
    // Navigation
    "nav.about": "关于",
    "nav.projects": "项目",
    "nav.contact": "联系",
    "nav.portfolio": "lantianqi",

    // Hero Section
    "hero.subtitle": "全栈开发者 & 创意问题解决者",
    "hero.viewWork": "查看作品",
    "hero.getInTouch": "联系我",

    // About Section
    "about.title": "关于我",
    "about.description":
      "我是一名充满热情的开发者，热爱创造美观、实用且用户友好的应用程序。凭借在现代网络技术方面的专业知识，我通过简洁的代码和创新的解决方案将想法变为现实。",
    "about.skills": "技术技能",

    // Tech Stack
    "techStack.filterByType": "按技术类型筛选",
    "techStack.clearFilters": "清除所有",
    "techStack.showingAll": "显示所有 {count} 项技能",
    "techStack.showingFiltered": "显示 {count} / {total} 项技能",
    "techStack.noSkillsFound": "未找到符合筛选条件的技能",
    "techStack.proficiency": "熟练度",
    "techStack.legend": "技术分类",
    "techStack.instructions": "悬停查看详情 • 点击交互",
    "techStack.sizeNote": "词汇大小反映熟练程度",

    // Projects Section
    "projects.title": "精选项目",
    "projects.project": "项目",
    "projects.description": "这个精彩项目的简要描述以及所使用的技术。",

    // Contact Section
    "contact.title": "让我们合作吧",
    "contact.description": "有项目想法吗？我很乐意了解并讨论如何将您的想法变为现实。",
    "contact.startConversation": "开始对话",

    // Language Switcher
    "lang.english": "English",
    "lang.chinese": "中文",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string, params?: Record<string, any>): string => {
    let translation = translations[language][key as keyof (typeof translations)[typeof language]] || key

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value))
      })
    }

    return translation
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
