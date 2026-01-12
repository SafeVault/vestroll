"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessProps {
  amount: string;
  walletAddress: string;
  loading: boolean; // new prop
  onClose: () => void; // to close modal
}

const LoadingSuccessModal: React.FC<SuccessProps> = ({
  amount,
  walletAddress,
  loading,
  onClose,
}) => {
  return (
    <div className="w-screen h-screen flex items-center bg-white/30 absolute inset-0">
      <AnimatePresence mode="wait">
        {loading ? (
          // Loading State
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white max-w-[340px] min-h-[438px] md:max-w-[480px] md:min-h-[470px] mx-auto flex flex-col justify-between rounded-xl p-8"
          >
            {/*Top close button */}
            <div className="w-[278px] md:w-[416px] flex">
              <button onClick={onClose} className="size-8">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.4546 0.666016L10.0013 8.11935L2.54797 0.666016L0.667969 2.54602L8.1213 9.99935L0.667969 17.4527L2.54797 19.3327L10.0013 11.8793L17.4546 19.3327L19.3346 17.4527L11.8813 9.99935L19.3346 2.54602L17.4546 0.666016Z"
                    fill="#17171C"
                  />
                </svg>
              </button>
            </div>

            {/*Main content */}
            <div className="flex flex-col gap-8 w-[278px] md:w-[416px]">
              {/*Loading spinner and text */}
              <div className="w-[100px] h-[100px] mx-auto">
                <div className="rounded-full bg-[#c6bff2] h-full w-full p-3">
                  <div className="rounded-full bg-[#3b20d2] h-full w-full flex items-center justify-center">
                    <svg
                      className="animate-spin"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40 20C40 8.95431 31.0457 0 20 0C8.9543 0 0 8.95431 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM7.2 20C7.2 12.9308 12.9308 7.2 20 7.2C27.0692 7.2 32.8 12.9308 32.8 20C32.8 27.0692 27.0692 32.8 20 32.8C12.9308 32.8 7.2 27.0692 7.2 20Z"
                        fill="white"
                        fillOpacity="0.25"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/*Text */}
              <div className="text-center">
                <h1 className="font-bold text-[28px] text-[#17171C]">
                  Sending...
                </h1>
                <p className="text-[#414F62]">
                  <span className="text-[#5A42DE]">{amount}</span> to{" "}
                  <span className="text-[#17171C]">{walletAddress}</span>
                </p>
              </div>
            </div>

            {/*Buttons */}
            <button className="bg-[#5E2A8C] text-white rounded-xl text-center py-[18.5px]">
              Go to dashboard
            </button>
          </motion.div>
        ) : (
          // Success State
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white max-w-[340px] min-h-[438px] md:max-w-[480px] md:min-h-[470px] mx-auto flex flex-col justify-between rounded-xl p-8"
          >
            {/*Top close button */}
            <div className="w-[278px] md:w-[416px] flex">
              <button onClick={onClose} className="size-8">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.4546 0.666016L10.0013 8.11935L2.54797 0.666016L0.667969 2.54602L8.1213 9.99935L0.667969 17.4527L2.54797 19.3327L10.0013 11.8793L17.4546 19.3327L19.3346 17.4527L11.8813 9.99935L19.3346 2.54602L17.4546 0.666016Z"
                    fill="#17171C"
                  />
                </svg>
              </button>
            </div>

            {/*Main content */}
            <div className="flex flex-col gap-8 w-[278px] md:w-[416px]">
              <div className="w-[100px] h-[100px] mx-auto">
                <div className="rounded-full bg-[#c6bff2] h-full w-full p-3">
                  <div className="rounded-full bg-[#3b20d2] h-full w-full flex items-center justify-center">
                    <svg
                      width="46"
                      height="32"
                      viewBox="0 0 46 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.99219 15.9392L16.0531 28L42.0023 4"
                        stroke="white"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="font-bold text-[28px] text-[#17171C]">
                  Successful
                </h1>
                <p className="text-[#414F62]">
                  <span className="text-[#5A42DE]">{amount}</span> was
                  successfully sent to{" "}
                  <span className="text-[#17171C]">{walletAddress}</span>
                </p>
              </div>
            </div>

            {/*Buttons */}
            <div className="gap-2 flex items-center w-[278px] md:w-[416px]">
              <button className="text-[#5E2A8C] border border-[#17171C] bg-white rounded-xl text-center py-[18.5px] flex-1">
                Back to home
              </button>
              <button className="bg-[#5E2A8C] text-white rounded-xl text-center py-[18.5px] flex-1">
                View details
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingSuccessModal;
