"use client";
import { PropsWithChildren } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CheckIcon from "../../../../public/check.svg";
import TruncatedAddress from "./truncate-address";

type TransactionModalProps = {
  isLoading?: boolean;
  loadingTitle?: string;
  successTitle?: string;
  isSuccess?: boolean;
  isError?: boolean;
  title?: string;
  amount?: string;
  recipientAddress?: string;
} & PropsWithChildren;

export default function TransactionModal({
  successTitle = "Successfull!",
  loadingTitle = "Sending...",
  isLoading = true,
  isSuccess = false,
  amount = "5 usdc",
  recipientAddress = "0xa3B29f5C91e67cF5e42D3d9C9Ab84c1E1724F7c0",
  children,
}: TransactionModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />
        <Dialog.Title className="sr-only">Transaction Modal</Dialog.Title>
        <Dialog.Description className="sr-only">
          Modal representing a transaction
        </Dialog.Description>
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 rounded-xl translate-x-[-50%] translate-y-[-50%] bg-gray-50 shadow-lg focus:outline-none p-6 min-w-[342px] min-h-[438px] md:max-w-[480px] md:max-h-[480px] md:aspect-square">
          <Dialog.Close asChild>
            <button className="size-8 cursor-pointer mb-10" aria-label="Close">
              <XMarkIcon className="stroke-black" />
            </button>
          </Dialog.Close>

          <article className="space-y-10">
            <div className="grid place-items-center">
              <figure className="size-24 rounded-full bg-[#3216CE] flex items-center justify-center border-8 border-purple-100/80 mb-8">
                {isSuccess && <CheckIcon className=" stroke-white" />}
                {isLoading && <Spinner />}
              </figure>

              {/* Title */}
              <p className="font-bold text-[28px] mb-2 text-black">
                {isSuccess && <>{successTitle}</>}
                {isLoading && <>{loadingTitle}</>}
              </p>

              {/* Subtitle */}
              <div className="text-center leading-tight w-9/12 text-sm text-[#414F62]">
                {isSuccess && (
                  <>
                    <p>
                      <span className="text-[#5E2A8C] uppercase">{amount}</span>{" "}
                      was sent successfully
                    </p>
                    <p>
                      sent to <TruncatedAddress address={recipientAddress} />
                    </p>
                  </>
                )}
                {isLoading && (
                    <p>
                      <span className="text-[#5E2A8C] uppercase">{amount}</span>{" "}
                      to <TruncatedAddress address={recipientAddress} />
                    </p>
                )}
              </div>
            </div>
            {/* Success Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-2">
              {isSuccess && (
                <>
                  <Dialog.Close asChild className="order-1 md:order-5">
                    <Button className=" py-4 px-11 cursor-pointer bg-[#5E2A8C] text-white rounded-2xl order-1 md:order-5">
                      View details
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button className="border-[#17171C] border-2 py-4 px-11 rounded-2xl cursor-pointer text-black w-full">
                      Back to home
                    </Button>
                  </Dialog.Close>
                </>
              )}

              {isLoading && (
                  <Dialog.Close asChild>
                    <Button className=" py-4 px-11 cursor-pointer bg-[#5E2A8C] text-white rounded-2xl order-1 md:order-5">
                      Go to dashboard
                    </Button>
                  </Dialog.Close>
              )}
            </div>
          </article>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Spinner() {
  return (
    <div className="size-10 justify-center spinner-wrapper">
      <div className="spinner-child">
      </div>
    </div>
  );
}
