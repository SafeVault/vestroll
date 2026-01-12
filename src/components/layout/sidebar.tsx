"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Settings, LogOut, X } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSrc?: string;
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", iconSrc: "/dashboard.svg" },
  { name: "Contracts", href: "/contracts", iconSrc: "/contracts.svg" },
  {
    name: "Team management",
    href: "/team-management",
    iconSrc: "/team.svg",
  },
  { name: "Finance", href: "/finance", iconSrc: "/wallet.svg" },
  { name: "Payroll", href: "/payroll", iconSrc: "/payroll.svg" },
  { name: "Transactions", href: "/transactions", iconSrc: "/usdc.svg" },
  { name: "Invoices", href: "/invoices", iconSrc: "/invoice.svg" },
  { name: "Settings", href: "/settings", Icon: Settings },
];

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const isActive = useMemo(
    () => (href: string) => {
      if (!isClient) return false;
      if (pathname === href) return true;
      return pathname?.startsWith(href + "/") ?? false;
    },
    [pathname, isClient]
  );

  const content = (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="flex items-center justify-between px-2">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="VestRoll home"
        >
          <Image src="/logo.svg" alt="VestRoll" width={100} height={100} />
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onCloseMobile}
          className="lg:hidden rounded-lg p-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 px-2 text-xs font-semibold tracking-wider text-[#6b7280]">
        MENU
      </div>

      <nav className="mt-3 flex-1" aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {navItems.map(({ name, href, Icon, iconSrc }) => {
            const active = isActive(href);
            const isSettings = href === "/settings";
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={classNames(
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#6d28d9]",
                    active
                      ? "bg-[#5E2A8C] text-white shadow"
                      : "text-[#111827]/80 hover:bg-[#f5f3ff] hover:text-[#4c1d95]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt=""
                      width={20}
                      height={20}
                      className={classNames(
                        "shrink-0 transition",
                        active
                          ? "brightness-0 invert"
                          : "opacity-70 group-hover:opacity-100"
                      )}
                      aria-hidden="true"
                    />
                  ) : Icon ? (
                    <Icon
                      className={classNames(
                        "h-5 w-5 transition-colors",
                        active
                          ? "text-white"
                          : "text-[#6b7280] group-hover:text-[#4c1d95]"
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="truncate">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto px-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[#b91c1c] hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Sign out"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span>Sign out</span>
        </Link>
      </div>
    </div>
  );

  // Desktop sidebar
  return (
    <>
      <aside className="hidden  lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-[#e5e7eb] lg:bg-white">
        {content}
      </aside>

      {/* Mobile overlay drawer */}
      <div
        className={classNames(
          "fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onCloseMobile}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-50 w-72 -translate-x-full border-r border-[#e5e7eb] bg-white shadow-xl transition-transform lg:hidden",
          mobileOpen && "translate-x-0"
        )}
        aria-label="Mobile sidebar"
      >
        {content}
      </aside>
    </>
  );
}