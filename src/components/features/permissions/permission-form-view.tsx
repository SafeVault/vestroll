"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";
import { PermissionFormData, User } from "@/types/permissions-tab.types";
import PageHeader from "@/components/layout/PageHeader";
import PermissionsInfoModal from "@/components/features/permissions/PermissionInfoModal";

interface PermissionFormViewProps {
  selectedUser: User | null;
  initialFormData: PermissionFormData;
  initialPermissions: string[];
  onClose: () => void;
  onSave: (formData: PermissionFormData, permissions: string[]) => void;
}

export const availablePermissions: string[] = [
  "Administrator",
  "Team manager",
  "Expenses administrator",
  "External recruiter",
  "Invoice administrator",
  "Payroll administrator",
  "Time off administrator",
];

export default function PermissionFormView({
  selectedUser,
  initialFormData,
  initialPermissions,
  onClose,
  onSave,
}: PermissionFormViewProps) {
  const [formData, setFormData] = useState<PermissionFormData>(initialFormData);
  const [permissions, setPermissions] = useState<string[]>(initialPermissions);
  const [errors, setErrors] = useState<Partial<PermissionFormData>>({});
  const [showInfo, setShowInfo] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PermissionFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePermission = (permission: string): void => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSave = (): void => {
    if (selectedUser || validateForm()) onSave(formData, permissions);
  };

  return (
    <div className="w-full">
      <PageHeader title="Permissions" onBack={onClose} />

      {/* Body background + centering wrapper */}
      <div className="bg-none">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center">
            {/* Card */}
            <div className="w-full max-w-[480px] rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm my-8">
              {/* Full name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  disabled={!!selectedUser}
                  className={`w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 outline-none transition-colors ${
                    selectedUser
                      ? "bg-[#F5F6F7] text-gray-400 cursor-not-allowed"
                      : "bg-[#F5F6F7] border border-gray-300 focus:ring-2 focus:ring-purple-600"
                  } ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  disabled={!!selectedUser}
                  className={`w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 outline-none transition-colors ${
                    selectedUser
                      ? "bg-[#F5F6F7] text-gray-400 cursor-not-allowed"
                      : "bg-[#F5F6F7] border border-gray-300 focus:ring-2 focus:ring-purple-600"
                  } ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Permissions */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Permissions
                  </label>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700" onClick={() => setShowInfo(true)}>
                    <Info className="w-4 h-4 text-orange-500" />
                    More info
                  </button>
                </div>

                {/* Permission chips */}
                <div className="flex flex-wrap gap-2">
                  {availablePermissions.map((permission) => {
                    const isSelected = permissions.includes(permission);
                    return (
                      <button
                        key={permission}
                        type="button"
                        onClick={() => togglePermission(permission)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {permission}
                        {isSelected && (
                          <X className="w-4 h-4 text-purple-600 cursor-pointer" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save button */}
              <button
                onClick={handleSave}
                className="mt-2 w-full h-12 rounded-xl font-medium bg-purple-700 text-white hover:bg-purple-800 transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <PermissionsInfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        iconSrc="/permission-icon.png" // your public asset (the purple circle)
        />
    </div>
  );
}
