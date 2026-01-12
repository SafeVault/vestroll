"use client";
import { PropsWithChildren } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type HiringTemplateDeleteDialog = {
  onFormSubmit?: () => void;
} & PropsWithChildren;

export default function HiringTemplateDeleteDialog({
  onFormSubmit,
  children,
}: HiringTemplateDeleteDialog) {

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />
        <Dialog.Title className="sr-only">Delete Hiring Template</Dialog.Title>
        <Dialog.Description className="sr-only">
          Dialog to delete hiring template
        </Dialog.Description>
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 rounded-xl translate-x-[-50%] translate-y-[-50%] bg-gray-50 shadow-lg focus:outline-none p-6 min-w-[342px] min-h-[438px] md:max-w-[480px] md:max-h-[480px] md:aspect-square">
          <Dialog.Close asChild>
            <button
              className="h-[32px] w-[32px] rounded-full cursor-pointer mb-10"
              aria-label="Close"
            >
              <XMarkIcon />
            </button>
          </Dialog.Close>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (onFormSubmit) {
                onFormSubmit();
              }
            }}
            className="space-y-10"
          >
            <div className="grid place-items-center">
              <figure className="size-24 rounded-full bg-[#C64242] flex items-center justify-center border-8 border-red-50/60 mb-8">
                <ExclamationCircleIcon className="size-8 stroke-white" />
              </figure>

              <p className="font-bold text-2xl mb-2">Warning</p>
              <p className="text-center leading-tight w-9/12 text-sm text-[#414F62]">
                You&#39;re about to delete{" "}
                <span className="font-semibold text-[#5E2A8C]">Title_name</span>{" "}
                template. Continue with action?
              </p>
            </div>

            <div className="flex justify-center gap-2">
              <Dialog.Close asChild>
                <Button className="border-[#17171C] border-2 py-4 px-11 rounded-2xl cursor-pointer">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button
                  type="submit"
                  className=" py-4 px-11 cursor-pointer bg-[#5E2A8C] text-white rounded-2xl"
                >
                  Delete
                </Button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
