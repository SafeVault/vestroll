"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import left from "./loginimages/Left.png";
import mobilelogo from "../../public/logo/mologo.png";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: PasswordFormData) => {
    console.log("Password reset data:", data);
    // TODO: replace with real API call
    setTimeout(() => {
      alert("Password has been set successfully");
    }, 1500);
  };

  return (
    <div className="w-full bg-white px-4 py-8 lg:py-4">
      <div className="lg:hidden max-w-[440px] mx-auto">
        <Image
          src="/Vector.svg"
          className="rotate-180"
          alt="VestRoll icon"
          width={40}
          height={40}
        />
      </div>

      <div className="flex w-full h-full">
        {/* Left Side - Shared Hero Section (Desktop Only) */}

        <div className="hidden md:flex lg:w-1/2 p-4 lg:p-8 h-full w-full">
          <Image src={left} alt="left image" />
        </div>

        {/* Right Side - Reset Password */}
        <div className="relative flex-1 flex flex-col items-center mr-70 mt-8 lg:mt-0 sm:justify-between justify-center px-0 sm:px-4">
          <div className="flex flex-col justify-start sm:flex-row lg:items-center h-full sm:justify-center w-full max-w-2xl">
            <form
              className="w-full flex flex-col gap-y-12 max-w-[440px] mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Heading */}
              <div className="">
                <h2 className="text-[28px] lg:text-[40px] font-bold leading-[100%] text-[#17171C] mb-2">
                  Reset password
                </h2>
                <p className="text-[#414F62] text-xs m-0 max-w-full sm:w-full sm:text-[16px]">
                  Create a new secure password to access your
                  <br className="sm:hidden" /> VestRoll account for subsequent
                  login
                </p>
              </div>

              {/* Password Inputs */}
              <div className="flex flex-col gap-y-6 w-full">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-medium text-[#17171C] mb-2"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password")}
                      placeholder="Enter password"
                      className={`w-full py-4 px-4 pr-12 bg-[#F5F6F7] text-gray-900 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg
                          width="16"
                          height="16"
                          className="cursor-pointer sm:w-5 sm:h-5 h-4 w-4"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.31328 10.6866C6.18661 10.6866 6.05995 10.6399 5.95995 10.5399C5.41328 9.99328 5.11328 9.26661 5.11328 8.49995C5.11328 6.90661 6.40661 5.61328 7.99995 5.61328C8.76661 5.61328 9.49328 5.91328 10.0399 6.45995C10.1333 6.55328 10.1866 6.67995 10.1866 6.81328C10.1866 6.94661 10.1333 7.07328 10.0399 7.16661L6.66661 10.5399C6.56661 10.6399 6.43995 10.6866 6.31328 10.6866ZM7.99995 6.61328C6.95995 6.61328 6.11328 7.45995 6.11328 8.49995C6.11328 8.83328 6.19995 9.15328 6.35995 9.43328L8.93328 6.85995C8.65328 6.69995 8.33328 6.61328 7.99995 6.61328Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M3.73323 12.8399C3.6199 12.8399 3.4999 12.7999 3.40656 12.7199C2.69323 12.1132 2.05323 11.3666 1.50656 10.4999C0.799896 9.39991 0.799896 7.60657 1.50656 6.49991C3.13323 3.95324 5.4999 2.48657 7.9999 2.48657C9.46656 2.48657 10.9132 2.99324 12.1799 3.94657C12.3999 4.11324 12.4466 4.42657 12.2799 4.64657C12.1132 4.86657 11.7999 4.91324 11.5799 4.74657C10.4866 3.91991 9.24656 3.48657 7.9999 3.48657C5.84656 3.48657 3.78656 4.77991 2.34656 7.03991C1.84656 7.81991 1.84656 9.1799 2.34656 9.9599C2.84656 10.7399 3.4199 11.4132 4.05323 11.9599C4.2599 12.1399 4.28656 12.4532 4.10656 12.6666C4.01323 12.7799 3.87323 12.8399 3.73323 12.8399Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M7.99972 14.5134C7.11305 14.5134 6.24638 14.3334 5.41305 13.9801C5.15972 13.8734 5.03972 13.5801 5.14638 13.3267C5.25305 13.0734 5.54638 12.9534 5.79972 13.0601C6.50638 13.3601 7.24638 13.5134 7.99305 13.5134C10.1464 13.5134 12.2064 12.2201 13.6464 9.96008C14.1464 9.18008 14.1464 7.82008 13.6464 7.04008C13.4397 6.71341 13.213 6.40008 12.973 6.10675C12.7997 5.89341 12.833 5.58008 13.0464 5.40008C13.2597 5.22675 13.573 5.25341 13.753 5.47341C14.013 5.79341 14.2664 6.14008 14.493 6.50008C15.1997 7.60008 15.1997 9.39341 14.493 10.5001C12.8664 13.0467 10.4997 14.5134 7.99972 14.5134Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M8.45973 11.3467C8.22639 11.3467 8.01306 11.18 7.96639 10.94C7.91306 10.6667 8.09306 10.4067 8.36639 10.36C9.09973 10.2267 9.71306 9.61332 9.8464 8.87999C9.89973 8.60665 10.1597 8.43332 10.4331 8.47999C10.7064 8.53332 10.8864 8.79332 10.8331 9.06665C10.6197 10.22 9.69973 11.1333 8.55306 11.3467C8.51973 11.34 8.49306 11.3467 8.45973 11.3467Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M1.33329 15.6666C1.20663 15.6666 1.07996 15.6199 0.979961 15.5199C0.786628 15.3266 0.786628 15.0066 0.979961 14.8132L5.95996 9.83323C6.15329 9.6399 6.47329 9.6399 6.66663 9.83323C6.85996 10.0266 6.85996 10.3466 6.66663 10.5399L1.68663 15.5199C1.58663 15.6199 1.45996 15.6666 1.33329 15.6666Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M9.68681 7.31329C9.56014 7.31329 9.43348 7.26663 9.33348 7.16663C9.14014 6.97329 9.14014 6.65329 9.33348 6.45996L14.3135 1.47996C14.5068 1.28663 14.8268 1.28663 15.0201 1.47996C15.2135 1.67329 15.2135 1.99329 15.0201 2.18663L10.0401 7.16663C9.94014 7.26663 9.81348 7.31329 9.68681 7.31329Z"
                            fill="#7F8C9F"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          className="cursor-pointer sm:w-5 sm:h-5 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42 13.9799 8.42 11.9999C8.42 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
                            stroke="#7F8C9F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47 3.71997 5.18 5.79997 2.89 9.39997C1.99 10.81 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z"
                            stroke="#7F8C9F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs sm:text-sm font-medium text-[#17171C] mb-2"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      placeholder="Confirm password"
                      className={`w-full py-4 px-4 pr-12 bg-[#F5F6F7] text-sm text-gray-900 sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <svg
                          width="16"
                          height="16"
                          className="cursor-pointer sm:w-5 sm:h-5 h-4 w-4"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.31328 10.6866C6.18661 10.6866 6.05995 10.6399 5.95995 10.5399C5.41328 9.99328 5.11328 9.26661 5.11328 8.49995C5.11328 6.90661 6.40661 5.61328 7.99995 5.61328C8.76661 5.61328 9.49328 5.91328 10.0399 6.45995C10.1333 6.55328 10.1866 6.67995 10.1866 6.81328C10.1866 6.94661 10.1333 7.07328 10.0399 7.16661L6.66661 10.5399C6.56661 10.6399 6.43995 10.6866 6.31328 10.6866ZM7.99995 6.61328C6.95995 6.61328 6.11328 7.45995 6.11328 8.49995C6.11328 8.83328 6.19995 9.15328 6.35995 9.43328L8.93328 6.85995C8.65328 6.69995 8.33328 6.61328 7.99995 6.61328Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M3.73323 12.8399C3.6199 12.8399 3.4999 12.7999 3.40656 12.7199C2.69323 12.1132 2.05323 11.3666 1.50656 10.4999C0.799896 9.39991 0.799896 7.60657 1.50656 6.49991C3.13323 3.95324 5.4999 2.48657 7.9999 2.48657C9.46656 2.48657 10.9132 2.99324 12.1799 3.94657C12.3999 4.11324 12.4466 4.42657 12.2799 4.64657C12.1132 4.86657 11.7999 4.91324 11.5799 4.74657C10.4866 3.91991 9.24656 3.48657 7.9999 3.48657C5.84656 3.48657 3.78656 4.77991 2.34656 7.03991C1.84656 7.81991 1.84656 9.1799 2.34656 9.9599C2.84656 10.7399 3.4199 11.4132 4.05323 11.9599C4.2599 12.1399 4.28656 12.4532 4.10656 12.6666C4.01323 12.7799 3.87323 12.8399 3.73323 12.8399Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M7.99972 14.5134C7.11305 14.5134 6.24638 14.3334 5.41305 13.9801C5.15972 13.8734 5.03972 13.5801 5.14638 13.3267C5.25305 13.0734 5.54638 12.9534 5.79972 13.0601C6.50638 13.3601 7.24638 13.5134 7.99305 13.5134C10.1464 13.5134 12.2064 12.2201 13.6464 9.96008C14.1464 9.18008 14.1464 7.82008 13.6464 7.04008C13.4397 6.71341 13.213 6.40008 12.973 6.10675C12.7997 5.89341 12.833 5.58008 13.0464 5.40008C13.2597 5.22675 13.573 5.25341 13.753 5.47341C14.013 5.79341 14.2664 6.14008 14.493 6.50008C15.1997 7.60008 15.1997 9.39341 14.493 10.5001C12.8664 13.0467 10.4997 14.5134 7.99972 14.5134Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M8.45973 11.3467C8.22639 11.3467 8.01306 11.18 7.96639 10.94C7.91306 10.6667 8.09306 10.4067 8.36639 10.36C9.09973 10.2267 9.71306 9.61332 9.8464 8.87999C9.89973 8.60665 10.1597 8.43332 10.4331 8.47999C10.7064 8.53332 10.8864 8.79332 10.8331 9.06665C10.6197 10.22 9.69973 11.1333 8.55306 11.3467C8.51973 11.34 8.49306 11.3467 8.45973 11.3467Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M1.33329 15.6666C1.20663 15.6666 1.07996 15.6199 0.979961 15.5199C0.786628 15.3266 0.786628 15.0066 0.979961 14.8132L5.95996 9.83323C6.15329 9.6399 6.47329 9.6399 6.66663 9.83323C6.85996 10.0266 6.85996 10.3466 6.66663 10.5399L1.68663 15.5199C1.58663 15.6199 1.45996 15.6666 1.33329 15.6666Z"
                            fill="#7F8C9F"
                          />
                          <path
                            d="M9.68681 7.31329C9.56014 7.31329 9.43348 7.26663 9.33348 7.16663C9.14014 6.97329 9.14014 6.65329 9.33348 6.45996L14.3135 1.47996C14.5068 1.28663 14.8268 1.28663 15.0201 1.47996C15.2135 1.67329 15.2135 1.99329 15.0201 2.18663L10.0401 7.16663C9.94014 7.26663 9.81348 7.31329 9.68681 7.31329Z"
                            fill="#7F8C9F"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          className="cursor-pointer sm:w-5 sm:h-5 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42 13.9799 8.42 11.9999C8.42 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
                            stroke="#7F8C9F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47 3.71997 5.18 5.79997 2.89 9.39997C1.99 10.81 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z"
                            stroke="#7F8C9F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-medium sm:font-semibold text-white transition-all duration-200 ${
                  isValid && !isSubmitting
                    ? "bg-[#5E2A8C] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center bg-[#5E2A8C]">
                    <div className="w-5 h-5 bg-[#5E2A8C] border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="w-full mb-6 mr-4 text-center text-sm xl:block hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <span className="text-[15px] text-[#7F8C9F]">
                © {new Date().getFullYear()}, all rights reserved
              </span>
              <div className="flex space-x-4 text-[#17171C]">
                <a href="#" className="text-[16px]">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="text-[16px]">
                  Terms and condition
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
