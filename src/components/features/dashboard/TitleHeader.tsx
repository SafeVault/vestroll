import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { ArrowDown, ExportIcon } from "@/components/shared/icons";
function TitleHeader({
  title,
  isBackButton,
  isAddButton = false,
  isExportButton,
}: {
  title: string;
  isBackButton: boolean;
  isAddButton?: boolean;
  isExportButton?: boolean;
}) {
  const handleBackButton = () => {
    if (isBackButton) {
    }
  };
  return (
    <section className="sticky top-0 bg-white z-5">
      <div className="px-4">
        <div className="pb-4 sm:pb-6 space-y-2">
          {isBackButton ? (
            <button
              onClick={handleBackButton}
              className="flex items-center gap-1 text-xs font-medium text-gray-300 transition-colors duration-150 ease-in-out cursor-pointer hover:text-gray-200"
            >
              <span>
                <ArrowLeft size={16} />
              </span>
              Back
            </button>
          ) : (
            <p className="text-xs font-medium text-[#7F8C9F]">Overview</p>
          )}
          <div className="flex items-center justify-between gap-4">
            <h1 className="overflow-hidden text-2xl font-bold tracking-tight text-text-header truncate max-w-44 xs:max-w-56  whitespace-nowrap sm:text-4xl sm:max-w-full">
              {title}
            </h1>
            {isAddButton && (
              <Link
                href="/app/contracts/create"
                className={
                  "hidden lg:flex items-center justify-center text-white rounded-full cursor-pointer bg-primary-500 h-10 gap-2 px-5 transition-colors duration-150 "
                }
                aria-label="Create new contract"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <Plus size={16} />
                </span>
                <span className="text-sm font-semibold">New contract</span>
              </Link>
            )}
            {/* Export button removed per request */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TitleHeader;
