"use client";

export default function StatusBadge({
  status,
}: {
  status: "Pending" | "Approved" | "Rejected";
}) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium";
  const cls =
    status === "Pending"
      ? "bg-[#FEF7EB] text-[#E79A23] border border-[#E79A23]"
      : status === "Approved"
        ? "bg-[#EDFEEC] text-[#065f46] border border-[#065f46]"
        : "bg-[#FEECEC] text-[#C64242] border border-[#C64242]";
  return <span className={`${base} ${cls}`}>{status}</span>;
}
