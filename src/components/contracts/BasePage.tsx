import { mockContracts } from "@/data/contracts"
import FirstContractBanner from "./ui/FirstContractBanner"
import ContractHistory from "./ContractHistory"
import ContractMetrics from "./ui/ContractMetrics"

export default function BasePage() {
  return (
    <section className="px-3 sm:px-6">
        <div className="space-y-4">
            {mockContracts.length > 0 ? <ContractMetrics /> : <FirstContractBanner />}
            <ContractHistory />
        </div>
    </section>
  )
}
