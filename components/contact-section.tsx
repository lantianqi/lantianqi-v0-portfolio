"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="min-h-screen py-20 bg-black/20 backdrop-blur-sm flex items-center">
      <div className="container mx-auto px-6 text-center w-full">
        <h2 className="text-4xl font-bold text-white mb-8">{t("contact.title")}</h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{t("contact.description")}</p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3"
        >
          {t("contact.startConversation")}
        </Button>
      </div>
    </section>
  )
}
