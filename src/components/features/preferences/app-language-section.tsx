
import { ChevronRight } from "lucide-react"

interface AppLanguageSectionProps {
  selectedLanguage: string
  onLanguageClick: () => void
}

export function AppLanguageSection({ selectedLanguage, onLanguageClick }: AppLanguageSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div>
        <h2 className="text-lg font-medium">App language</h2>
        <p className="text-sm text-gray-500">Select default app language</p>
      </div>

      <button
        className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={onLanguageClick}
      >
        <span className="text-gray-900">{selectedLanguage}</span>
        <div className="flex items-center gap-1">
          <span className="text-purple-600 text-sm">(Change)</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </button>
    </div>
  )
}