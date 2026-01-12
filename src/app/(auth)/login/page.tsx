"use client";

import LoginPage from "@/components/features/auth/login-page";
import { useRouter } from "next/navigation";
import { RoutePaths } from "@/lib/routes";

export default function Login() {
  const router = useRouter();

  const handleLogin = (data: any) => {
    console.log("Login:", data);
    router.push(RoutePaths.DASHBOARD);
  };

  const handleForgotPassword = () => {
    router.push(RoutePaths.FORGOT_PASSWORD);
  };

  return (
    <LoginPage 
      onLogin={handleLogin} 
      onForgotPassword={handleForgotPassword} 
    />
  );
}
