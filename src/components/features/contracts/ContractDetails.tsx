"use client";

import { useState, useMemo, useEffect } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import InputField from "@/components/shared/InputField";
import Dropdown from "@/components/ui/dropdown";
import { z } from "zod";

interface ContractFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  startDate: string;
  endDate: string;
  terminationNotice: string;
  network: string;
  asset: string;
  amount: string;
  calculatedAmount: string;
  invoiceFrequency: string;
  issueInvoiceOn: string;
  paymentDue: string;
  firstInvoiceType: "full" | "custom";
  firstInvoiceDate: string;
  firstInvoiceAmount: string;
  walletAddress: string;
  walletType: string;
  contractDuration: string;
  renewalTerms: string;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    amount: string;
  }>;
  taxType: string;
  taxId: string;
  taxRate: string;
  uploadedFiles: File[];
  paymentFrequency?: "Hourly" | "Daily" | "Weekly" | "Per Deliverable";
}

interface FormErrors {
  [key: string]: string;
}

interface ContractDetailsProps {
  formData: ContractFormData;
  onFormDataChange: (data: ContractFormData) => void;
  errors: FormErrors;
  onErrorsChange: (errors: FormErrors) => void;
  onNext: () => void;
  onPrev: () => void;
}

const networks = [
  { label: "Ethereum", icon: "/eth.svg" },
  { label: "Polygon", icon: "/eth.svg" },
  { label: "Binance Smart Chain", icon: "/eth.svg" },
  { label: "Arbitrum", icon: "/eth.svg" },
];

const assets = [
  { label: "USDT", icon: "/Tether.svg" },
  { label: "USDC", icon: "/usdc.svg" },
  { label: "BTC", icon: "/bitcoin.svg" },
  { label: "Stellar", icon: "/stellar.svg" },
];

const invoiceFrequencies = ["Weekly", "Bi-weekly", "Monthly", "Quarterly", "Annually"];
const issueInvoiceOptions = [
  "1st of the month",
  "15th of the month",
  "Last day of the month",
  "Start of contract period",
  "End of contract period",
];
const paymentDueOptions = [
  "Immediately",
  "Within 7 days",
  "Within 14 days",
  "Within 30 days",
  "Within 60 days",
  "Within 90 days",
];
const taxTypes = [
  "VAT - Value Added Tax",
  "GST - Goods and Services Tax",
  "HST - Harmonized Sales Tax",
  "PST - Provincial Sales Tax",
  "SST - State Sales Tax",
];
const taxRates = ["5%", "7.5%", "10%", "13%", "15%", "18%", "20%", "25%"];

// Zod schema for validation
const milestoneSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Amount must be greater than 0"
    ),
});

const contractSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  terminationNotice: z.string().optional(),
  network: z.string().min(1, "Network is required"),
  asset: z.string().min(1, "Asset is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Amount must be greater than 0"
    ),
  calculatedAmount: z.string().optional(),
  invoiceFrequency: z.string().min(1, "Invoice frequency is required"),
  issueInvoiceOn: z.string().optional(),
  paymentDue: z.string().min(1, "Payment due is required"),
  firstInvoiceType: z.enum(["full", "custom"]),
  firstInvoiceDate: z.string().optional(),
  firstInvoiceAmount: z.string().optional(),
  walletAddress: z.string().optional(),
  walletType: z.string().optional(),
  contractDuration: z.string().optional(),
  renewalTerms: z.string().optional(),
  milestones: z.array(milestoneSchema).optional(),
  taxType: z.string().optional(),
  taxId: z.string().optional(),
  taxRate: z.string().optional(),
  uploadedFiles: z.array(z.any()).optional(),
});

