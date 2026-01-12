interface ContinueButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export function ContinueButton({ 
  disabled = false, 
  loading = false, 
  onClick 
}: ContinueButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      onClick={onClick}
      className="
        w-full bg-purple-800 hover:bg-purple-700 disabled:bg-purple-300
        text-white py-3 px-4 rounded-lg font-semibold text-base
        transition-all duration-200 transform
        hover:scale-[1.02] active:scale-[0.98]
        disabled:cursor-not-allowed disabled:hover:scale-100
        focus:outline-none focus:ring-4 focus:ring-purple-700/20
      "
      aria-label={loading ? "Verifying code..." : "Continue with verification"}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Verifying...</span>
        </div>
      ) : (
        "Continue"
      )}
    </button>
  );
}