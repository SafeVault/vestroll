"use client";

import React from "react";
import NotificationToggle from "./NotificationToggle";
import { NotificationSettings } from "./types";

type NotificationItemProps = {
  id: number;
  title: string;
  description?: string;
  notificationKey: keyof NotificationSettings;
  isRequired?: boolean;
  value: NotificationSettings[keyof NotificationSettings];
  onToggle: (key: keyof NotificationSettings) => void;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  title,
  description,
  notificationKey,
  isRequired = false,
  value,
  onToggle,
}) => (
  <div
    className={`group cursor-pointer flex items-center justify-between px-2 rounded-sm py-4 border-b border-gray-100 last:border-b-0 transition-colors duration-300 ease-in-out ${
      id % 2 !== 0 ? "bg-[#F5F6F7]" : "bg-white"
    } `}
  >
    <div className="flex-1 relative">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>

      {description && (
        <p
          className="text-xs absolute bottom-[-15px] text-[#5E2A8C] mt-1 opacity-0 max-h-0 overflow-hidden 
                     transition-all duration-300 ease-in-out 
                     group-hover:opacity-100 group-hover:max-h-40"
        >
          {description}
        </p>
      )}
    </div>

    <div className="ml-4">
      {isRequired ? (
        <span className="text-xs text-black">Required</span>
      ) : (
        <NotificationToggle
          isEnabled={value as boolean}
          isRequired={isRequired}
          onClick={() => onToggle(notificationKey)}
        />
      )}
    </div>
  </div>
);

export default NotificationItem;