export default function ContractDetails({
  formData,
  onFormDataChange,
  errors,
  onErrorsChange,
  onNext,
  onPrev,
}: ContractDetailsProps) {
  const [dragOver, setDragOver] = useState(false);
  // ✅ FIXED: Proper useState syntax on single line
  const [paymentFrequency, setPaymentFrequency] = useState<"Hourly" | "Daily" | "Weekly" | "Per Deliverable">("Hourly");

  // Sync payment frequency with formData
  useEffect(() => {
    if (formData.paymentFrequency) {
      setPaymentFrequency(formData.paymentFrequency);
    }
  }, [formData.paymentFrequency]);

  const validateForm = (): boolean => {
    try {
      contractSchema.parse(formData);
      onErrorsChange({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path.length > 0) {
            const fieldName = err.path.join(".");
            newErrors[fieldName] = err.message;
          }
        });
        onErrorsChange(newErrors);
      }
      return false;
    }
  };

  const isValid = useMemo(() => {
    try {
      contractSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  }, [formData]);

  const handleInputChange = (field: keyof ContractFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
    if (errors[field]) {
      onErrorsChange({ ...errors, [field]: "" });
    }
  };

  const addMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      title: "",
      description: "",
      dueDate: "",
      amount: "",
    };
    onFormDataChange({
      ...formData,
      milestones: [...formData.milestones, newMilestone],
    });
  };

  const removeMilestone = (id: string) => {
    onFormDataChange({
      ...formData,
      milestones: formData.milestones.filter((m) => m.id !== id),
    });
  };

  const updateMilestone = (id: string, field: string, value: string) => {
    onFormDataChange({
      ...formData,
      milestones: formData.milestones.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    });

    const milestoneIndex = formData.milestones.findIndex((m) => m.id === id);
    const milestoneErrorKey = `milestones.${milestoneIndex}.${field}`;
    if (errors[milestoneErrorKey]) {
      onErrorsChange({ ...errors, [milestoneErrorKey]: "" });
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      onFormDataChange({
        ...formData,
        uploadedFiles: [...formData.uploadedFiles, ...newFiles],
      });
    }
  };

  const removeFile = (index: number) => {
    onFormDataChange({
      ...formData,
      uploadedFiles: formData.uploadedFiles.filter((_, i) => i !== index),
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const calculateGasFee = () => {
    const amt = Number(formData.amount);
    if (amt < 10) return 0.5;
    if (amt < 20) return 2.99;
    if (amt > 100) return 10.12;
    return 1.87;
  };

  const gasFee = calculateGasFee();
  const netAmount = Number(formData.amount) - gasFee;

  const DatePicker = ({
    label,
    value,
    onChange,
    error,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-[#414F62] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#5E2A8C] focus:border-transparent text-[#414F62] bg-[#F5F6F7] border-0 ${error ? "ring-2 ring-red-500" : ""
            }`}
        />
        <Image
          src="/calander.svg"
          alt="calendar"
          width={16}
          height={17}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );

  const FileUpload = () => (
    <div>
      <label className="block text-sm font-medium text-[#414F62] mb-2">
        Contract Documents
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragOver ? "border-[#5E2A8C] bg-[#F3EBF9]" : "border-[#E5E7EB] bg-[#F5F6F7]"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto text-[#7F8C9F] mb-2" size={24} />
        <p className="text-[#414F62] mb-2">
          Drag and drop files here, or click to select
        </p>
        <p className="text-sm text-[#7F8C9F]">PDF, DOC, DOCX up to 10MB</p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-2 inline-block px-4 py-2 bg-[#5E2A8C] text-white rounded-lg hover:bg-[#4A2270] cursor-pointer transition-colors"
        >
          Choose Files
        </label>
      </div>
      {formData.uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {formData.uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#F5F6F7] rounded-lg"
            >
              <span className="text-sm text-[#414F62]">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Contract Details */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker
            label="Start date"
            value={formData.startDate}
            onChange={(value) => handleInputChange("startDate", value)}
            error={errors.startDate}
          />
          <DatePicker
            label="End date (optional)"
            value={formData.endDate}
            onChange={(value) => handleInputChange("endDate", value)}
            error={errors.endDate}
          />
        </div>

        <div className="mt-6">
          <InputField
            id="terminationNotice"
            label="Termination notice period (days)"
            value={formData.terminationNotice}
            onChange={(e) =>
              handleInputChange("terminationNotice", e.target.value)
            }
            error={errors.terminationNotice}
            placeholder="Enter number of days"
          />
          <p className="text-sm mt-2 text-[#7F8C9F]">
            Either party may terminate this contract by the specified notice,
            after which the contract will end.
          </p>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <h3 className="text-lg font-semibold text-[#17171C] mb-6">
          Payment details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Dropdown
            label="Network"
            value={formData.network}
            options={networks}
            onChange={(value) => handleInputChange("network", value)}
            error={errors.network}
          />

          <div>
            <label className="block text-sm font-medium text-[#414F62] mb-2">
              Asset
              <span className="float-right text-[#17171C]">
                +{netAmount.toFixed(3)}
              </span>
            </label>
            <div className="flex items-center w-full px-4 py-3 bg-[#F5F6F7] rounded-lg">
              <div className="flex items-center gap-2 flex-1">
                <Image
                  src={assets.find((a) => a.label === formData.asset)?.icon || "/Tether.svg"}
                  alt={formData.asset}
                  width={24}
                  height={24}
                />
                <select
                  value={formData.asset}
                  onChange={(e) => handleInputChange("asset", e.target.value)}
                  className="bg-transparent border-0 focus:outline-none text-[#414F62] cursor-pointer appearance-none"
                >
                  {assets.map((a) => (
                    <option key={a.label} value={a.label}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-[#414F62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input
                type="text"
                value={`$ ${formData.amount}`}
                onChange={(e) => handleInputChange("amount", e.target.value.replace("$ ", ""))}
                className="text-right bg-transparent border-0 focus:outline-none text-[#414F62] w-32"
              />
            </div>
            {errors.asset && <p className="text-red-500 text-sm mt-1">{errors.asset}</p>}
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
        </div>

        {/* Payment Frequency - NEW ADDITION FROM FIGMA */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#414F62] mb-3">
            Rate unit (Payment is based on the exact number of units submitted.)
          </label>
          <div className="flex flex-wrap gap-3">
            {(["Hourly", "Daily", "Weekly", "Per Deliverable"] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => {
                  setPaymentFrequency(freq);
                  onFormDataChange({ ...formData, paymentFrequency: freq });
                }}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${paymentFrequency === freq
                  ? "bg-[#5E2A8C] text-white"
                  : "bg-white border border-[#E5E7EB] text-[#414F62] hover:border-[#5E2A8C]"
                  }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div>
        <h3 className="text-lg font-semibold text-[#17171C] mb-6">
          Invoice details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown
            label="Invoice frequency"
            value={formData.invoiceFrequency}
            options={invoiceFrequencies}
            onChange={(value) => handleInputChange("invoiceFrequency", value)}
            error={errors.invoiceFrequency}
            placeholder="--"
          />
          <Dropdown
            label="Issue Invoice on"
            value={formData.issueInvoiceOn}
            options={issueInvoiceOptions}
            onChange={(value) => handleInputChange("issueInvoiceOn", value)}
            placeholder="--"
          />
        </div>
        <div className="mt-6">
          <Dropdown
            label="Payment due"
            value={formData.paymentDue}
            options={paymentDueOptions}
            onChange={(value) => handleInputChange("paymentDue", value)}
            error={errors.paymentDue}
            placeholder="--"
          />
        </div>
      </div>

      {/* First Invoice */}
      <div>
        <h3 className="text-lg font-semibold text-[#17171C] mb-6">
          First Invoice
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="firstInvoiceType"
                value="full"
                checked={formData.firstInvoiceType === "full"}
                onChange={(e) =>
                  handleInputChange("firstInvoiceType", e.target.value)
                }
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${formData.firstInvoiceType === "full"
                  ? "border-[#5E2A8C] bg-[#5E2A8C]"
                  : "border-[#E5E7EB] bg-white"
                  }`}
              >
                {formData.firstInvoiceType === "full" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm font-medium text-[#414F62]">
                Full amount
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="firstInvoiceType"
                value="custom"
                checked={formData.firstInvoiceType === "custom"}
                onChange={(e) =>
                  handleInputChange("firstInvoiceType", e.target.value)
                }
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${formData.firstInvoiceType === "custom"
                  ? "border-[#5E2A8C] bg-[#5E2A8C]"
                  : "border-[#E5E7EB] bg-white"
                  }`}
              >
                {formData.firstInvoiceType === "custom" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm font-medium text-[#414F62]">
                Custom amount
              </span>
            </label>
          </div>
          <p className="text-sm text-[#7F8C9F]">
            You would receive the full monthly amount for your first payment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              label="Date"
              value={formData.firstInvoiceDate}
              onChange={(value) =>
                handleInputChange("firstInvoiceDate", value)
              }
              error={errors.firstInvoiceDate}
            />
            <InputField
              id="firstInvoiceAmount"
              label="Amount"
              placeholder="0.00"
              value={formData.firstInvoiceAmount}
              onChange={(e) =>
                handleInputChange("firstInvoiceAmount", e.target.value)
              }
              error={errors.firstInvoiceAmount}
            />
          </div>
        </div>
      </div>

      {/* Add inclusive tax (optional) */}
      <div>
        <h3 className="text-lg font-semibold text-[#17171C] mb-6">
          Add inclusive tax (optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Dropdown
            label="Tax type"
            value={formData.taxType}
            options={taxTypes}
            onChange={(value) => handleInputChange("taxType", value)}
            error={errors.taxType}
            placeholder="e.g VAT, GST, HST, PST"
          />
          <InputField
            id="taxId"
            label="ID / account number"
            placeholder="Enter tax ID or account number"
            value={formData.taxId}
            onChange={(e) => handleInputChange("taxId", e.target.value)}
            error={errors.taxId}
          />
        </div>
        <Dropdown
          label="Tax rate"
          value={formData.taxRate}
          options={taxRates}
          onChange={(value) => handleInputChange("taxRate", value)}
          placeholder="--"
        />
      </div>

      {/* Contract Wallet - PRESERVED */}
      <div>
        <h3 className="text-lg font-semibold text-[#17171C] mb-6">
          Contract Wallet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="walletAddress"
            label="Wallet Address"
            placeholder="Enter wallet address"
            value={formData.walletAddress}
            onChange={(e) => handleInputChange("walletAddress", e.target.value)}
            error={errors.walletAddress}
          />
          <InputField
            id="walletType"
            label="Wallet Type"
            placeholder="e.g., MetaMask, Trust Wallet"
            value={formData.walletType}
            onChange={(e) => handleInputChange("walletType", e.target.value)}
            error={errors.walletType}
          />
        </div>
      </div>

      {/* End Period - PRESERVED */}
      <div>
        <h3 className="text-lg font-semibold text-[#17171C] mb-6">
          Contract Period
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="contractDuration"
            label="Contract Duration"
            placeholder="e.g., 6 months"
            value={formData.contractDuration}
            onChange={(e) =>
              handleInputChange("contractDuration", e.target.value)
            }
            error={errors.contractDuration}
          />
          <InputField
            id="renewalTerms"
            label="Renewal Terms"
            placeholder="e.g., Auto-renew"
            value={formData.renewalTerms}
            onChange={(e) => handleInputChange("renewalTerms", e.target.value)}
            error={errors.renewalTerms}
          />
        </div>
      </div>

      {/* Milestones/Deliverables - PRESERVED */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#17171C]">
            Milestones / Deliverables
          </h3>
          <button
            type="button"
            onClick={addMilestone}
            className="px-4 py-2 bg-[#5E2A8C] text-white rounded-lg hover:bg-[#4A2270] transition-colors text-sm font-medium"
          >
            + Add Milestone
          </button>
        </div>
        {formData.milestones.length === 0 ? (
          <p className="text-[#7F8C9F] text-center py-8">
            No milestones added yet. Click "Add Milestone" to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {formData.milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="p-4 border border-[#E5E7EB] rounded-lg bg-[#F5F6F7]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-[#17171C]">
                    Milestone {index + 1}
                  </h4>
                  <button
                    onClick={() => removeMilestone(milestone.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id={`milestone-title-${milestone.id}`}
                    label="Title"
                    placeholder="Milestone title"
                    value={milestone.title}
                    onChange={(e) =>
                      updateMilestone(milestone.id, "title", e.target.value)
                    }
                    error={errors[`milestones.${index}.title`]}
                  />
                  <InputField
                    id={`milestone-amount-${milestone.id}`}
                    label="Amount"
                    placeholder="0.00"
                    value={milestone.amount}
                    onChange={(e) =>
                      updateMilestone(milestone.id, "amount", e.target.value)
                    }
                    error={errors[`milestones.${index}.amount`]}
                  />
                  <div className="md:col-span-2">
                    <InputField
                      id={`milestone-description-${milestone.id}`}
                      label="Description"
                      placeholder="Describe the milestone"
                      value={milestone.description}
                      onChange={(e) =>
                        updateMilestone(
                          milestone.id,
                          "description",
                          e.target.value
                        )
                      }
                      error={errors[`milestones.${index}.description`]}
                    />
                  </div>
                  <DatePicker
                    label="Due Date"
                    value={milestone.dueDate}
                    onChange={(value) =>
                      updateMilestone(milestone.id, "dueDate", value)
                    }
                    error={errors[`milestones.${index}.dueDate`]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Upload - PRESERVED */}
      <FileUpload />
    </div>
  );
}