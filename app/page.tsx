import { LanguageProvider } from "@/contexts/language-context"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import BackgroundAnimation from "@/components/background-animation"
import ScrollIndicator from "@/components/scroll-indicator"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <BackgroundAnimation />
        <Navigation />
        <ScrollIndicator />

        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
    </LanguageProvider>
  )
}
