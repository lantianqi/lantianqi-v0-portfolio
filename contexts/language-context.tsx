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
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Lantianqi",
      title: "Full Stack Developer",
      subtitle: "Passionate about creating innovative web solutions and bringing ideas to life through code.",
      cta: {
        viewWork: "View My Work",
        getInTouch: "Get In Touch",
      },
    },
    about: {
      title: "About Me",
      description:
        "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable solutions and am always eager to learn new technologies and tackle challenging problems.",
    },
    techStack: {
      filterByType: "Filter by Technology Type",
      clearFilters: "Clear All",
      showingAll: "Showing all {count} skills",
      showingFiltered: "Showing {count} of {total} skills",
      noSkillsFound: "No skills found for selected filters",
      legend: "Technology Categories",
      proficiency: "Proficiency",
    },
    projects: {
      title: "Featured Projects",
      viewProject: "View Project",
      viewCode: "View Code",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's work together on your next project",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        send: "Send Message",
      },
      info: {
        email: "Email",
        phone: "Phone",
        location: "Location",
      },
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
      name: "蓝天琦",
      title: "全栈开发工程师",
      subtitle: "热衷于创建创新的网络解决方案，通过代码将想法变为现实。",
      cta: {
        viewWork: "查看作品",
        getInTouch: "联系我",
      },
    },
    about: {
      title: "关于我",
      description:
        "我是一名充满激情的全栈开发工程师，精通现代网络技术。我喜欢创建高效、可扩展的解决方案，并且总是渴望学习新技术和解决具有挑战性的问题。",
    },
    techStack: {
      filterByType: "按技术类型筛选",
      clearFilters: "清除所有",
      showingAll: "显示所有 {count} 项技能",
      showingFiltered: "显示 {count} / {total} 项技能",
      noSkillsFound: "未找到符合筛选条件的技能",
      legend: "技术分类",
      proficiency: "熟练度",
    },
    projects: {
      title: "精选项目",
      viewProject: "查看项目",
      viewCode: "查看代码",
    },
    contact: {
      title: "联系我",
      subtitle: "让我们一起合作您的下一个项目",
      form: {
        name: "您的姓名",
        email: "您的邮箱",
        message: "您的留言",
        send: "发送消息",
      },
      info: {
        email: "邮箱",
        phone: "电话",
        location: "位置",
      },
    },
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string, params?: Record<string, any>) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    if (typeof value !== "string") {
      return key // Return key if translation not found
    }

    // Replace parameters in the translation
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
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
