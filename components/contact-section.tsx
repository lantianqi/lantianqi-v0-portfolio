"use client"

import { useLanguage } from "@/contexts/language-context"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("contact.title")}</h2>
          <p className="text-xl text-white/80">{t("contact.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-purple-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">{t("contact.email")}</h3>
            <p className="text-white/70">contact@example.com</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-purple-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">{t("contact.phone")}</h3>
            <p className="text-white/70">+1 (555) 123-4567</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-purple-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">{t("contact.location")}</h3>
            <p className="text-white/70">San Francisco, CA</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/80 mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
