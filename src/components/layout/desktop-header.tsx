"use client";

import { ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import avatar from "@public/avatar/avatar.png";   

interface DesktopHeaderProps {
  user: {
    name: string;
    userType?: string;
    avatar?: string | StaticImageData;
    miniAvatar?: string | StaticImageData;
  };
  onSearch?: (value: string) => void;
}

export default function DesktopHeader({ 
  user = { name: "Peter", userType: "Administrator", avatar, miniAvatar: "/avatar/component4.svg" },
  onSearch 
}: DesktopHeaderProps) {
  return (
    <header className="hidden lg:flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      {/* Search input */}
      <div className="flex-1 max-w-[272px]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 py-2  text-sm text-gray-700 placeholder-gray-400 focus:border-[#6d28d9] focus:ring-2 focus:ring-[#6d28d9] focus:outline-none"
          />
          <svg
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative rounded-full border border-[#DCE0E5] p-2 hover:bg-gray-100 focus:outline-none">
          <Image
            src="/vuesax.svg"
            alt="Notifications"
            width={22}
            height={22}
            className="object-contain"
          />
          {/* Purple dot */}
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#6d28d9]"></span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 cursor-pointer">
         <div className="relative h-9 w-9 ">
             <div className="relative h-9 w-9 rounded-full overflow-hidden">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#6d28d9] flex items-center justify-center text-white text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            {/* Mini avatar overlay */}
            {user.miniAvatar && (
              <Image
                src={typeof user.miniAvatar === "string" ? user.miniAvatar : "/avatar/component4.svg"}
                alt="miniAvatar"
                width={16}
                height={16}
                className="absolute bottom-[-3px] right-[-3px] h-4 w-4 object-cover"
              />
            )}
          </div>

         </div>

          {/* User info */}
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
            <span className="text-xs text-gray-500">{user.userType}</span>
          </div>

          {/* Dropdown arrow */}
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
