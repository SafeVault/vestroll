"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function RelatedCard({
  imgSrc,
  title,
  subtitle,
  actionText,
  href = "#",
}: {
  imgSrc: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#e5e7eb] bg-white p-4">
      <div className="rounded-lg bg-[#F3EBF9] p-3">
        <Image src={imgSrc} alt="icon" width={36} height={36} />
      </div>
      <div>
        <div className="text-xl font-semibold text-[#111827]">{title}</div>
        {subtitle && <div className="text-sm text-[#6b7280]">{subtitle}</div>}
      </div>
      {actionText && (
        <div className="ml-auto text-sm text-[#6d28d9]">
          <Link className="flex" href={href}>
            {actionText}{" "}
            <ExternalLink width={20} height={20} className="ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
