"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function BilledSection() {
  const Card = ({
    label,
    name,
    email,
    phone,
    address,
  }: {
    label: "Billed to" | "Billed from";
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => (
    <div className="flex-1 rounded-lg border-[#E9EAF0] bg-white shadow-sm p-5">
      <span className="inline-block px-2 py-[2px] rounded-full bg-[#EDEAFD] text-[11px] font-medium text-[#6B5AED] mb-3">
        {label}
      </span>

      <h3 className="text-[14px] font-semibold text-[#17171C] mb-2">{name}</h3>

      <ul className="space-y-1 text-[13px] text-[#5D6B82]">
        <li className="flex items-center gap-1 flex-wrap">
          <Mail size={13} className="text-[#5D6B82]" />
          {email}
        </li>
        <li className="flex items-center gap-1 flex-wrap">
          <Phone size={13} className="text-[#5D6B82]" />
          {phone}
        </li>
        <li className="flex items-start gap-1 flex-wrap">
          <MapPin size={13} className="text-[#5D6B82] mt-[2px]" />
          <span>{address}</span>
        </li>
      </ul>
    </div>
  );

  const billedTo = {
    label: "Billed to" as const,
    name: "James Akinbiola",
    email: "mailjames@gmail.com",
    phone: "+234 903 489 4238",
    address:
      "No 8 James Robertson Shittu/Ogunlana Drive, Surulere, Nigeria | 142261",
  };

  const billedFrom = {
    label: "Billed from" as const,
    name: "Tomiwa Oluwagbemiga",
    email: "mailtomi@gmail.com",
    phone: "+234 903 489 4238",
    address:
      "No 8 James Robertson Shittu/Ogunlana Drive, Surulere, Nigeria | 142261",
  };

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <Card {...billedTo} />
      <Card {...billedFrom} />
    </div>
  );
}
