"use client";

import ForgotPasswordPage from "@/components/features/auth/forgot-password-page";
import { useRouter } from "next/navigation";
import { RoutePaths } from "@/lib/routes";

export default function ForgotPassword() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push(RoutePaths.LOGIN);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password request sent");
    // Typically you would trigger an email then redirect or show success
    router.push(RoutePaths.VERIFY_EMAIL);
  };

  return (
    <ForgotPasswordPage 
      onBackToLogin={handleBackToLogin} 
      onForgotPassword={handleForgotPassword}
    />
  );
}
