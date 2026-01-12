"use client";

import React, { useState } from "react";
import Stepper from "./ui/stepper";

const steps = [
  { id: 1, title: "Choose Contract type", content: <ContractType /> },
  { id: 2, title: "Project Details", content: null },
  { id: 3, title: "Buf Title", content: null },
];

function ContractType() {
  return (
    <ul className="grid w-full gap-6 md:grid-cols-2">
      <li>
        <input
          type="radio"
          id="hosting-small"
          name="hosting"
          value="hosting-small"
          className="hidden peer"
          required
        />
        <label
          htmlFor="hosting-small"
          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">0-50 MB</div>
            <div className="w-full">Good for small websites</div>
          </div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="hosting-big"
          name="hosting"
          value="hosting-big"
          className="hidden peer"
        />
        <label
          htmlFor="hosting-big"
          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">500-1000 MB</div>
            <div className="w-full">Good for large websites</div>
          </div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="hosting-medium"
          name="hosting"
          value="hosting-medium"
          className="hidden peer"
        />
        <label
          htmlFor="hosting-medium"
          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">500-1000 MB</div>
            <div className="w-full">Good for large websites</div>
          </div>
        </label>
      </li>
    </ul>
  );
}

function Contracts() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <section className="min-h-[50vh] rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
      <div className="space-y-20">
        <div className="space-y-2">
          <h2 className="font-semibold text-xl text-gray-900">
            {steps[activeStep].title}
          </h2>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
        <StepContent steps={steps} activeStep={activeStep} />
        <StepControls
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </div>
    </section>
  );
}

function StepContent({ steps, activeStep }: { steps: any[]; activeStep: number }) {
  if (!steps[activeStep]) return null;
  return <div>{steps[activeStep].content}</div>;
}

function StepControls({
  steps,
  activeStep,
  handleBack,
  handleNext,
}: {
  steps: any[];
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
}) {
  return (
    <div className="flex items-center">
      <button
        disabled={activeStep === 0}
        onClick={handleBack}
        className="flex-1 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        className="flex-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}
export default Contracts;