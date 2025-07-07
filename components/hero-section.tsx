"use client"

import "./hero-section.css"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import Link from "next/link"
import HandwrittenName from "@/components/handwritten-name"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const { t } = useLanguage()
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(false)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  const fullText = t("hero.subtitle")

  useEffect(() => {
    // Start typing animation after handwritten name animation completes
    const startDelay = 6500 // 6.5 seconds to match the original timing

    const startTyping = setTimeout(() => {
      setShowCursor(true)
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTypingComplete(true)
        }
      }, 80) // Adjust speed as needed (80ms per character)

      return () => clearInterval(typeInterval)
    }, startDelay)

    return () => clearTimeout(startTyping)
  }, [fullText])

  return (
    <section id="hero" className="hero-section">
      {/* Background Animation */}
      <div className="hero-background">
        <div className="hero-background-inner">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
          <div className="hero-blob hero-blob-3"></div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-name-container">
          <HandwrittenName name="lantianqi" className="mx-auto" />

          {/* Animated underline */}
          <div className="hero-underline-container">
            <div className="hero-underline"></div>
          </div>
        </div>

        {/* Subtitle with typewriter effect */}
        <p className="hero-subtitle">
          <span className="typewriter-container">
            <span className="typewriter-text">{displayedText}</span>
            <span className={`typewriter-cursor ${showCursor ? "animate-blink" : "opacity-0"}`}>|</span>
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-container">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3"
          >
            {t("hero.viewWork")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
          >
            {t("hero.getInTouch")}
          </Button>
        </div>

        {/* Social Links */}
        <div className="hero-social-container">
          <Link href="#" className="hero-social-link">
            <Github className="w-6 h-6" />
          </Link>
          <Link href="#" className="hero-social-link">
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link href="#" className="hero-social-link">
            <Mail className="w-6 h-6" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <ArrowDown className="w-6 h-6 text-white/60 mx-auto" />
        </div>
      </div>
    </section>
  )
}
