"use client";

import { Loader2 } from "lucide-react";

const ProcessingPayment = () => {
  return (
    <>
      <div className="mx-auto w-fit animate-spin">
        <Loader2 size={64} className="text-blue-500" />
      </div>

      <div className="text-center max-w-3/4 mx-auto">
        <h3 className="text-2xl font-bold text-gray-500 mb-2">
          Sending...
        </h3>
        <p className="text-gray-400 text-sm">
          <span className="text-primary-200">5 USDC</span>{" "}
          to{" "}
          <span className="text-gray-500">
            0x6885afa...6f23b3
          </span>
        </p>
      </div>
    </>
  );
};

export default ProcessingPayment;
