"use client";

import { Menu } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface MobileHeaderProps {
  user: {
    name: string;
    avatar?: string | StaticImageData;
  };
  onOpenMenu: () => void;
}

export default function MobileHeader({ user, onOpenMenu }: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-4 py-4 lg:hidden">
      {/* Left - Menu button */}
      <button
        type="button"
        aria-label="Open menu"
        className="rounded-lg p-1.5 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
        onClick={onOpenMenu}
      >
        <Menu className="h-6 w-6 text-[#374151]" />
      </button>

      {/* Right - Search, Notifications and User */}
      <div className="flex items-center gap-2">
        {/* Search icon */}
        <button
          type="button"
          className="border rounded-full border-gray-200 p-1.5 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
          aria-label="Search"
        >
          <svg
            className="h-5 w-5 text-[#414F62]/90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Notification icon */}
        <button
          type="button"
          className="relative p-1.5 border rounded-full border-gray-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
          aria-label="Notifications"
        >
          <Image
            src="/vuesax.svg"
            alt="Notice bell"
            width={20}
            height={20}
            className="h-5 w-5 object-cover"
          />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 h-2 w-2 bg-[#5E2A8C] rounded-full border border-white"></span>
        </button>

        {/* User avatar with mini overlay */}
        <div className="relative h-8 w-8 flex justify-center">
          <div className="relative h-8 w-8 rounded-full overflow-hidden ml-1">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#6d28d9] flex items-center justify-center text-white text-xs font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <Image
            src="/avatar/component4.svg"
            alt="miniAvatar"
            width={16}
            height={16}
            className="h-5 w-5 object-cover absolute bottom-[-5px] right-[-5px]"
          />
        </div>
      </div>
    </div>
  );
}
