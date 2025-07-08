"use client"

import { useLanguage } from "@/contexts/language-context"

interface HandwrittenNameProps {
  name?: string
  className?: string
}

// Letter path definitions from Limelight font
const letterPaths = {
  L: "M25.24 41.19L0 41.19L0 6.03L9.69 6.03L9.69 36.72L25.24 36.72L25.24 41.19Z",
  A: "M33.89 24.37L33.89 24.83Q33.84 26.88 33.46 29.08Q33.08 31.27 32.40 33.47Q31.71 35.67 30.76 37.82Q29.81 39.97 28.63 41.93Q27.44 43.90 26.07 45.62Q24.71 47.34 23.19 48.66L19.56 46.56Q20.41 45.12 21.11 43.42Q21.80 41.72 22.36 39.87Q22.92 38.01 23.33 36.06Q23.73 34.11 24.00 32.18Q24.27 30.25 24.40 28.38Q24.54 26.51 24.54 24.83Q24.54 23.51 24.52 21.84Q24.51 20.17 24.33 18.43Q24.15 16.70 23.73 15.05Q23.32 13.40 22.50 12.11Q21.68 10.82 20.40 10.03Q19.12 9.25 17.21 9.25Q15.53 9.25 14.32 9.83Q13.11 10.40 12.27 11.36Q11.43 12.33 10.93 13.60Q10.42 14.87 10.14 16.27Q9.86 17.68 9.78 19.10Q9.69 20.53 9.69 21.80L9.69 28.61L20.21 28.61L20.21 32.64L9.69 32.64L9.69 41.19L0 41.19L0 23.32Q0 19.48 1.22 16.19Q2.44 12.89 4.68 10.46Q6.91 8.03 10.05 6.65Q13.18 5.27 17.04 5.27Q19.65 5.27 21.94 6.02Q24.22 6.76 26.10 8.07Q27.98 9.38 29.46 11.17Q30.93 12.96 31.92 15.09Q32.91 17.21 33.42 19.58Q33.94 21.95 33.89 24.37Z",
  N: "M4.49 41.19L0 41.19L0 6.03L6.30 6.03L27.66 30.18L27.66 6.03L32.13 6.03L32.13 41.19L25.83 41.19L4.49 17.07L4.49 41.19Z",
  T: "M19.26 41.19L9.57 41.19L9.57 10.52L0 10.52L0 6.03L28.83 6.03L28.83 10.52L19.26 10.52L19.26 41.19Z",
  I: "M9.69 41.19L0 41.19L0 6.03L9.69 6.03L9.69 41.19Z",
  Q: "M37.26 50.56L28.08 55.59Q26.59 54.32 25.13 52.72Q23.68 51.12 22.39 49.34Q21.09 47.56 20.02 45.65Q18.95 43.75 18.24 41.87Q14.31 41.70 10.96 40.37Q7.62 39.04 5.19 36.67Q2.76 34.30 1.38 30.99Q0 27.69 0 23.56Q0 19.24 1.45 15.83Q2.91 12.43 5.48 10.07Q8.06 7.71 11.60 6.46Q15.14 5.20 19.31 5.20Q23.49 5.20 27.03 6.46Q30.57 7.71 33.14 10.07Q35.72 12.43 37.17 15.83Q38.62 19.24 38.62 23.56Q38.62 27.20 37.55 30.20Q36.47 33.20 34.53 35.50Q32.59 37.79 29.91 39.31Q27.22 40.82 24.00 41.46Q25.37 42.90 26.98 44.24Q28.59 45.58 30.31 46.75Q32.03 47.92 33.80 48.89Q35.57 49.85 37.26 50.56M28.76 23.56Q28.76 21.95 28.61 20.26Q28.47 18.58 28.08 16.99Q27.69 15.41 27.01 14.01Q26.34 12.62 25.29 11.58Q24.24 10.55 22.77 9.95Q21.29 9.35 19.31 9.35Q17.31 9.35 15.82 9.95Q14.33 10.55 13.28 11.57Q12.23 12.60 11.57 13.99Q10.91 15.38 10.53 16.96Q10.16 18.53 10.01 20.23Q9.86 21.92 9.86 23.56Q9.86 25.17 10.01 26.86Q10.16 28.54 10.55 30.11Q10.94 31.69 11.61 33.08Q12.28 34.47 13.33 35.51Q14.38 36.55 15.86 37.16Q17.33 37.77 19.31 37.77Q21.24 37.77 22.68 37.15Q24.12 36.52 25.17 35.46Q26.22 34.40 26.92 33.00Q27.61 31.59 28.02 30.02Q28.42 28.44 28.59 26.78Q28.76 25.12 28.76 23.56Z",
}

// Letter width mapping for proper spacing (approximate widths from the paths)
const letterWidths = {
  L: 30,
  A: 40,
  N: 37,
  T: 33,
  I: 15,
  Q: 43,
}

export default function HandwrittenName({ name = "lantianqi", className = "" }: HandwrittenNameProps) {
  const { t } = useLanguage()

  // Convert name to uppercase and split into letters
  const letters = name.toUpperCase().split("")

  // Calculate total width and positions for centering
  let currentX = 0
  const letterPositions = letters.map((letter) => {
    const position = currentX
    currentX += letterWidths[letter as keyof typeof letterWidths] + 8 // 8px spacing between letters
    return position
  })

  // Total width for centering
  const totalWidth = currentX - 8 // Remove last spacing
  const startX = 10 // Small padding instead of centering in fixed width

  return (
    <div className={`handwritten-name-container ${className}`}>
      <h2 className="handwritten-name text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        {t("hero.name")}
      </h2>
      <svg viewBox={`0 0 ${totalWidth + 20} 70`} className="handwritten-name" xmlns="http://www.w3.org/2000/svg">
        {letters.map((letter, index) => {
          const letterKey = letter as keyof typeof letterPaths
          const path = letterPaths[letterKey]

          if (!path) {
            console.warn(`Path not found for letter: ${letter}`)
            return null
          }

          return (
            <g key={`${letter}-${index}`} transform={`translate(${startX + letterPositions[index]}, 5)`}>
              <path
                d={path}
                className={`letter letter-${index + 1}`}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
