"use client";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import HiringTemplateButtonGroup, {type HiringTemplateButtonGroupProps} from "./hiring-template-button-group";

export default function HiringTemplateHeader({onDeleteTemplate, className}: HiringTemplateButtonGroupProps) {

  return (
    <div className="w-full flex bg-white justify-between p-4 relative">
      <div>
        <Link
          href="/settings/hiring-templates"
          className="flex items-center gap-1 text-[#7F8C9F] "
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>
        <span className="font-bold text-2xl">Hiring Template</span>
      </div>

      <HiringTemplateButtonGroup onDeleteTemplate={onDeleteTemplate} className={className}/>
    </div>
  );
}
