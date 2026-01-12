import React from "react";
import { EmptyStateIcon } from "@/components/shared/icons";
interface EmptyStateProps {
  title: string;
  description: string;
}
function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex items-center text-center flex-col w-fit mx-auto px-4 lg:py-8">
      <EmptyStateIcon />

      <p className="text-gray-600 dark:text-gray-150  font-semibold mb-1">
        {title}
      </p>

      <p className="text-xs font-medium text-gray-400">{description}</p>
    </div>
  );
}

export default EmptyState;
