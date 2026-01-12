"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

const themes = [
  {
    id: "light",
    name: "Light",
    preview: "/theme-light.svg", 
  },
  {
    id: "dark", 
    name: "Dark",
    preview: "/theme-dark.svg",
  },
  {
    id: "system",
    name: "System", 
    preview: "/theme-system.svg",
  },
]

export function AppearanceSection() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div>
        <h2 className="text-lg font-medium">Appearance</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border transition-colors ${
              theme === themeOption.id 
                ? "border-purple-500 bg-purple-50" 
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="relative">
              <Image
                src={themeOption.preview}
                alt={`${themeOption.name} theme preview`}
                width={64}
                height={48}
                className="rounded-md"
              />
              {theme === themeOption.id && (
                <div className="absolute inset-0 ring-2 ring-purple-500 ring-offset-2 rounded-md" />
              )}
            </div>
            <span className="text-sm font-medium">{themeOption.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}