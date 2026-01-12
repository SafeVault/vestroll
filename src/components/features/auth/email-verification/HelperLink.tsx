interface HelperLinkProps {
  onClick?: () => void;
}

export function HelperLink({ onClick }: HelperLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-[#5E2A8C] hover:text-[#4E1F6C] font-medium transition-colors focus:outline-none focus:underline"
    >
      Didn&apos;t get the code?
    </button>
  );
}