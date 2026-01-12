"use client";

import React from "react";

type NotificationToggleProps = {
  isEnabled: boolean;
  isRequired?: boolean;
  onClick: () => void;
};

const NotificationToggle: React.FC<NotificationToggleProps> = ({
  isEnabled,
  isRequired = false,
  onClick,
}) => (
  <button
    onClick={onClick}
    disabled={isRequired}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:ring-offset-2 ${
      isEnabled ? "bg-[#5E2A8C]" : "bg-gray-300"
    } ${isRequired ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
        isEnabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

export default NotificationToggle;
