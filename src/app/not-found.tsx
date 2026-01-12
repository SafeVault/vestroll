"use client";

import React, { useState } from "react";
import MobileHeader from "@/components/layout/mobile-header";
import Sidebar from "@/components/layout/sidebar";
import Image, { StaticImageData } from "next/image";
import miniAvatar from "@public/avatar/component4.svg";
import Link from "next/link";

interface User {
  name: string;
  email?: string;
  userType?: string;
  avatar?: string | StaticImageData;
}

const NotFound = ({
  user = { name: "Peter", avatar: miniAvatar },
}: {
  user?: User;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Mobile Header (hidden on desktop) */}
      <MobileHeader user={user} onOpenMenu={() => setMobileOpen(true)} />

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-6 flex flex-col items-center text-center">
          {/* Illustration */}
          <Image
            src="/pana.png"
            alt="404 error"
            width={400}
            height={250}
            className="w-full max-w-sm object-contain mb-4"
          />

          {/* Text */}
          <h3 className="font-semibold text-xl text-gray-700 mb-2">
            Oops, there seems to be a problem
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Sorry, the page you are looking for doesn’t exist or has been moved.
            Here are some helpful links:
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="-1"
              className="flex-1 bg-blue-600 py-2.5 px-4 rounded-xl text-white text-sm font-medium hover:bg-blue-500 transition text-center"
            >
              Go Back
            </Link>
            <Link
              href="/"
              className="flex-1 bg-blue-600 py-2.5 px-4 rounded-xl text-white text-sm font-medium hover:bg-blue-500 transition text-center"
            >
              Home Page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
