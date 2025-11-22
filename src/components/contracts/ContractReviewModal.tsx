"use client";
import { useState } from "react";
import { CancelIcon, CheckMarkIcon } from "../../../public/svg";
// import useModal from "../../hooks/useModal";
// import ReviewAndSignModal from "./ReviewAndSignModal";
import { useForm } from "react-hook-form";
import ContractCompletionModal from "./ContractCompletionModal";

// TODO: ADD compliance data to formData & receive result to display on completion modal
function ContractReviewModal({
  onClose,
  onConfirm,
  formData
}: {
  onClose: () => void;
  onConfirm: () => void;
  formData?: any;
}) {
  const [reviewStep, setReviewStep] = useState(1);
  const handleNextStep = () => {
    setReviewStep((s) => s + 1);
    if (reviewStep === 2) {
      onConfirm();
    }
  };
  const handlePrevStep = () => {
    setReviewStep((s) => s - 1);
  };
  const handleOnClose = () => {
    if (reviewStep === 3) return;
    onClose();
  }
  const handleReviewStep = () => {
    switch(reviewStep) {
      case 1:
        return <ReviewOne onNext={handleNextStep}/>;
      case 2:
        return <ReviewTwo onPrev={handlePrevStep} onNext={handleNextStep} />;
      case 3:
        return <ContractCompletionModal />;
      default:
        return null;
    }
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleOnClose} />

    <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      {reviewStep < 3 && (
        <button onClick={onClose} className="self-start ">
          <div className="hidden sm:flex">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.4532 6.66675L15.9998 14.1201L8.5465 6.66675L6.6665 8.54675L14.1198 16.0001L6.6665 23.4534L8.5465 25.3334L15.9998 17.8801L23.4532 25.3334L25.3332 23.4534L17.8798 16.0001L25.3332 8.54675L23.4532 6.66675Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className=" sm:hidden">
            <CancelIcon />
          </div>
        </button>
      )}
      {handleReviewStep()}
    </div>
  </div>
  );
}

export default ContractReviewModal;


const ReviewOne = ({ onNext }: {onNext: () => void }) => {
  return (
    <>
    <div className="pb-4 space-y-2 sm:pb-8 d">
          <div className="flex flex-row gap-2.5 sm:flex-col sm:gap-8">

            <p className="text-lg font-semibold text-text-header text-nowrap sm:text-center sm:text-3xl ">
              Design Services Agreement
            </p>
          </div>
          <p className="text-xs font-medium text-center text-text-subtext text-pretty ">
            This Design Service Agreement (the &quot;Agreement&quot;) is made and
            entered into on 21 Dec 2022 by and between [Client Name]
            (&quot;Client&quot;) and [Designer name] (&quot;Contractor&quot;).
          </p>
        </div>
        <div className="overflow-y-scroll mx-2 mt-2 sm:mx-0 sm:mt-0 rounded-lg sm:rounded-none custom-scrollbar sm:!py-6 sm:max-h-80 py-4">
          <ol className="pl-4 space-y-4 list-decimal bg-[#F5F6F7]">
            <li className="space-y-2">
              <p className="text-sm font-semibold text-text-header">Purpose</p>
              <p className="text-xs font-medium text-text-subtext">
                The purpose of this Agreement is to outline the terms and
                conditions for the branding and web design services to be provided
                by Contractor to Client.
              </p>
            </li>

            <li className="space-y-2">
              <p className="text-sm font-semibold text-text-header">
                Scope of work
              </p>
              <div>
                <div className="text-text-subtext">
                  <p className="text-xs font-medium text-text-subtext">
                    Contractor will provide the following services to Client:
                  </p>
                  <ul className="pl-5 space-y-1 text-xs font-medium  list-disc ">
                    <li>
                      Branding services including brand strategy consultation,
                      logo design, brand guidelines, and other branding materials
                      as agreed upon by both parties.
                    </li>
                    <li>
                      Web design services, including the design and development of
                      a new website for the Client.
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="space-y-2">
              <p className="text-sm font-semibold text-text-header">
                Deliverables
              </p>
              <div className="text-text-subtext">
                <p className="text-xs font-medium ">
                  Contractor will deliver the following to Client:
                </p>
                <ul className="pl-5 space-y-1 text-xs font-medium  list-disc ">
                  <li>A completed, fully-functional website.</li>
                  <li>
                    All source files for the website, including design files and
                    code.
                  </li>
                  <li>Any branding materials as agreed upon by both parties.</li>
                </ul>
              </div>
            </li>

            <li className="space-y-2">
              <p className="text-sm font-semibold text-text-header">
                Payment Terms
              </p>
              <div className="text-text-subtext">
                <p className="text-xs font-medium ">
                  The Client will pay the Contractor the total agreed sum,
                  outlined in the project package, for the completion of the scope
                  of work outlined in this Agreement. This fee shall be paid in
                  the following installments:
                </p>
                <ul className="pl-5 space-y-1 text-xs font-medium text-text-subtext list-disc ">
                  <li>50% payment due on acceptance of agreement.</li>
                  <li>25% payment due on completion of brand design work.</li>
                  <li>25% payment due on completion of web design work.</li>
                </ul>
              </div>
            </li>

            <li className="space-y-2">
              <p className="text-sm font-semibold text-text-header">
                Ongoing Costs
              </p>
              <p className="text-xs font-medium text-text-subtext">
                Client will be responsible for any ongoing subscription costs
                associated with the website, including hosting and any necessary
                updates or maintenance.
              </p>
            </li>
          </ol>
        </div>

        <div className="w-full py-6 sm:py-8 ">
          <button
            onClick={onNext}
            className="w-full p-2 font-medium text-white rounded-lg h-14 bg-primary-500 hover:opacity-90"
          >
            Sign contract
          </button>
        </div>
    </>
  );
}

