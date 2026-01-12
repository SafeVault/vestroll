interface StepperProps {
  // Define any props if needed
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}
function Stepper({ totalSteps, currentStep, className }: StepperProps) {
  return (
    <div className="flex gap-2 items-center justify-between ">
      {Array(totalSteps)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            aria-label={`step of ${currentStep}`}
            className={`w-16 sm:w-21 h-1 transition ${className} ease-in-out duration-300 ${index + 1 <= currentStep! ? " bg-primary-500" : "bg-border-primary"} rounded-lg `}
          ></div>
        ))}
    </div>
  );
}

export default Stepper;
