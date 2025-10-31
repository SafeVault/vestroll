"use client";

import { ArrowLeft } from "lucide-react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function BackButton({ children, className }: Props) {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className={
        className ?? "flex items-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      }
    >
      <ArrowLeft size={16} className="mr-2" />
      {children}
    </button>
  );
}
