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

    // Hero Section
    "hero.greeting": "Hello, I'm",
    "hero.title": "Full Stack Developer",
    "hero.subtitle": "Passionate about creating innovative web solutions",
    "hero.cta.projects": "View My Work",
    "hero.cta.contact": "Get In Touch",

    // About Section
    "about.title": "About Me",
    "about.description":
      "I am a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications that solve real-world problems.",
    "about.skills": "Technical Skills",

    // Tech Stack
    "techStack.filterByType": "Filter by Technology Type",
    "techStack.clearFilters": "Clear All",
    "techStack.showingAll": "Showing all {count} skills",
    "techStack.showingFiltered": "Showing {count} of {total} skills",
    "techStack.noSkillsFound": "No skills found for selected filters",
    "techStack.proficiency": "Proficiency",
    "techStack.legend": "Technology Categories",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.viewProject": "View Project",
    "projects.sourceCode": "Source Code",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.description": "I'm always interested in new opportunities and collaborations.",
    "contact.email": "Email Me",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
  },
  zh: {
    // Navigation
    "nav.about": "关于",
    "nav.projects": "项目",
    "nav.contact": "联系",

    // Hero Section
    "hero.greeting": "你好，我是",
    "hero.title": "全栈开发工程师",
    "hero.subtitle": "热衷于创建创新的网络解决方案",
    "hero.cta.projects": "查看我的作品",
    "hero.cta.contact": "联系我",

    // About Section
    "about.title": "关于我",
    "about.description":
      "我是一名充满激情的全栈开发工程师，精通现代网络技术。我喜欢创建高效、可扩展且用户友好的应用程序来解决现实世界的问题。",
    "about.skills": "技术技能",

    // Tech Stack
    "techStack.filterByType": "按技术类型筛选",
    "techStack.clearFilters": "清除所有",
    "techStack.showingAll": "显示所有 {count} 项技能",
    "techStack.showingFiltered": "显示 {count} / {total} 项技能",
    "techStack.noSkillsFound": "未找到符合筛选条件的技能",
    "techStack.proficiency": "熟练度",
    "techStack.legend": "技术分类",

    // Projects Section
    "projects.title": "精选项目",
    "projects.viewProject": "查看项目",
    "projects.sourceCode": "源代码",

    // Contact Section
    "contact.title": "联系我",
    "contact.description": "我总是对新的机会和合作感兴趣。",
    "contact.email": "发邮件",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
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
