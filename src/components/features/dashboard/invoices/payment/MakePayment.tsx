"use client";

import { X } from "lucide-react";
import { EthIcon, UsdtIcon } from "@/components/shared/icons";
import { InvoiceDetailTableProps } from "@/types/interface";
import InvoiceDetailTable from "../InvoiceDetailTable";
import useModal from "@/hooks/useModal";
const statusTable: InvoiceDetailTableProps[] = [
  {
    headers: ["Asset", "Network"],
    body: [
      { icon: <UsdtIcon />, iconLabel: "USDT" },
      { icon: <EthIcon />, iconLabel: "Ethereum" },
    ],
  },
  {
    headers: ["To", "Fee"],
    body: [{ text: "0x6885afa...6f23b3" }, { text: "0.0005 ETH (≈ $1.31)" }],
  },
];

const MakePayment = () => {
  const { hideModal } = useModal();
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <button className="w-fit cursor-pointer" onClick={() => hideModal()}>
          <X width={32} height={32} />
        </button>
        <p className="text-xl font-semibold text-text-header flex-1 text-center">
          Make payment
        </p>
      </div>

      <div className="flex-col flex justify-center items-center">
        <UsdtIcon size="56" />

        <p className="text-xl font-semibold text-gray-500">581 USDT</p>

        <p className="text-gray-400 text-base font-medium">≈ $476.19</p>
      </div>

      <div className="space-y-2">
        {statusTable.map((detail, idx) => (
          <InvoiceDetailTable
            headers={detail.headers}
            body={detail.body}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default MakePayment;
