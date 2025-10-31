import { handleChecklistLayoutTitle } from "@/components/dashboard/home/lib";
import BackButton from "@/components/ui/BackButton";

export default async function CreateChecklistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ checklist: string }>;
}) {
  const { checklist } = await params

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col bg-white border-b border-t mb-6 border-gray-200 py-6 px-4">
        <BackButton>
          <span className="text-sm">Back</span>
        </BackButton>
        <h1 className="text-2xl font-bold text-gray-900">{handleChecklistLayoutTitle(checklist)}</h1>
      </div>
      <div className="w-full px-2 sm:px-6 md:px-8 pb-8">
        {/* Content area */}
        <div className="mx-auto px-4 py-1 sm:px-6 md:p-1 lg:w-[480px] max-w-[480px]">
          {children}
        </div>
      </div>
    </div>
  );
}
