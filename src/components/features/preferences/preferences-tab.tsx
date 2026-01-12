"use client"

import { useState } from "react"
import { AppLanguageSection } from "./app-language-section"
import { AppearanceSection } from "./appearance-section"
import { DeviceManagementSection } from "./device-management-section"
import { LanguageModal } from "./language-modal"



export function PreferencesTab() {

    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("English")
  
    const handleLanguageChange = (language: string) => {
      setSelectedLanguage(language)
      setIsLanguageModalOpen(false)
    }

  return (
    <div className="space-y-8 bg-[#F5F6F7]">
      <AppLanguageSection
        selectedLanguage={selectedLanguage}
        onLanguageClick={() => setIsLanguageModalOpen(true)}
      />
      
      <AppearanceSection />
      
      <DeviceManagementSection />

      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        onLanguageSelect={handleLanguageChange}
        selectedLanguage={selectedLanguage}
      />
    </div>
  )
}