type FormProps = {
  legalName: string;
  termsAndCondition: boolean;
};

const ReviewTwo = ({ onPrev, onNext }:{ onPrev: () => void, onNext: () => void }) => {
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<FormProps>({
      defaultValues: {
        legalName: "",
        termsAndCondition: false,
      },
    });

  const onSubmit = async (data: FormProps) => {
    console.log(data);

    setTimeout(() => {
      onNext();
    }, 200);
  };
  return (
    <div className="space-y-4">
    <div>
      <p className="w-full text-xl font-semibold text-center text-text-header sm:text-3xl ">
        Review & Sign
      </p>
      <p className="max-w-xs mx-auto text-xs font-medium text-center text-text-subtext text-pretty ">
        Ensure you have read and understood the terms in the contract. Type
        your name below to sign.{" "}
      </p>
    </div>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full mx-2 my-2 rounded-lg gap-y-8 sm:mx-0 sm:my-0 sm:rounded-none"
    >
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="legalName">Legal full Name</label>
          <input
            type="text"
            id="legalName"
            className="text-xl font-fh py-4.5 px-3.5 bg-[#F5F6F7] outline-none rounded-lg fasthand"
            {...register("legalName", {
              required: "Full Legal Name is required",
              validate: (value: string) => {
                const name = value.trim();

                if (name.length < 3) {
                  return name + "is too short";
                }
                if (!name) {
                  return "Legal can not be empty";
                }
                return true;
              },
            })}
          />
        </div>
        <div className="flex items-start gap-2">
          <label className="relative">
            <input
              type="checkbox"
              id="termsAndCondition"
              className="transition-colors duration-300 ease-in-out rounded outline-none appearance-none checked:border-transparent not-checked:border-2 peer size-5 checked:bg-primary-500 not-checked:border-gray-150"
              {...register("termsAndCondition", {
                required: "You must accept the terms and conditions.",
              })}
            />
            <div className="absolute text-transparent peer-checked:text-white transition-colors ease-in-out duration-300 -translate-x-1/2 top-0.5 -rotate-10 left-1/2 peer-checked:flex hidden">
              <CheckMarkIcon />
            </div>
          </label>
          <p className="text-xs font-medium text-text-subtext">
            I have read, understood, and agree to the
            <a
              href="#"
              className="font-semibold dark:text-primary-400 text-primary-500"
            >
              {" "}
              Terms & Conditions
            </a>{" "}
            set forth in this contract and agree to be legally bound by these
            terms and conditions by checking this box.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 sm:flex-row">
        <button
          className="w-full border border-gray-500 rounded-lg cursor-pointer h-14 dark:border-gray-100 hover:opacity-90"
          onClick={onPrev}
        >
          Back
        </button>

        <button
          type="submit"
          className="w-full p-2 font-medium text-white rounded-lg cursor-pointer h-14 bg-primary-500 hover:opacity-90"
        >
          {isSubmitting ? "Submitting..." : "Sign contract"}
        </button>
      </div>
    </form>
    </div>
  );
};
