import { Share2,  } from "lucide-react";
import Image from "next/image";

const TransactionDetailsModal = () => {
  return (
    <div className="h-[85vh] md:h-full md:max-h-[640px] space-y-4 flex flex-col">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/Tether.svg"
          alt="Contract type"
          width={56}
          height={56}
          className="rounded-full"
        />

        <div className="flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl text-[#26902B]">+581 USDT</h1>
          <p className="text-sm text-text-secondary">≈ $476.19</p>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="space-y-2">
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">Network</p>
          <p className="text-xs text-text-secondary">Status</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary px-1 text-sm py-1 ">
            <Image src="/eth.svg" alt="Currency" width={16} height={16} />
            <span>Etherium</span>
          </div>
          <div className="flex items-center gap-2 px-1 text-[#26902B] text-sm py-1 ">
            <span>. Approved</span>
          </div>
        </div>
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">From</p>
          <p className="text-xs text-text-secondary">Title</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary px-1 text-sm py-1 max-w-48  ">
            <span>0x6885afa...6f23b3</span>
          </div>
          <div className="flex items-center gap-2 px-1 text-text-primary text-sm py-1 ">
            <span>Fund Deposit</span>
          </div>
        </div>
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">Transaction ID</p>
          <p className="text-xs text-text-secondary">Timestamp</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary px-1 text-sm py-1 max-w-48  ">
            <span>0x6885afa...6f23b3</span>
          </div>
          <div className="flex items-center gap-2 px-1 text-text-primary text-sm py-1 ">
            <span>25th Oct 2025 | 2:00pm</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {}}
        className="p-4 w-full mt-auto rounded-lg bg-[#5E2A8C] text-white hover:bg-[#4C1D95] flex items-center justify-center gap-2"
      >
        <Share2 className="w-4 h-4 mt-0.5" />
        Share
      </button>
    </div>
  );
};

export default TransactionDetailsModal;
