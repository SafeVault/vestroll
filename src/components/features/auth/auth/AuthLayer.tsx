import { AuthLayoutProps } from "@/types/interface";
import Link from "next/link";
import { LogoIcon, MobileLogoIcon } from "@/components/shared/icons";
import Image from "next/image";
import Global from "@public/images/Frame 2147223744.svg";
function AuthLayer({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white relative overflow-x-hidden">
      {/* Logo container */}
      <div className="absolute z-50 top-6 lg:top-10 left-6 lg:left-10 bg-white lg:bg-transparent p-2 lg:p-0 rounded-lg">
        <div className="hidden lg:flex">
          <LogoIcon />
        </div>
        <div className="lg:hidden">
          <MobileLogoIcon />
        </div>
      </div>

      {/* Left Side (Desktop Only) */}
      <div className="hidden lg:flex flex-1 bg-primary-600 flex-col my-4 ml-4 rounded-2xl pl-12 pr-6 pt-32 gap-12 max-w-[45%]">
        <div className="flex items-center justify-center w-full">
          <Image 
            src={Global} 
            alt="Global Network" 
            width={450} 
            height={450} 
            className="object-contain"
            priority 
          />
        </div>
        <div className="space-y-4 max-w-lg">
          <h1 className="text-5xl xl:text-6xl text-white font-bold leading-tight">
            Seamless payments, anywhere.
          </h1>
          <p className="text-lg text-white/90 leading-relaxed font-medium">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with VestRoll
          </p>
        </div>
      </div>

      {/* Right Side / Mobile View */}
      <div className="relative flex-1 flex flex-col items-center min-h-full">
        <div className="w-full max-w-md px-6 pt-24 lg:pt-40 pb-24 mx-auto">
          {children}
        </div>

        {/* Footer info (Desktop & Mobile) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-sm font-medium p-8 w-full mt-auto">
          <p className="text-gray-400">&copy; 2025 VestRoll, all rights reserved</p>
          <div className="flex items-center gap-4 text-gray-700">
            <Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <span className="size-1 rounded-full bg-gray-300 hidden sm:inline-block"></span>
            <Link href="/terms" className="hover:text-primary-600 transition-colors">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayer;
