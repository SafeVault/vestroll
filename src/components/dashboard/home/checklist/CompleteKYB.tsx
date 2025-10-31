"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import Dropdown from "@/components/ui/dropdown";
import FileUpload from "@/components/ui/file-upload";

interface FormData {
  businessRegistrationType: string;
  businessRegistrationNo: string;
  incorporationCertificate: File | null;
  memorandumArticle: File | null;
  formC02C07: File | null;
}

const businessRegistrationTypes = [
  "Limited Liability Company (LLC)",
  "Corporation",
  "Partnership",
  "Sole Proprietorship",
  "Limited Partnership (LP)",
  "Limited Liability Partnership (LLP)",
  "S Corporation",
  "Non-Profit Corporation",
  "Professional Corporation",
  "Other"
];



export default function CompleteKYBPage() {
  const [formData, setFormData] = useState<FormData>({
    businessRegistrationType: "",
    businessRegistrationNo: "",
    incorporationCertificate: null,
    memorandumArticle: null,
    formC02C07: null,
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Registration Type */}
        <Dropdown
          label="Business registration type"
          options={businessRegistrationTypes}
          value={formData.businessRegistrationType}
          onChange={(value) => handleInputChange("businessRegistrationType", value)}
          placeholder="--"
        />

        {/* Business Registration Number */}
        <InputField
          id="businessRegistrationNo"
          label="Enter business registration No."
          type="text"
          placeholder="--"
          value={formData.businessRegistrationNo}
          onChange={(e) => handleInputChange("businessRegistrationNo", e.target.value)}
        />

        {/* File Uploads */}
        <FileUpload
          key="incorporation-certificate"
          label="Upload Incorporation Certificate"
          onFileSelect={(file) => handleFileSelect("incorporationCertificate", file)}
          file={formData.incorporationCertificate}
          maxSize={5}
          isUploading={false}
          uploadProgress={0}
        />

        <FileUpload
          key="memorandum-article"
          label="Memorandum & Article of Association"
          onFileSelect={(file) => handleFileSelect("memorandumArticle", file)}
          file={formData.memorandumArticle}
          maxSize={5}
          isUploading={false}
          uploadProgress={0}
        />

        <FileUpload
          key="form-c02-c07"
          label="Form C02/C07"
          onFileSelect={(file) => handleFileSelect("formC02C07", file)}
          file={formData.formC02C07}
          maxSize={5}
          isUploading={false}
          uploadProgress={0}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full bg-[#5E2A8C] py-6 lg:h-[56px] mt-4 hover:bg-[#4A1F6F] text-white rounded-[12px]"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
