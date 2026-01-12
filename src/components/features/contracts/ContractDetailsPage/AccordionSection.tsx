"use client"

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-medium">{title}</h3>
        <ChevronDown
          size={20}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && <div className=" p-4 text-sm">{children}</div>}
    </div>
  );
}
