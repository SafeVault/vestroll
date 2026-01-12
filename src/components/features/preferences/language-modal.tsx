"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import Image from "next/image"

interface Language {
  code: string
  name: string
  countryCode: string
}

const languages: Language[] = [
  { code: "ar", name: "Arabic", countryCode: "ae" },
  { code: "zh", name: "Chinese (Mandarin)", countryCode: "cn" },
  { code: "en-GB", name: "English (UK)", countryCode: "gb" },
  { code: "en-US", name: "English (United States)", countryCode: "us" },
  { code: "fr", name: "French", countryCode: "fr" },
  { code: "de", name: "German", countryCode: "de" },
  { code: "it", name: "Italian", countryCode: "it" },
  { code: "ja", name: "Japanese", countryCode: "jp" },
  { code: "pt", name: "Portuguese", countryCode: "pt" },
  { code: "es", name: "Spanish", countryCode: "es" },
]

interface LanguageModalProps {
  isOpen: boolean
  onClose: () => void
  onLanguageSelect: (language: string) => void
  selectedLanguage: string
}

export function LanguageModal({ isOpen, onClose, onLanguageSelect, selectedLanguage }: LanguageModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState(selectedLanguage)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle opening animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 10)
      setTempSelectedLanguage(selectedLanguage)
      setSearchQuery("")
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 200)
    }
  }, [isOpen, selectedLanguage])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
      setIsVisible(false)
    }, 200)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleSave = () => {
    onLanguageSelect(tempSelectedLanguage)
    handleClose()
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-200 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-lg w-full max-w-md flex flex-col transition-all duration-200 ${
        isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Select language</h2>
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Language List */}
          <div className="max-h-80 overflow-y-auto space-y-1">
            {filteredLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => setTempSelectedLanguage(language.name)}
                className="w-full flex items-center justify-between p-4 rounded-lg text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={`https://flagcdn.com/24x18/${language.countryCode}.png`}
                      alt={`${language.countryCode} flag`}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium">{language.name}</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  tempSelectedLanguage === language.name 
                    ? "border-purple-600 bg-purple-600" 
                    : "border-gray-300"
                }`}>
                  {tempSelectedLanguage === language.name && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button with proper spacing */}
        <div className="p-6 pt-0">
          <button
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}