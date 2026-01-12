import React from "react";

export default function StepIndicator({ totalSteps, currentStep }: { totalSteps: number; currentStep: number }) {
    return (
        <div className="flex gap-2">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div
                    key={index}
                    className={`h-1 flex-1 rounded ${index < currentStep ? "bg-[#5E2A8C]" : "bg-[#DCE0E5]"
                        }`}
                />
            ))}
        </div>
    );
};