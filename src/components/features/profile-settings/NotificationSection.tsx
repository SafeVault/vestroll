"use client";

import React from "react";
import NotificationItem from "./NotificationItem";
import { NotificationSettings } from "./types";

type SectionItem = {
    id: number;
  title: string;
  description?: string;
  key: keyof NotificationSettings;
  isRequired?: boolean;
};

type NotificationSectionProps = {
  title: string;
  items: SectionItem[];
  values: NotificationSettings;
  onToggle: (key: keyof NotificationSettings) => void;
};

const NotificationSection: React.FC<NotificationSectionProps> = ({
  title,
  items,
  values,
  onToggle,
}) => (
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
    <div className="space-y-1">
      {items.map((item) => (
        <NotificationItem
        id={item.id}
          key={item.key}
          title={item.title}
          description={item.description}
          notificationKey={item.key}
          isRequired={item.isRequired}
          value={values[item.key]}
          onToggle={onToggle}
        />
      ))}
    </div>
  </div>
);

export default NotificationSection;
