"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  UsersIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface StatProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

function Stat({ Icon, label, value }: StatProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ff]">
        <Icon className="h-5 w-5 text-[var(--violet-base)]" />
      </div>
      <div className="leading-tight">
        <div className="text-xs sm:text-sm text-[#6b7280]">{label}</div>
        <div className="text-base sm:text-lg font-semibold text-[#111827]">
          {value}
        </div>
      </div>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

function SectionCard({ title, action, children }: SectionCardProps) {
  return (
    <section className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="group flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
        <h2 className="text-lg font-semibold text-[#1f2937]">{title}</h2>
        {action}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

interface FieldRowProps {
  label: string;
  value?: React.ReactNode;
  right?: React.ReactNode;
}

function FieldRow({ label, value, right }: FieldRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-6 px-3 sm:px-4 py-3 rounded-lg bg-[#f8fafc]">
      <div className="text-sm text-[#6b7280]">{label}</div>
      <div className="sm:col-span-2 flex items-center justify-end gap-3">
        <div className="text-sm sm:text-base text-[#111827] text-right">
          {value ?? <span className="text-[#9ca3af]">--</span>}
        </div>
        {right}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col items-center text-center gap-4 md:block sm:items-center sm:justify-start sm:text-left">
          <div className="md:flex gap-8 items-center">
            <Image
              src="/touchpoint360.png"
              alt="Touchpoint 360"
              width={96}
              height={96}
              className="mx-auto md:mx-0 sm:h-[112px] sm:w-[112px] h-[96px] w-[96px]"
            />

            <div>
              <h2 className="text-3xl sm:text-3xl font-semibold text-[#111827]">
                Touchpoint 360
              </h2>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-10 pt-4">
                <Stat Icon={UsersIcon} label="Active members" value="20" />
                <div
                  className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
                  aria-hidden="true"
                />
                <Stat Icon={GlobeAltIcon} label="Countries" value="04" />
                <div
                  className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
                  aria-hidden="true"
                />
                <Stat
                  Icon={ShieldCheckIcon}
                  label="Administrators"
                  value="02"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionCard
          title="Company information"
          action={
            <button
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[var(--violet-base)] border-[var(--violet-base)] hover:bg-[var(--violet-hover)] hover:text-white active:bg-[var(--violet-active)] transition-colors"
              type="button"
              aria-label="Edit company information"
            >
              <Image
                src="/edit.svg"
                width={16}
                height={16}
                alt=""
                aria-hidden
                className="transition group-hover:invert group-hover:brightness-0"
              />
              Edit
            </button>
          }
        >
          <div className="space-y-3">
            <FieldRow label="Company/Brand name" value="Touchpoint 360" />
            <FieldRow label="Registered name" value="Touchpoint 360" />
            <FieldRow
              label="Registration Number/EIN ID"
              value={<span className="text-[#9ca3af]">--</span>}
            />
            <FieldRow
              label="Country of incorporation"
              value={
                <div className="flex items-center gap-2">
                  <Image
                    src="/nigeria.svg"
                    width={20}
                    height={14}
                    alt="Nigeria flag"
                  />
                  <span>Nigeria</span>
                </div>
              }
            />
            <FieldRow
              label="Size"
              value={<span className="text-[#9ca3af]">--</span>}
            />
            <FieldRow
              label="VAT number"
              value={<span className="text-[#9ca3af]">--</span>}
            />
            <FieldRow
              label="Company public website URL"
              value={
                <Link
                  href="https://www.touchpoint360.com/"
                  className="text-[var(--violet-base)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.touchpoint360.com/
                </Link>
              }
            />
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Addresses">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-[#6b7280] mb-2">Billing address</div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
                <Image
                  src="/warning.svg"
                  width={20}
                  height={20}
                  alt="Warning"
                />
                <div className="text-sm">
                  Please{" "}
                  <Link
                    className="underline decoration-[var(--violet-base)] text-[var(--violet-base)] hover:no-underline"
                    href="#"
                  >
                    add
                  </Link>{" "}
                  your company billing address
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-[#6b7280] mb-2">
                Registered address
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
                <Image
                  src="/warning.svg"
                  width={20}
                  height={20}
                  alt="Warning"
                />
                <div className="text-sm">
                  Please{" "}
                  <Link
                    className="underline decoration-[var(--violet-base)] text-[var(--violet-base)] hover:no-underline"
                    href="settings/registered-address"
                  >
                    add
                  </Link>{" "}
                  your registered address
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
