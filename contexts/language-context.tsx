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
    "hero.subtitle": "Artificial Intelligence & Machine Learning & Full Stack Developer",
    "hero.viewWork": "View My Work",
    "hero.getInTouch": "Get In Touch",

    // About Section
    "about.title": "About Me",
    "about.description":
      "I am a passionate developer with a strong background in artificial intelligence, machine learning, and full-stack development. I love creating innovative solutions that make a difference.",

    // Projects Section
    "project1.title": "Disparity Map - Stereo Images",
    "project1.description": "Traditional CV algorithms. Stereo matching. Sliding window. ssd. Cost planes. Cost Volumes. Disparity maps. rms. errors within threshold.",

    "project2.title": "Twitter Rumor Detector based on BERT",
    "project2.description": "Leveraging BERT for natural language processing to identify and mitigate the spread of misinformation on social media platforms.",

    "project3.title": "Lane Detection",
    "project3.description": "Traditional CV algorithms. Color space transformations. Edge detection. Hough transform. Region of interest. Perspective transformation.",

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
    "project1.title": "视差图 - 立体图像",
    "project1.description": "传统计算机视觉算法。立体匹配。滑动窗口。SSD。代价平面。代价体。视差图。均方根误差。阈值内误差。",

    "project2.title": "基于BERT的推特谣言检测",
    "project2.description": "利用BERT进行自然语言处理，识别并遏制社交媒体平台上的虚假信息传播。",

    "project3.title": "车道线检测",
    "project3.description": "传统计算机视觉算法。颜色空间变换。边缘检测。霍夫变换。感兴趣区域。透视变换。",

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
