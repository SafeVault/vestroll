"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageUploadModal from "./ImageUploadModal";
import {
  ProfileFormData,
  ProfileFormErrors,
  UserProfile,
  PasswordFormData,
} from "./types";

import SecuritySection from "./SecuritySection";

interface ProfileFormProps {
  userProfile: UserProfile;
  onSave: (data: ProfileFormData) => Promise<void>;
  onImageSave: (imageFile: File) => Promise<void>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  userProfile,
  onSave,
  onImageSave,
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: userProfile.name,
    email: userProfile.email,
  });
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ProfileFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ProfileFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  const handlePasswordChange = async (data: PasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Password changed successfully");
      // In a real app, you'd make an API call here
    } catch (error) {
      console.error("Failed to change password:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave(formData);
      setIsEditing(false); // Exit edit mode on successful save
    } catch (error) {
      console.error("Failed to save profile:", error);
      // Handle error (could show a toast notification)
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <div className="space-y-8">
        {/* Profile Image Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-[#FFFFFF] p-4 rounded-lg">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#5E2A8C] flex items-center justify-center">
              {userProfile.avatar ? (
                <Image
                  src={"/profileImage.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <span className="text-white text-xl font-semibold">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {userProfile.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3 truncate">
              {userProfile.email}
            </p>
          </div>

          <button
            onClick={() => setIsImageModalOpen(true)}
            className="flex flex-row items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#5E2A8C] border border-[#5E2A8C] rounded-lg hover:bg-[#5E2A8C] hover:text-white transition-colors w-full sm:w-auto justify-center"
          >
            <span>
              <Image src={"/upload.png"} alt="upload" width={16} height={16} />
            </span>
            <span className="hidden sm:inline">Upload image</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </div>

        {/* General Section */}
        <div className="bg-[#FFFFFF] p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <h2 className="text-lg font-medium text-gray-900">General</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex flex-row items-center gap-2 text-xs sm:text-sm text-[#5E2A8C] hover:underline border border-[#5E2A8C] rounded-lg px-3 py-2 w-full sm:w-auto justify-center"
            >
              <Image src={"/pen.png"} alt="edit" width={16} height={16} />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E2A8C] focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E2A8C] focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: userProfile.name,
                      email: userProfile.email,
                    });
                    setErrors({});
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#5E2A8C] rounded-lg hover:bg-[#4A1F6F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 bg-[#F5F6F7] p-3 rounded-lg gap-2">
                <span className="text-sm text-gray-600">Name</span>
                <span className="text-sm font-medium text-gray-900 truncate">
                  {userProfile.name}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 bg-white p-3 rounded-lg gap-2">
                <span className="text-sm text-gray-600">Account email</span>
                <span className="text-sm font-medium text-gray-900 truncate">
                  {userProfile.email}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 bg-[#F5F6F7] p-3 rounded-lg gap-2">
                <span className="text-sm text-gray-600">Password</span>
                <span className="text-sm font-medium text-gray-900">
                  ••••••••••
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          <SecuritySection onPasswordChange={handlePasswordChange} />
        </div>
      </div>

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={onImageSave}
        currentImage={userProfile.avatar}
      />
    </>
  );
};

export default ProfileForm;
