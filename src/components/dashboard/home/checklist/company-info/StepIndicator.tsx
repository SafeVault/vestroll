import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-between mb-6 gap-3">
      {[...Array(totalSteps)].map((_, idx) => {
        const step = idx + 1;
        const isActive = step <= currentStep;
        return (
          <div key={step} className="flex-1 flex items-center">
            <div
              className={`h-1 rounded-full w-full ${
                isActive ? "bg-violet-600" : "bg-gray-200"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
