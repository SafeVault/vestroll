"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import {
//   UsersIcon,
//   GlobeAltIcon,
//   ShieldCheckIcon,
// } from "@heroicons/react/24/outline";

import { Users, Globe, User } from "lucide-react";
import PermissionsTab from "@/components/permissions/permissions-tab";
import HiringTemplatesTab from "./hiring-templates/page";
import AddressBook from "./address-book/page";

interface StatProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

function Stat({ Icon, label, value }: StatProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ff]">
        <Icon className="h-5 w-5 text-[purple]" />
      </div>
      <div className="leading-tight">
        <div className="text-xs sm:text-sm text-[#6b7280]">{label}</div>
        <div className="text-base sm:text-lg font-semibold text-[#111827]">
          {value}
        </div>
      </div>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

function SectionCard({ title, action, children }: SectionCardProps) {
  return (
    <section className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="group flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
        <h2 className="text-lg font-semibold text-[#1f2937]">{title}</h2>
        {action}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

interface FieldRowProps {
  label: string;
  value?: React.ReactNode;
  right?: React.ReactNode;
}

function FieldRow({ label, value, right }: FieldRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-6 px-3 sm:px-4 py-3 rounded-lg bg-[#f8fafc]">
      <div className="text-sm text-[#6b7280]">{label}</div>
      <div className="sm:col-span-2 flex items-center justify-end gap-3">
        <div className="text-sm sm:text-base text-[#111827] text-right">
          {value ?? <span className="text-[#9ca3af]">--</span>}
        </div>
        {right}
      </div>
    </div>
  );
}

type SettingsTab =
  | "company"
  | "permissions"
  | "hiring-templates"
  | "address-book";

export default function Page() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("company");

  const tabs = [
    { id: "company" as SettingsTab, label: "Company" },
    { id: "permissions" as SettingsTab, label: "Permissions" },
    { id: "hiring-templates" as SettingsTab, label: "Hiring Templates" },
    { id: "address-book" as SettingsTab, label: "Address book" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "permissions":
        return <PermissionsTab />;
      case "hiring-templates":
        return <HiringTemplatesTab />;
      case "address-book":
        return <AddressBook />;
      case "company":
      default:
        return <CompanySettingsContent />;
    }
  };
  return (
    <>
      <header className="bg-white border-b border-[#DCE0E5] px-4 sm:px-6 py-2">
        <div className="flex flex-col justify-between">
          <h1 className="mt-4 mb-2 text-[24px] text-gray-950 font-bold">
            Settings
          </h1>
          <div className="flex flex-1 space-x-3 text-gray-500">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "text-[#5E2A8C] font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5E2A8C]"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="m-4 max-w-6xl">{renderTabContent()}</div>
    </>
  );
}

// Company Settings Content Component
function CompanySettingsContent() {
  const router = useRouter();

  return (
    <>
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col items-center text-center gap-4 md:block sm:items-center sm:justify-start sm:text-left">
          <div className="md:flex gap-8 items-center">
            <Image
              src="/touchpoint360.png"
              alt="Touchpoint 360"
              width={96}
              height={96}
              className="mx-auto md:mx-0 sm:h-[112px] sm:w-[112px] h-[96px] w-[96px]"
            />

            <div>
              <h2 className="text-3xl sm:text-3xl font-semibold text-[#111827]">
                Touchpoint 360
              </h2>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-10 pt-4">
                <Stat Icon={Users} label="Active members" value="20" />
                <div
                  className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
                  aria-hidden="true"
                />
                <Stat Icon={Globe} label="Countries" value="04" />
                <div
                  className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
                  aria-hidden="true"
                />
                <Stat Icon={User} label="Administrators" value="02" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionCard
          title="Company information"
          action={
            <button
              onClick={() => router.push("/app/settings/company/company-info")}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[#5E2A8C] border-[#5E2A8C] hover:bg-purple-300 hover:text-purple-950 active:bg-[#5E2A8C] transition-colors"
              type="button"
              aria-label="Edit company information"
            >
              <Image
                src="/edit.svg"
                width={16}
                height={16}
                alt=""
                aria-hidden
                className="transition group-hover:invert group-hover:brightness-0"
              />
              Edit
            </button>
          }
        >
          <div className="space-y-3">
            <FieldRow label="Company/Brand name" value="Touchpoint 360" />
            <FieldRow label="Registered name" value="Touchpoint 360" />
            <FieldRow
              label="Registration Number/EIN ID"
              value={<span className="text-[#9ca3af]">--</span>}
            />
            <FieldRow
              label="Country of incorporation"
              value={
                <div className="flex items-center gap-2">
                  <Image
                    src="/nigeria.svg"
                    width={20}
                    height={14}
                    alt="Nigeria flag"
                  />
                  <span>Nigeria</span>
                </div>
              }
            />
            <FieldRow
              label="Size"
              value={<span className="text-[#9ca3af]">--</span>}
            />
            <FieldRow
              label="VAT number"
              value={<span className="text-[#9ca3af]">--</span>}
            />
            <FieldRow
              label="Company public website URL"
              value={
                <a
                  href="https://www.touchpoint360.com/"
                  className="text-[var(--violet-base)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.touchpoint360.com/
                </a>
              }
            />
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Addresses">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-[#6b7280] mb-2">Billing address</div>
              <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
                <Image
                  src="/warning.svg"
                  width={20}
                  height={20}
                  alt="Warning"
                />
                <div className="text-sm text-black">
                  Please{" "}
                  <button
                    onClick={() =>
                      router.push(
                        "/app/settings/company/addresses/billing-address"
                      )
                    }
                    className="underline !decoration-[#5E2A8C] !text-[#5E2A8C] hover:no-underline"
                  >
                    add
                  </button>{" "}
                  your company billing address
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-[#6b7280] mb-2">
                Registered address
              </div>
              <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
                <Image
                  src="/warning.svg"
                  width={20}
                  height={20}
                  alt="Warning"
                />
                <div className="text-sm text-black">
                  Please{" "}
                  <button
                    onClick={() =>
                      router.push(
                        "/app/settings/company/addresses/registered-address"
                      )
                    }
                    className="underline !decoration-[#5E2A8C] !text-[#5E2A8C] hover:no-underline"
                  >
                    add
                  </button>{" "}
                  your registered address
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

//   const router = useRouter();
//   return (
//     <>
//       <header className="bg-white border-b border-[#DCE0E5] px-4 sm:px-6 py-2 ">
//         <div className="flex flex-col justify-between">
//           <h1 className="mt-4 mb-2 text-[24px] text-gray-950 font-bold">
//             Settings
//           </h1>
//           <div className="flex flex-1 space-x-3 text-gray-500">
//             <Link
//               href="/app/settings"
//               className="relative px-3 py-2 transition-colors text-[#5E2A8C] font-medium"
//             >
//               Company
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5E2A8C]"></span>
//             </Link>
//             <Link
//               href="/app/settings/permissions"
//               className="px-3 py-2 transition-colors hover:text-gray-700"
//             >
//               Permissions
//             </Link>
//             <Link
//               href="/app/settings/hiring-templates"
//               className="px-3 py-2 transition-colors hover:text-gray-700"
//             >
//               Hiring Templates
//             </Link>
//             <Link
//               href="/app/settings/address-book"
//               className="px-3 py-2 transition-colors hover:text-gray-700"
//             >
//               Address book
//             </Link>
//           </div>
//         </div>
//       </header>
//       <div className="m-4 max-w-6xl">
//         <div className="rounded-xl border  border-[#e5e7eb] bg-white p-4 sm:p-6 shadow-sm">
//           <div className="flex flex-col items-center text-center gap-4 md:block sm:items-center sm:justify-start sm:text-left">
//             <div className="md:flex gap-8 items-center">
//               <Image
//                 src="/touchpoint360.png"
//                 alt="Touchpoint 360"
//                 width={96}
//                 height={96}
//                 className="mx-auto md:mx-0 sm:h-[112px] sm:w-[112px] h-[96px] w-[96px]"
//               />

//               <div>
//                 <h2 className="text-3xl sm:text-3xl font-semibold text-[#111827]">
//                   Touchpoint 360
//                 </h2>

//                 <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-10 pt-4">
//                   <Stat Icon={Users} label="Active members" value="20" />
//                   <div
//                     className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
//                     aria-hidden="true"
//                   />
//                   <Stat Icon={Globe} label="Countries" value="04" />
//                   <div
//                     className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
//                     aria-hidden="true"
//                   />
//                   <Stat Icon={User} label="Administrators" value="02" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <SectionCard
//             title="Company information"
//             action={
//               <button
//                 onClick={() =>
//                   router.push("/app/settings/company/company-info")
//                 }
//                 className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[#5E2A8C] border-[#5E2A8C] hover:bg-purple-300 hover:text-purple-950 active:bg-[#5E2A8C] transition-colors"
//                 type="button"
//                 aria-label="Edit company information"
//               >
//                 <Image
//                   src="/edit.svg"
//                   width={16}
//                   height={16}
//                   alt=""
//                   aria-hidden
//                   className="transition group-hover:invert group-hover:brightness-0"
//                 />
//                 Edit
//               </button>
//             }
//           >
//             <div className="space-y-3">
//               <FieldRow label="Company/Brand name" value="Touchpoint 360" />
//               <FieldRow label="Registered name" value="Touchpoint 360" />
//               <FieldRow
//                 label="Registration Number/EIN ID"
//                 value={<span className="text-[#9ca3af]">--</span>}
//               />
//               <FieldRow
//                 label="Country of incorporation"
//                 value={
//                   <div className="flex items-center gap-2">
//                     <Image
//                       src="/nigeria.svg"
//                       width={20}
//                       height={14}
//                       alt="Nigeria flag"
//                     />
//                     <span>Nigeria</span>
//                   </div>
//                 }
//               />
//               <FieldRow
//                 label="Size"
//                 value={<span className="text-[#9ca3af]">--</span>}
//               />
//               <FieldRow
//                 label="VAT number"
//                 value={<span className="text-[#9ca3af]">--</span>}
//               />
//               <FieldRow
//                 label="Company public website URL"
//                 value={
//                   <Link
//                     href="https://www.touchpoint360.com/"
//                     className="text-[var(--violet-base)] hover:underline"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     https://www.touchpoint360.com/
//                   </Link>
//                 }
//               />
//             </div>
//           </SectionCard>
//         </div>

//         <div className="mt-6">
//           <SectionCard title="Addresses">
//             <div className="space-y-4">
//               <div>
//                 <div className="text-sm text-[#6b7280] mb-2">
//                   Billing address
//                 </div>
//                 <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
//                   <Image
//                     src="/warning.svg"
//                     width={20}
//                     height={20}
//                     alt="Warning"
//                   />
//                   <div className="text-sm text-black">
//                     Please{" "}
//                     <Link
//                       className="underline !decoration-[#5E2A8C] !text-[#5E2A8C] hover:no-underline"
//                       href="/app/settings/company/addresses/billing-address"
//                     >
//                       add
//                     </Link>{" "}
//                     your company billing address
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-[#6b7280] mb-2">
//                   Registered address
//                 </div>
//                 <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
//                   <Image
//                     src="/warning.svg"
//                     width={20}
//                     height={20}
//                     alt="Warning"
//                   />
//                   <div className="text-sm text-black">
//                     Please{" "}
//                     <Link
//                       className="underline !decoration-[#5E2A8C] !text-[#5E2A8C] hover:no-underline"
//                       href="/app/settings/company/addresses/registered-address"
//                     >
//                       add
//                     </Link>{" "}
//                     your registered address
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SectionCard>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { AlertCircle, Check } from "lucide-react";

// export default function OTPVerification() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

//   // Function to set ref
//   const setInputRef = (el: HTMLInputElement | null, index: number) => {
//     inputRefs.current[index] = el;
//   };

//   useEffect(() => {
//     // Auto-focus first input on mount
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const handleChange = (index: number, value: string) => {
//     // Only allow numeric input
//     if (value && !/^\d$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     setError("");

//     // Auto-advance to next field
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     // Handle backspace
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//     // Handle arrow keys
//     if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//     if (e.key === "ArrowRight" && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").trim();

//     // Only process if it's 6 digits
//     if (/^\d{6}$/.test(pastedData)) {
//       const newOtp = pastedData.split("");
//       setOtp(newOtp);
//       setError("");
//       // Focus last input
//       inputRefs.current[5]?.focus();
//     }
//   };

//   const validateOTP = () => {
//     const otpString = otp.join("");

//     if (otpString.length !== 6) {
//       setError("Please enter all 6 digits");
//       return false;
//     }

//     if (!/^\d{6}$/.test(otpString)) {
//       setError("OTP must contain only numbers");
//       return false;
//     }

//     return true;
//   };

//   const handleVerify = async () => {
//     if (!validateOTP()) return;

//     setIsVerifying(true);
//     setError("");

//     // Simulate API call
//     setTimeout(() => {
//       const otpString = otp.join("");

//       // Simulate validation (in real app, this would be API call)
//       if (otpString === "123456") {
//         setSuccess(true);
//         setTimeout(() => {
//           alert("2FA setup complete!");
//         }, 1000);
//       } else {
//         setError(
//           "Invalid code. Please check your authenticator app and try again."
//         );
//         setOtp(["", "", "", "", "", ""]);
//         inputRefs.current[0]?.focus();
//       }

//       setIsVerifying(false);
//     }, 1500);
//   };

//   const handleGoBack = () => {
//     // In real app, this would navigate to previous step
//     alert("Going back to previous step...");
//   };

//   const isComplete = otp.every((digit) => digit !== "");

//   return (
//     <div className="min-h-screen ">
//       {/* Header */}
//       <div className="mb-8 p-4 border-b">
//         {/* <button
//           onClick={handleGoBack}
//           className="text-gray-400 text-sm mb-4 hover:text-gray-600 transition-colors"
//         >
//           ← Back
//         </button> */}
//         <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
//       </div>
//       <div className="bg-gray-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 md:p-8">
//           {/* Verify Code Section */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
//               Verify code
//             </h2>
//             <p className="text-sm text-gray-500 mb-6">
//               Enter the 6-digit code shown in your authenticator app
//             </p>

//             {/* OTP Label */}
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               OTP
//             </label>

//             {/* OTP Input Fields */}
//             <div className="flex gap-2 mb-6">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => setInputRef(el, index)}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit ? "*" : ""}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   onPaste={index === 0 ? handlePaste : undefined}
//                   className={`w-full h-12 text-center text-black text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                     error
//                       ? "border-red-300 focus:ring-red-500 focus:border-red-500"
//                       : success
//                         ? "border-green-300 focus:ring-green-500 focus:border-green-500"
//                         : "border-gray-300 focus:ring-purple-900 focus:border-purple-500"
//                   }`}
//                   disabled={isVerifying || success}
//                 />
//               ))}
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="flex items-start gap-2 mb-4 text-red-600 text-sm">
//                 <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Success Message */}
//             {success && (
//               <div className="flex items-start gap-2 mb-4 text-green-600 text-sm">
//                 <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>Code verified successfully!</span>
//               </div>
//             )}

//             {/* Verify Button */}
//             <button
//               onClick={handleVerify}
//               disabled={!isComplete || isVerifying || success}
//               className={`w-full h-12 rounded-lg font-medium transition-all ${
//                 isComplete && !isVerifying && !success
//                   ? "bg-purple-900 hover:bg-purple-900 text-white"
//                   : "bg-gray-400 text-white cursor-not-allowed"
//               }`}
//             >
//               {isVerifying ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Verifying...
//                 </span>
//               ) : success ? (
//                 "Verified ✓"
//               ) : (
//                 "Verify"
//               )}
//             </button>

//             {/* Go Back Link */}
//             <button
//               onClick={handleGoBack}
//               className="w-full mt-4 text-lg text-purple-900 hover:text-purple-900 transition-colors"
//               disabled={isVerifying}
//             >
//               Go back
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
