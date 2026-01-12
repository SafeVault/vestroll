"use client";
import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/shared/icons";
import CircularProgress from "./CircularProgress";
import Bg from "@public/images/onboarding_bg.png";
function OnboardingCheckList() {
  const checkList = [
    {
      name: "Verify email",
      verify: true,
    },
    {
      name: "Provide company info",
      verify: false,
    },
    {
      name: "Complete KYB",
      verify: false,
    },
    {
      name: "Fund wallet",
      verify: false,
    },
  ];
  return (
    <section
      style={{
        backgroundImage: "url('/images/onboarding_bg.png')",
      }}
      className="p-8 rounded-xl space-y-6   bg-cover bg-center bg-no-repeat"
    >
      <div className="flex items-center gap-6">
        <CircularProgress progress={25} />
        <article className="space-y-2">
          <p className="text-white sm:text-2xl text-xl font-bold ">
            Onboarding Checklist
          </p>
          <p className="text-[#E8E5FA] font-medium text-xs sm:text-sm leading-[120%]">
            You&apos;`re one step away! Complete the following to get access to
            all features
          </p>
        </article>
      </div>
      <div className="sm:grid grid-cols-1 hidden md:grid-cols-2 xl:grid-cols-4  w-full gap-2">
        {checkList.map((onboarding, index) => {
          return (
            <Link
              href={`/${onboarding.name}`}
              className="p-4 rounded-lg border border-[#8674E7] bg-[#00000033] text-sm font-medium text-white  flex-1 flex justify-between items-center cursor-pointer"
              key={index}
            >
              <span>{onboarding.name}</span>
              {onboarding.verify ? (
                <span>
                  <CheckCircleIcon />
                </span>
              ) : (
                <span>
                  <ArrowRightIcon />
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="space-y-2 sm:hidden">
        <div className="space-y-2">
          {checkList.slice(0, 2).map((onboarding, index) => {
            return (
              <Link
                href={`/${onboarding.name}`}
                className="p-4 rounded-lg border border-[#8674E7] bg-[#00000033] text-sm font-medium text-white  flex-1 flex justify-between items-center cursor-pointer"
                key={index}
              >
                <span>{onboarding.name}</span>
                {onboarding.verify ? (
                  <span>
                    <CheckCircleIcon />
                  </span>
                ) : (
                  <span>
                    <ArrowRightIcon />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {checkList.slice(2, 4).map((onboarding, index) => {
            return (
              <Link
                href={`/${onboarding.name}`}
                className="p-4 rounded-lg border border-[#8674E7] bg-[#00000033] text-sm font-medium text-white  flex-1 flex justify-between items-center cursor-pointer"
                key={index}
              >
                <span>{onboarding.name}</span>
                {onboarding.verify ? (
                  <span>
                    <CheckCircleIcon />
                  </span>
                ) : (
                  <span>
                    <ArrowRightIcon />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OnboardingCheckList;
