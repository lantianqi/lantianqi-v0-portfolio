"use client"

import "./social-links.css"
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
    <div className={`social-links-container ${className}`}>
      <Link href={githubUrl} className="social-link">
        <Github className="w-6 h-6" />
      </Link>
      <Link href={linkedinUrl} className="social-link">
        <Linkedin className="w-6 h-6" />
      </Link>
      <Link href={emailUrl} className="social-link">
        <Mail className="w-6 h-6" />
      </Link>
    </div>
  )
}
