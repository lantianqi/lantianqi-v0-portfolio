"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function SocialLinks() {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:hello@lantianqi.dev",
      label: "Email",
    },
  ]

  return (
    <div className="flex justify-center gap-6">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
          aria-label={social.label}
        >
          <social.icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  )
}
