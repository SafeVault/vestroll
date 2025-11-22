import { useForm } from "react-hook-form";
import { CheckMarkIcon } from "../../../public/svg";
import useModal from "../../hooks/useModal";
import ContractReviewModal from "./ContractReviewModal";
import ContractCompletionModal from "./ContractCompletionModal";
type FormProps = {
  legalName: string;
  termsAndCondition: boolean;
};
function ReviewAndSignModal() {
  const { hideModal, showEnhancedModal } = useModal();
  // const OpenContractReviewModal = () => {
  //   showEnhancedModal(<ContractReviewModal />, {
  //     showCloseButton: false,
  //     size: "md",
  //   });
  // };
  const openContractCreatedModal = () => {
    showEnhancedModal(<ContractCompletionModal />);
  };
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
      openContractCreatedModal();
    }, 200);
  };
  return (
    <div className="relative flex flex-col space-y-8 h-dvh sm:h-fit">
      <div className="flex flex-col items-center pb-4 space-y-2 ">
        <div className="flex flex-row gap-2.5 sm:flex-col sm:gap-8  w-full">
          <button onClick={hideModal} className="self-start">
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
          </button>
          <p className="w-full text-xl font-semibold text-center text-text-header sm:text-3xl ">
            Review & Sign
          </p>
        </div>
        <p className="max-w-xs text-xs font-medium text-center text-text-subtext text-pretty ">
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
              className="text-xl font-fh py-4.5 px-3.5 bg-[#F5F6F7] outline-none rounded-lg  fasthand"
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
}

export default ReviewAndSignModal;
