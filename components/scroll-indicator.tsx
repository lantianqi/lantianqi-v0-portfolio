"use client"

import { ArrowDown } from "lucide-react"

interface ScrollIndicatorProps {
  className?: string
}

export default function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  return (
    <div className={`animate-bounce ${className}`}>
      <ArrowDown className="w-6 h-6 text-white/60 mx-auto" />
    </div>
  )
}
