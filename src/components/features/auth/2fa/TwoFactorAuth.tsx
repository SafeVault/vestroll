"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function TwoFactorAuth() {
  const [selectedValue, setSelectedValue] = useState("authenticator");
  return (
    <main className="bg-white md:w-[480px] w-full h-[696px] md:p-6 p-4 rounded-[8px] flex flex-col gap-8 mx-auto">
      <p className="font-semibold text-xl text-[#414F62]">Choose 2FA method</p>

      <article className="bg-[#F3EBF9] border border-[#F3EBF9] p-4 rounded-[8px] flex gap-4 items-center">
        <div>
          <CircleAlert className="text-[#5E2A8C] size-6" />
        </div>
        <div className=" font-medium text-sm text-[#17171C]">
          <p>
            For security reasons, only one 2FA method can be enabled at a time.
          </p>
        </div>
      </article>

      <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
        <main className="flex flex-col gap-2">
          <div
            onClick={() => setSelectedValue("authenticator")}
            className={`bg-[#F5F6F7] border p-6 flex gap-1 rounded-[8px] justify-between items-center cursor-pointer ${selectedValue === "authenticator" ? "border-[#5E2A8C]" : "border-[#E7E9EB]"}`}
          >
            <div className="flex flex-col gap-1">
              <h5 className="font-semibold text-xl text-[#17171C]">
                Authenticator App
              </h5>
              <p className="font-medium text-sm text-[#414F62]">
                You use an app to generate verification codes
              </p>
            </div>
            <div>
              <RadioGroupItem
                value="authenticator"
                className=" size-5 cursor-pointer "
              />
            </div>
          </div>
          <div
            onClick={() => setSelectedValue("email")}
            className={`bg-[#F5F6F7] border p-6 flex gap-1 rounded-[8px] justify-between items-center mt-4 cursor-pointer ${selectedValue === "email" ? "border-[#5E2A8C]" : "border-[#E7E9EB]"}`}
          >
            <div className="flex flex-col gap-1">
              <h5 className="font-semibold text-xl text-[#17171C]">
                Email verification
              </h5>
              <p className="font-medium text-sm text-[#414F62]">
                You’ll receive your verification codes by email
              </p>
            </div>
            <div>
              <RadioGroupItem
                value="email"
                className=" size-5 cursor-pointer "
              />
            </div>
          </div>
        </main>
      </RadioGroup>
      <Button className="mt-auto p-2 h-14 bg-[#5E2A8C] text-white font-medium text-base" variant="default">Continue</Button>
    </main>
  );
}

export default TwoFactorAuth;
