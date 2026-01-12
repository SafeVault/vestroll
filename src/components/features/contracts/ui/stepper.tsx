"use client";

import React from "react";

interface StepperProps {
  steps: { id: number; title: string; content: React.ReactNode }[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

function Stepper({ steps = [], activeStep, setActiveStep }: StepperProps) {
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2">
        {steps.map((label, index) => {
          return (
            <div
              key={index}
              aria-label={`step of ${label.title ?? label}`}
              className={`w-16 sm:w-21 h-1 transition ease-in-out duration-300 ${index <= activeStep ? " bg-primary-500" : "bg-border-primary"} rounded-lg `}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;