interface FormNavigationProps {
  isNextDisable: boolean;
  handleNext?: () => void;
  handlePrev?: () => void;
  previousBtnText?: string;
  nextBtnText?: string;
}
function FormNavigation({
  isNextDisable = true,
  handleNext,
  handlePrev,
  previousBtnText = "prev",
  nextBtnText = "next",
}: FormNavigationProps) {
  return (
    <div className="flex w-full gap-2 sm:gap-4 ">
      <button
        type="button"
        className="w-full px-6 py-4 bg-white border-[1.5px] border-[#17171C] text-[#17171C] text-[16px] font-semibold rounded-[12px] hover:bg-gray-50 transition-colors"
        aria-label="back to previous form step"
        onClick={handlePrev}
      >
        {previousBtnText}
      </button>
      <button
        type="button"
        disabled={isNextDisable}
        onClick={handleNext}
        className="w-full px-6 py-4 bg-[#5E2A8C] text-[16px] text-white font-semibold rounded-[12px] hover:bg-purple-700 transition-colors"
        aria-label="move to the next form step"
      >
        {nextBtnText}
      </button>
    </div>
  );
}

export default FormNavigation;
