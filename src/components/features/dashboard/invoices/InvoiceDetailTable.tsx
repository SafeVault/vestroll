"use client";

import {
  InvoiceDetailTableProps,
  InvoiceStatus,
  InvoiceTableCell,
} from "@/types/interface";

const InvoiceDetailTable = ({ body, headers }: InvoiceDetailTableProps) => {
  const getStatusBadge = (status: InvoiceStatus) => {
    const statusStyles: Record<InvoiceStatus, string> = {
      Pending: "border-[#E79A23] bg-[#FEF7EB] text-[#E79A23]",
      Paid: "border-[#26902B] bg-[#EDFEEC] text-[#26902B]",
      Approved: "bg-[#EBF2FF] border-[#387DF4] text-[#387DF4]",
      Rejected: "border-[#C64242] bg-[#FEECEC] text-[#C64242]",
    };

    return (
      <span
        className={`py-1 px-2 border text-xs font-semibold w-fit rounded-full ${
          statusStyles[status] || statusStyles["Pending"]
        }`}
      >
        {status}
      </span>
    );
  };

  const renderCell = (cell: InvoiceTableCell, alignment: "left" | "right") => {
    const { text, icon, status, iconLabel } = cell;
    if (status) return getStatusBadge(status);
    else if (icon)
      return (
        <span
          className={`flex items-center gap-2 ${
            alignment === "right" ? "justify-end" : "justify-start"
          }`}
        >
          {icon}

          <p className="text-sm font-semibold text-gray-500">{iconLabel}</p>
        </span>
      );
    else return text;
  };

  return (
    <table className="w-full">
      <thead className="bg-gray-100 text-gray-400">
        <tr>
          <th className="py-1 px-2 text-left text-xs font-medium">
            {headers[0]}
          </th>
          <th className="text-right py-1 px-2 text-xs font-medium">
            {headers[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-sm font-semibold text-gray-500">
          <td className="px-2 py-1">{renderCell(body[0], "left")}</td>
          <td className="px-2 py-1 text-right">
            {renderCell(body[1], "right")}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default InvoiceDetailTable;
