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
    "nav.resume": "Resume",

    // Hero Section
    "hero.greeting": "Hi, I'm",
    "hero.title": "Full Stack Developer",
    "hero.subtitle": "I create beautiful and functional web applications",
    "hero.cta.primary": "View My Work",
    "hero.cta.secondary": "Get In Touch",

    // About Section
    "about.title": "About Me",
    "about.description":
      "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications that solve real-world problems.",

    // Tech Stack
    "techStack.filterByType": "Filter by Technology Type",
    "techStack.clearFilters": "Clear All",
    "techStack.showingAll": "Showing all {count} skills",
    "techStack.showingFiltered": "Showing {count} of {total} skills",
    "techStack.noSkillsFound": "No skills found for selected filters",
    "techStack.legend": "Technology Categories",
    "techStack.proficiency": "Proficiency",
    "techStack.instructions": "Click on categories to filter • Hover for details",
    "techStack.sizeNote": "Size indicates proficiency level",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.viewAll": "View All Projects",
    "projects.demo": "Live Demo",
    "projects.code": "Source Code",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's work together on your next project",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.built": "Built with Next.js and Tailwind CSS",
  },
  zh: {
    // Navigation
    "nav.about": "关于",
    "nav.projects": "项目",
    "nav.contact": "联系",
    "nav.resume": "简历",

    // Hero Section
    "hero.greeting": "你好，我是",
    "hero.title": "全栈开发工程师",
    "hero.subtitle": "我创建美观且功能强大的网络应用程序",
    "hero.cta.primary": "查看我的作品",
    "hero.cta.secondary": "联系我",

    // About Section
    "about.title": "关于我",
    "about.description":
      "我是一名充满激情的全栈开发工程师，专精于现代网络技术。我热爱创建高效、可扩展且用户友好的应用程序来解决现实世界的问题。",

    // Tech Stack
    "techStack.filterByType": "按技术类型筛选",
    "techStack.clearFilters": "清除所有",
    "techStack.showingAll": "显示所有 {count} 项技能",
    "techStack.showingFiltered": "显示 {count} / {total} 项技能",
    "techStack.noSkillsFound": "未找到符合筛选条件的技能",
    "techStack.legend": "技术分类",
    "techStack.proficiency": "熟练度",
    "techStack.instructions": "点击分类进行筛选 • 悬停查看详情",
    "techStack.sizeNote": "大小表示熟练程度",

    // Projects Section
    "projects.title": "精选项目",
    "projects.viewAll": "查看所有项目",
    "projects.demo": "在线演示",
    "projects.code": "源代码",

    // Contact Section
    "contact.title": "联系我",
    "contact.subtitle": "让我们一起合作您的下一个项目",
    "contact.email": "邮箱",
    "contact.phone": "电话",
    "contact.location": "位置",
    "contact.form.name": "姓名",
    "contact.form.email": "邮箱",
    "contact.form.message": "消息",
    "contact.form.send": "发送消息",

    // Footer
    "footer.rights": "版权所有",
    "footer.built": "使用 Next.js 和 Tailwind CSS 构建",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string, params?: Record<string, any>) => {
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
