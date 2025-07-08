"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "zh"

interface Translations {
  nav: {
    home: string
    about: string
    projects: string
    contact: string
  }
  hero: {
    greeting: string
    name: string
    title: string
    description: string
    downloadCV: string
    contactMe: string
  }
  about: {
    title: string
    description: string
  }
  projects: {
    title: string
    viewProject: string
    sourceCode: string
  }
  contact: {
    title: string
    description: string
    name: string
    email: string
    message: string
    send: string
  }
  techStack: {
    title: string
    noSkills: string
    clearFilters: string
    showingSkills: string
    of: string
    skills: string
    instruction: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Lantianqi",
      title: "Full Stack Developer",
      description: "I create beautiful and functional web applications with modern technologies.",
      downloadCV: "Download CV",
      contactMe: "Contact Me",
    },
    about: {
      title: "About Me",
      description:
        "I am a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.",
    },
    projects: {
      title: "My Projects",
      viewProject: "View Project",
      sourceCode: "Source Code",
    },
    contact: {
      title: "Get In Touch",
      description: "Feel free to reach out to me for any inquiries or collaboration opportunities.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
    },
    techStack: {
      title: "Technical Skills",
      noSkills: "No skills to display",
      clearFilters: "Clear All",
      showingSkills: "Showing",
      of: "of",
      skills: "skills",
      instruction: "Click on categories above to filter skills",
    },
  },
  zh: {
    nav: {
      home: "首页",
      about: "关于",
      projects: "项目",
      contact: "联系",
    },
    hero: {
      greeting: "你好，我是",
      name: "蓝天奇",
      title: "全栈开发工程师",
      description: "我使用现代技术创建美观且功能强大的网络应用程序。",
      downloadCV: "下载简历",
      contactMe: "联系我",
    },
    about: {
      title: "关于我",
      description: "我是一名充满激情的全栈开发工程师，专精于现代网络技术。我热爱创建高效、可扩展且用户友好的应用程序。",
    },
    projects: {
      title: "我的项目",
      viewProject: "查看项目",
      sourceCode: "源代码",
    },
    contact: {
      title: "联系我",
      description: "如有任何咨询或合作机会，请随时与我联系。",
      name: "姓名",
      email: "邮箱",
      message: "消息",
      send: "发送消息",
    },
    techStack: {
      title: "技术技能",
      noSkills: "没有技能可显示",
      clearFilters: "清除所有",
      showingSkills: "显示",
      of: "共",
      skills: "项技能",
      instruction: "点击上方类别来筛选技能",
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const value = {
    language,
    setLanguage,
    translations: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
