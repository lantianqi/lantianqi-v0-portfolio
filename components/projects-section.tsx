"use client"

import { useLanguage } from "@/contexts/language-context"
import { ExternalLink, Github } from "lucide-react"

export default function ProjectsSection() {
  const { t } = useLanguage()

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Vue.js", "Express.js", "Socket.io", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Weather API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("projects.title")}</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">{t("projects.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
