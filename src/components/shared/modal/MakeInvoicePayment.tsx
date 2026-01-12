"use client";

import { FormEvent, useEffect, useState } from "react";
import MakePayment from "@/components/features/dashboard/invoices/payment/MakePayment";
import ProvideOtp from "@/components/features/dashboard/invoices/payment/ProvideOtp";
import ProcessingPayment from "@/components/features/dashboard/invoices/payment/ProcessingPayment";
import PaymentSuccessful from "@/components/features/dashboard/invoices/payment/PaymentSuccessful";

interface MakeInvoicePaymentProps {
  handlePayment: () => void;
}

const MakeInvoicePayment = ({ handlePayment }: MakeInvoicePaymentProps) => {
  const [step, setStep] = useState(0);
  const [buttonText, setButtonText] = useState("Pay");

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return <MakePayment />;
      case 1:
        return <ProvideOtp />;
      case 2:
        return <ProcessingPayment />;
      case 3:
        return <PaymentSuccessful />;
      default:
        break;
    }
  };

  const goToDashboard = () => (window.location.href = "/dashboard");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (step <= 3) {
      if (step <= 1) setStep((step) => step + 1);

      if (step == 0) setButtonText("Authorize");
      if (step == 1) setButtonText("Go to dashboard");
      if (step == 2) goToDashboard();
      if (step == 3) handlePayment();
    }
  };

  useEffect(() => {
    if (step == 2)
      setTimeout(() => {
        setStep((step) => step + 1);
        setButtonText("View details");
      }, 2000);
  }, [step]);

  return (
    <form className="w-full h-fit space-y-8" onSubmit={handleSubmit}>
      {renderCurrentStep()}

      <div className="flex items-center w-full gap-2 flex-col md:flex-row">
        {step == 3 && (
          <button
            aria-label="reject button"
            className="order-1 lg:order-0 flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-primary-200 border-primary-200 hover:bg-primary-200/12 focus:bg-primary-200/20 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400/12 dark:focus:bg-primary-400/20 h-14"
            type="button"
            onClick={goToDashboard}
          >
            Back to home
          </button>
        )}
        <button className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border-0 rounded-xl outline-none cursor-pointer h-14 bg-primary-500">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default MakeInvoicePayment;
