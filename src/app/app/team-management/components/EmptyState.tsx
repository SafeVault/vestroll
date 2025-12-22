// A component to show when there is no data to display.

import { Search } from "lucide-react";
import Image from "next/image";

type EmptyStateProps = {
  title?: string;
  message?: string;
};

export const EmptyState = ({
  title = "No records yet",
  message = "Records will be displayed here once added to the system.",
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <div className="relative mb-6">
      <Image src="/empty-state.png" alt="Empty State" width={200} height={200} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-center max-w-sm">{message}</p>
  </div>
);
