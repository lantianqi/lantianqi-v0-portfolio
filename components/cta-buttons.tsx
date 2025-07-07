"use client"

import "./cta-buttons.css"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface CTAButtonsProps {
  className?: string
  onViewWork?: () => void
  onGetInTouch?: () => void
}

export default function CTAButtons({ className = "", onViewWork, onGetInTouch }: CTAButtonsProps) {
  const { t } = useLanguage()

  return (
    <div className={`cta-buttons-container ${className}`}>
      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3"
        onClick={onViewWork}
      >
        {t("hero.viewWork")}
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-white/30 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
        onClick={onGetInTouch}
      >
        {t("hero.getInTouch")}
      </Button>
    </div>
  )
}
