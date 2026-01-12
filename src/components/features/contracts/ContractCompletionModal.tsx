import { Check, CopyIcon } from "lucide-react";
import { useState } from "react";
import { CalendarCheckIcon } from "@/components/shared/icons";
import useModal from "@/hooks/useModal";

function ContractCompletionModal() {
  const [isCopied, setIsCopied] = useState(false);
  const { hideModal } = useModal();
  const handleCopyToClipBoard = () => {
    navigator.clipboard
      .writeText("https://app.VestRoll.co/id=96abbf24-34f6-49.")
      .then(() => {
        setIsCopied(true);
      })
      .catch(() => {
        setIsCopied(false);
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopied(false);
        }, 500);
      });
  };
  return (
    <div className="pt-14 space-y-14">
      <div className="flex flex-col items-center space-y-9 ">
        <div className="p-3 rounded-full bg-radial from-primary-500 to-white/75 sm:size-30 ">
          <div className="flex items-center justify-center rounded-full bg-primary-500 text-white size-full">
            <CalendarCheckIcon />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-bold text-text-header sm:text-3xl ">
            Contract created
          </p>
          <p className="max-w-xs text-xs font-medium text-center text-text-subtext text-pretty">
            The contract link has been shared with your client, and you can
            always resend it again from your contract page
          </p>
        </div>
        <div className="py-3.5 px-4.5 flex gap-2 dark:bg-gray-600 rounded-lg items-center bg-gray-100">
          <p className="text-sm font-semibold text-gray-500 truncate dark:text-gray-150">
            https://app.VestRoll.co/id=96abbf24-34f6-49.
          </p>
          <button
            onClick={handleCopyToClipBoard}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full cursor-pointer  bg-[#E8E5FA] text-[#5A42DE]"
          >
            <span>Copy</span>
            {isCopied ? (
              <Check size={16} className="dark:text-primary-200" />
            ) : (
              <CopyIcon className="dark:text-primary-200" size={16} />
            )}
          </button>
        </div>
      </div>
      <button
        onClick={() => hideModal()}
        className="w-full font-medium text-white rounded-lg bg-primary-500 h-14 cursor-pointer"
      >
        All done
      </button>
    </div>
  );
}

export default ContractCompletionModal;
