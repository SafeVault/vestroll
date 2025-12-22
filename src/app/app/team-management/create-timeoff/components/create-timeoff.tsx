"use client";

import { MoveLeft } from "lucide-react";
import { generateMockEmployees } from "../../utils";
import { CreateTimeOffForm } from "../../components/timeOff/CreateTimeOffForm";
import { useRouter } from "next/navigation";

export default function CreateTimeOffPage() {
    const router = useRouter();
  const allEmployees = generateMockEmployees();
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header */}
      <header
        className="bg-background-b0 w-full py-4"
      >
        <div className="px-7 space-y-3 pt-2 w-fit">
          <p
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <MoveLeft className="w-4 h-4" /> Back
          </p>
          <p className="text-lg font-semibold">Create time off</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <CreateTimeOffForm employees={allEmployees} />
      </main>
    </div>
  );
};
