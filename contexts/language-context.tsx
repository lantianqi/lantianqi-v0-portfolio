"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "zh"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.greeting": "Hello, I'm",
    "hero.name": "Lantianqi",
    "hero.title": "Full Stack Developer",
    "hero.subtitle": "Passionate about creating innovative web solutions",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Get In Touch",
    "about.title": "About Me",
    "about.description":
      "I am a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.",
    "about.skills.title": "Technical Skills",
    "about.skills.all": "All Skills",
    "about.skills.frontend": "Frontend",
    "about.skills.backend": "Backend",
    "about.skills.database": "Database",
    "about.skills.devops": "DevOps",
    "about.skills.mobile": "Mobile",
    "about.skills.tools": "Tools",
    "about.skills.languages": "Languages",
    "about.skills.showing": "Showing",
    "about.skills.of": "of",
    "about.skills.skills": "skills",
    "projects.title": "Projects",
    "projects.description": "Here are some of my recent projects",
    "contact.title": "Get In Touch",
    "contact.description": "Let's work together on your next project",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
  },
  zh: {
    "nav.portfolio": "作品集",
    "nav.about": "关于我",
    "nav.projects": "项目",
    "nav.contact": "联系我",
    "hero.greeting": "你好，我是",
    "hero.name": "蓝天琦",
    "hero.title": "全栈开发工程师",
    "hero.subtitle": "热衷于创造创新的网络解决方案",
    "hero.cta.projects": "查看项目",
    "hero.cta.contact": "联系我",
    "about.title": "关于我",
    "about.description":
      "我是一名充满激情的全栈开发工程师，精通现代网络技术。我热爱创建高效、可扩展且用户友好的应用程序。",
    "about.skills.title": "技术技能",
    "about.skills.all": "所有技能",
    "about.skills.frontend": "前端",
    "about.skills.backend": "后端",
    "about.skills.database": "数据库",
    "about.skills.devops": "运维",
    "about.skills.mobile": "移动端",
    "about.skills.tools": "工具",
    "about.skills.languages": "编程语言",
    "about.skills.showing": "显示",
    "about.skills.of": "共",
    "about.skills.skills": "项技能",
    "projects.title": "项目展示",
    "projects.description": "这里是我最近的一些项目",
    "contact.title": "联系我",
    "contact.description": "让我们一起合作您的下一个项目",
    "contact.email": "邮箱",
    "contact.phone": "电话",
    "contact.location": "位置",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
