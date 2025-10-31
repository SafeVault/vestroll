"use client";

import React, { useState } from "react";
import StepIndicator from "./StepIndicator";
import Step2 from "./Step2";
import Step1 from "./Step1";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const handleFormTitle = () => {
    switch (currentStep) {
      case 2:
        return "Registered address";
      case 3:
        return "Billing address";
      default:
        return "Company profile";
    }
  };

  const totalSteps = 3;

  // TODO: add form validation before proceeding to next step
  // add form submission logic

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg mx-auto">
      <h2 className="text-lg md:text-xl font-semibold text-[#414F62] mb-4">{handleFormTitle()}</h2>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <Step1 formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 2 && (
        <Step2 formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 3 && (
        <Step2 formData={formData} setFormData={setFormData} />
      )}

      {/* Navigation Buttons */}
      {currentStep === 1 ?
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
          className="flex-1 px-6 py-2 bg-violet-600 text-white rounded-md cursor-pointer"
        >
          Continue
        </button>
      </div>
      : (
      <div className="flex justify-between mt-8 gap-3">
        <button
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          className="flex-1 px-6 py-2 border-2 border-neutral-900 rounded-md
                  text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
          disabled={currentStep === totalSteps}
          className="flex-1 px-6 py-2 bg-violet-600 text-white rounded-md
                    cursor-pointer"
        >
          {currentStep === totalSteps ? "Save" : "Continue"}
        </button>
      </div>
      )}
    </div>
  );
};

export default MultiStepForm;
