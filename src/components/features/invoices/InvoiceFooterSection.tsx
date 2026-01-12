"use client";

import Image from "next/image";
import Link from "next/link";

export default function InvoiceFooterSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[852px] mx-auto mb-14 md:mb-0">
      {/* Left Card */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-[#E9EAF0] p-4 sm:p-5">
        <div className="flex items-center gap-3">
            <Image
              src="/contract-icon.png"
              alt="Contract Icon"
              width={48}
              height={48}
              className="rounded-lg"
            />
          <div>
            <p className="text-sm sm:text-base font-medium text-[#17171C]">
              Quikdash
            </p>
            <p className="text-xs text-[#5D6B82] mt-0.5">Pay as you go</p>
          </div>
        </div>

        <Link
          href="#"
          className="flex items-center gap-1 text-sm text-[#6B5CD6] font-medium hover:underline"
        >
          View contract
          <Image
            src="/external-link.png"
            alt="External Link"
            width={14}
            height={14}
          />
        </Link>
      </div>

      {/* Right Card */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-[#E9EAF0] p-4 sm:p-5">
        <div className="flex items-center gap-3">
            <Image
              src="/profile-icon.png"
              alt="Profile Icon"
              width={48}
              height={48}
              className="rounded-lg"
            />
          <div>
            <p className="text-sm sm:text-base font-medium text-[#17171C]">
              James Akinbiola
            </p>
            <p className="text-xs text-[#5D6B82] mt-0.5">Front-end developer</p>
          </div>
        </div>

        <Link
          href="#"
          className="flex items-center gap-1 text-sm text-[#6B5CD6] font-medium hover:underline"
        >
          View details
          <Image
            src="/external-link.png"
            alt="External Link"
            width={14}
            height={14}
          />
        </Link>
      </div>
    </section>
  );
}
