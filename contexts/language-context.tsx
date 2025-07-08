"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

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

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
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
