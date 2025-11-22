"use client";

import { useState } from "react";
import ContractDetails from "@/components/contracts/ContractDetails";
import ProjectDetails from "@/components/contracts/ProjectDetails";
import EmployeeDetails from "@/components/contracts/EmployeeDetails";
import { ComplianceForm } from "@/components/contracts/ComplianceForm";
import ContractReviewAccordion from "@/components/contracts/Sign&Review";
import ContractReviewModal from "@/components/contracts/ContractReviewModal";

interface ContractFormData {
  contractType: number;
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
  paymentType: string;
  paymentFrequency?: "Hourly" | "Daily" | "Weekly" | "Per Deliverable";
}

interface FormErrors {
  [key: string]: string;
}

const steps = [
  { id: 1, name: "Choose contract Type" },
  { id: 2, name: "Project Details" },
  { id: 3, name: "Employee Details" },
  { id: 4, name: "Contract Details" },
  { id: 5, name: "Compliance Details" },
  { id: 6, name: "Review & Sign" },
];

export default function CreateContractPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [formData, setFormData] = useState<ContractFormData>({
    contractType: 0,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    startDate: "",
    endDate: "",
    terminationNotice: "",
    network: "Ethereum",
    asset: "USD", //USD for now
    amount: "2000.00",
    calculatedAmount: "1974.849",
    invoiceFrequency: "",
    issueInvoiceOn: "",
    paymentDue: "",
    firstInvoiceType: "full",
    firstInvoiceDate: "",
    firstInvoiceAmount: "",
    walletAddress: "",
    walletType: "",
    contractDuration: "",
    renewalTerms: "",
    milestones: [],
    taxType: "",
    taxId: "",
    taxRate: "",
    uploadedFiles: [],
    paymentType: "",
    paymentFrequency: "Hourly",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const onPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const onNext = () => {
    // Add validation logic here before moving to next step
    if (currentStep < 6) {
      // You can add step-specific validation here
      if (currentStep === 4) {
        // Validate contract details before moving forward
        // The ContractDetails component handles its own validation
      }
      setCurrentStep((s) => s + 1);
    } else if (currentStep === 6) {
      // show review modal if current step is 6
      setShowReviewModal(true);
    }
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-[#414F62]">
          {steps.find((s) => s.id === currentStep)?.name}
        </h2>
        <span className="text-sm text-[#7F8C9F]">
          Step {currentStep} of {steps.length}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-1 flex-1 transition-colors duration-300 ${step.id <= currentStep ? "bg-[#5E2A8C]" : "bg-[#E5E7EB]"
              } rounded-full`}
          />
        ))}
      </div>
    </div>
  );

  const handleFormDataChange = (data: ContractFormData) => {
    setFormData(data);
  };

  const handleErrorsChange = (newErrors: FormErrors) => {
    setErrors(newErrors);
  };

  const handleToggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  }

  const handleCreateContract = () => {
    console.log("Creating contract with data:", formData);
    // TODO: Add API call to create contract
    // Example:
    // try {
    //   const response = await createContractAPI(formData);
    //   if (response.success) {
    //     router.push('/contracts?success=true');
    //   }
    // } catch (error) {
    //   console.error('Error creating contract:', error);
    // }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div onClick={() => {
                    handleFormDataChange({ ...formData, contractType: 1 });
                    setCurrentStep(currentStep + 1);
                  }}
                className="w-full max-w-96 p-6 bg-[#F5F6F7] rounded-lg border border-transparent
                        hover:border-primary-500 hover:bg-[#F3EBF9] transition-colors
                          cursor-pointer">
                <h4 className="font-semibold text-[#17171C] mb-1">Fixed Rate</h4>
                <p className="text-sm text-[#7F8C9F]">
                  For contracts that have a fixed rate each payment cycle.
                </p>
              </div>
              <div onClick={() => {
                    handleFormDataChange({ ...formData, contractType: 2 });
                    setCurrentStep(currentStep + 1);
                  }}
                className="w-full max-w-96 p-6 bg-[#F5F6F7] rounded-lg border border-transparent
                        hover:border-primary-500 hover:bg-[#F3EBF9] transition-colors
                          cursor-pointer">
                <h4 className="font-semibold text-[#17171C] mb-1">Pay as you go</h4>
                <p className="text-sm text-[#7F8C9F]">
                  For contracts that require time sheets or work submissions each payment cycle.
                </p>
              </div>
              <div onClick={() => {
                    handleFormDataChange({ ...formData, contractType: 3 });
                    setCurrentStep(currentStep + 1);
                  }}
                className="w-full max-w-96 p-6 bg-[#F5F6F7] rounded-lg border border-transparent
                        hover:border-primary-500 hover:bg-[#F3EBF9] transition-colors
                          cursor-pointer">
                <h4 className="font-semibold text-[#17171C] mb-1">Milestone</h4>
                <p className="text-sm text-[#7F8C9F]">
                  For contracts with milestones that get paid each time they're completed.
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return <ProjectDetails />;
      case 3:
        return <EmployeeDetails />;
      case 4:
        return (
          <ContractDetails
            formData={formData}
            onFormDataChange={handleFormDataChange}
            errors={errors}
            onErrorsChange={handleErrorsChange}
            onNext={() => setCurrentStep((s) => Math.min(6, s + 1))}
            onPrev={() => setCurrentStep((s) => Math.max(1, s - 1))}
          />
        );
      case 5:
        return <ComplianceForm />;
      case 6:
        return <ContractReviewAccordion />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <ProgressBar />
      {renderStep()}
      {/* Bottom Navigation */}
      { currentStep > 1 && (
      <div className="flex justify-between mt-8 gap-4">
        <button
          onClick={onPrev}
          className="flex-1 py-3 border border-black text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 bg-[#5E2A8C] text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
        >
          Next
        </button>
      </div>
      )}
      {showReviewModal && (
        <ContractReviewModal
          onClose={() => setShowReviewModal(false)}
          onConfirm={handleCreateContract}  // your final submit handler
          formData={formData}
        />
      )}
    </div>
  );
}
