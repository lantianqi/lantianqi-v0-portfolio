"use client"

import { useEffect, useState, useRef } from "react"

interface ScrollSpyOptions {
  sections: string[]
  offset?: number
  updateUrl?: boolean
}

export function useScrollSpy({ sections, offset = 100, updateUrl = true }: ScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string>("")
  const isNavigatingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      // Skip URL updates if we're in the middle of programmatic navigation
      if (isNavigatingRef.current) {
        return
      }

      const scrollPosition = window.scrollY + offset

      // Find the current section based on scroll position
      let currentSection = ""

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId
            break
          }
        }
      }

      // If no section is found, default to the first section (hero)
      if (!currentSection && sections.length > 0) {
        currentSection = sections[0]
      }

      // Update active section if it changed
      if (currentSection !== activeSection) {
        setActiveSection(currentSection)

        // Update URL if enabled
        if (updateUrl && currentSection) {
          const newUrl = `#${currentSection}`
          if (window.location.hash !== newUrl) {
            // Use replaceState to avoid adding to browser history
            window.history.replaceState(null, "", newUrl)
          }
        }
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections, offset, updateUrl, activeSection])

  // Function to handle programmatic navigation
  const navigateToSection = (sectionId: string) => {
    console.log(`Navigating to section: ${sectionId}`) // Debug log

    isNavigatingRef.current = true

    const element = document.getElementById(sectionId)
    if (element) {
      // Update URL immediately
      if (updateUrl) {
        window.history.replaceState(null, "", `#${sectionId}`)
      }

      // Calculate the scroll position accounting for the fixed navbar
      const navbarHeight = 80 // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight

      // Scroll to element with smooth behavior
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })

      // Update active section immediately
      setActiveSection(sectionId)

      // Reset navigation flag after scroll completes
      setTimeout(() => {
        isNavigatingRef.current = false
      }, 1000) // Give enough time for smooth scroll to complete
    } else {
      console.warn(`Element with id "${sectionId}" not found`)
      isNavigatingRef.current = false
    }
  }

  return { activeSection, navigateToSection }
}
