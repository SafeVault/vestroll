export function FooterLinks() {
  return (
    <footer className="flex justify-center items-center space-x-6 text-xs text-gray-500">
      <a 
        href="#" 
        className="hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:underline"
        aria-label="View Privacy Policy"
      >
        Privacy Policy
      </a>
      <span className="text-gray-300">•</span>
      <a 
        href="#" 
        className="hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:underline"
        aria-label="View Terms and Conditions"
      >
        Terms and condition
      </a>
    </footer>
  );
}