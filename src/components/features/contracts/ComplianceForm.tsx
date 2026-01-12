import { useForm } from "react-hook-form";
import { PdfDocumentIcon } from "@/components/shared/icons";
import { ComplianceDetails } from "@/types/interface";
import { FC } from "react";

export const ComplianceForm: FC = () => {
  const { register, handleSubmit } = useForm<ComplianceDetails>();

  return (
    <div className="space-y-8">
      <form className="space-y-8">
        <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 form-control--checkbox">
                  <div className="relative flex-shrink-0 size-4">
                    <input
                      type="radio"
                      {...register("agreementType")}
                      value="standard"
                      id="standardServiceAgreement"
                      className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                    />
                    <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-500 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <label
                    htmlFor="standardServiceAgreement"
                    className="pt-2 text-xs font-medium leading-4 text-[#414F62]"
                  >
                    Use our standard service agreement
                  </label>
                </div>

                <div className="flex gap-2 sm:items-center form-control--checkbox">
                  <div className="relative flex-shrink-0 size-4">
                    <input
                      type="radio"
                      {...register("agreementType")}
                      value="custom"
                      id="customAgreement"
                      className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                    />
                    <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-500 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <label
                    htmlFor="customAgreement"
                    className="text-xs font-medium leading-4 text-[#414F62] sm:pt-2"
                  >
                    Use your own custom agreement
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="agreement"
                  className="text-xs font-medium leading-4 text-[#414F62]"
                >
                  Agreement file
                </label>

                <div className="border border-gray-150  py-4.5 px-3.5 rounded-lg flex max-w-lg justify-between items-center gap-4 relative">
                  <div className="flex items-center gap-2">
                    <PdfDocumentIcon />
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-[#414F62] dark:text-gray-150">
                        Standard Agreement
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-text-subtext">
                        <p>PDF format</p>
                        <span className="rounded-full size-1 bg-text-subtext"></span>
                        <p>13MB</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer  bg-[#E8E5FA] text-[#5A42DE]"
                  >
                    Preview
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#414F62] dark:text-gray-150">
                  Additional terms (optional)
                </p>
                <div className="form-control">
                  <label
                    htmlFor="additionalAgreement"
                    className="text-xs font-medium text-gray-400 "
                  >
                    Terms
                  </label>
                  <textarea
                    {...register("additionalAgreement")}
                    id="additionalAgreement"
                    className="resize-none h-28 bg-[#F5F6F7] w-full py-4.5 px-3.5 outline-none border-0 rounded-lg"
                  />
                  <p className="text-xs font-medium text-text-subtext">
                    Add additional terms to cover special scenarios. These terms
                    will be applied to the Service Agreement Template or
                    uploaded contract and override existing contract terms.
                  </p>
                </div>
              </div>
        </div>
      </form>
    </div>
  );
};
