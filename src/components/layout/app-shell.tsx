"use client";

import { useState } from "react";
import avatar from "@public/avatar/avatar.png";
import Image, { StaticImageData } from "next/image";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";
import Sidebar from "./sidebar";
import Link from "next/link";
import { Menu } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    userType?: string;
    avatar?: string | StaticImageData;
  };
}

export default function AppShell({
  children,
  user = {
    name: "Peter",
    email: "peter@vestroll.com",
    userType: "Administrator",
    avatar: avatar,
  },
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <div className="flex-1 flex flex-col">
          {/* Top Navigation Header */}
          <DesktopHeader 
            user={{
              name: user.name,
              userType: user.userType,
              avatar: user.avatar,
              miniAvatar: "/avatar/component4.svg"
            }}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
