"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

interface SocialLinksProps {
  className?: string
  githubUrl?: string
  linkedinUrl?: string
  emailUrl?: string
}

export default function SocialLinks({
  className = "",
  githubUrl = "#",
  linkedinUrl = "#",
  emailUrl = "#",
}: SocialLinksProps) {
  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      <Link href={githubUrl} className="text-white/60 hover:text-white transition-colors p-2">
        <Github className="w-6 h-6" />
      </Link>
      <Link href={linkedinUrl} className="text-white/60 hover:text-white transition-colors p-2">
        <Linkedin className="w-6 h-6" />
      </Link>
      <Link href={emailUrl} className="text-white/60 hover:text-white transition-colors p-2">
        <Mail className="w-6 h-6" />
      </Link>
    </div>
  )
}
