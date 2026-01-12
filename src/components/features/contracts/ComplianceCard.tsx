import { PdfDocumentIcon } from "@/components/shared/icons";
interface ComplianceCardProps {
  agreement?: File | null;
  additionalAgreement?: string;
}
function ComplianceCard({ additionalAgreement }: ComplianceCardProps) {
  return (
    <div className="max-w-4xl px-4 py-6 space-y-4 sm:p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between w-full gap-4 ">
          <div className="flex items-center gap-2">
            <PdfDocumentIcon />
            <div className="space-y-1">
              <p className="text-base font-semibold text-gray-600 dark:text-gray-150">
                Standard Agreement
              </p>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
                <p>PDF format</p>
                <span className="rounded-full size-1 dark:bg-gray-300"></span>
                <p>13MB</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer   bg-[#E8E5FA] text-[#5A42DE]"
          >
            Preview
          </button>
        </div>
        {additionalAgreement !== "" && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
              Additional terms
            </p>
            <div className="py-4.5 px-3.5 bg-gray-100 rounded-lg dark:bg-gray-600">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
                {additionalAgreement}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplianceCard;
