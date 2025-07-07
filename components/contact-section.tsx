"use client"

import "./contact-section.css"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">{t("contact.title")}</h2>
        <p className="contact-description">{t("contact.description")}</p>
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
