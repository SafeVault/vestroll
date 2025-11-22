import { contractMetricsData } from "@/util/constant";

export default function ContractMetrics() {
  return (
    <div className="gap-4 w-full max-w-screen flex overflow-x-auto mb-4 sm:grid sm:grid-cols-4
                    sm:overflow-x-visible">
        {contractMetricsData.map((metric) => (
        <div key={metric.title} className="min-w-3xs w-full">
            <div className="h-full p-4 bg-white rounded-lg min-w-60 lg:w-full">
            <span className="flex justify-between text-xs font-medium">
                <p className="text-text-subtext ">{metric.title}</p>
                <p className="text-[#7F8C9F]">This year</p>
            </span>
            <hr className="my-4 text-border-primary" />
            <div className="flex items-center justify-between">
                <span>
                <p className="mb-1 text-2xl font-bold text-text-header lg:tracking-tight lg:text-3xl">
                    {metric.value}
                </p>
                <p className="text-sm font-medium text-[#7F8C9F]">{metric.subValue}</p>
                </span>
                <span className="text-primary-500">{metric.icon}</span>
            </div>
            </div>
        </div>
        ))}
    </div>
  )
}
