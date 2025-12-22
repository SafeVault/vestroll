"use client";

import React from "react";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { Employee } from "@/types/teamManagement.types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type EmployeeListProps = {
  employees: Employee[];
};

export const EmployeeList = ({ employees }: EmployeeListProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {employees.map((employee) => (
        <Link
          href={`/app/team-management/${employee.id}`}
          key={employee.id}
          className="bg-white rounded-xl p-3.5 cursor-pointer"
        >
          {/* Top section: Avatar + Name/Role */}
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                src={employee.avatar || "/profileImage.png"}
                alt={employee.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>

            {/* Name and Role */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {employee.name}
              </h3>
              <p className="text-xs text-gray-400">{employee.role}</p>
            </div>
          </div>

          <hr className="mb-3 bg-border-primary"/>

          {/* Bottom section: Both Badges in a row */}
          <div className="flex items-center justify-between gap-3">
            <Badge
              variant="outline"
              className="bg-fill-background text-gray-700 border-gray-300 font-normal rounded-3xl"
            >
              <UserCircle className="w-4 h-4 mr-1.5" />
              {employee.type}
            </Badge>

            <Badge
              variant={
                employee.status.toLowerCase() === "active"
                  ? "default"
                  : "secondary"
              }
              className={`
                ${employee.status.toLowerCase() === "active"
                  ? "bg-green-100 text-green-700 hover:bg-green-100 border-[#26902B]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200"}
                font-semibold rounded-3xl
              `}
            >
              {employee.status}
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  );
};
