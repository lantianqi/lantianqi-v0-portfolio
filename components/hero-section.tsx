"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import Link from "next/link"
import HandwrittenName from "@/components/handwritten-name"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import "@/components/handwritten-name.css"

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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <HandwrittenName name="lantianqi" className="mx-auto" />

          {/* Animated underline */}
          <div className="flex justify-center">
            <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 animated-underline w-full"></div>
          </div>
        </div>

        {/* Subtitle with typewriter effect */}
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto px-4">
          <span className="typewriter-container inline-block max-w-full text-left">
            <span className="typewriter-text break-words">{displayedText}</span>
            <span className={`typewriter-cursor inline-block ml-1 ${showCursor ? "animate-blink" : "opacity-0"}`}>
              |
            </span>
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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
        <div className="flex justify-center space-x-6 mb-12">
          <Link href="#" className="text-white/60 hover:text-white transition-colors p-2">
            <Github className="w-6 h-6" />
          </Link>
          <Link href="#" className="text-white/60 hover:text-white transition-colors p-2">
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link href="#" className="text-white/60 hover:text-white transition-colors p-2">
            <Mail className="w-6 h-6" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60 mx-auto" />
        </div>
      </div>
    </section>
  )
}
