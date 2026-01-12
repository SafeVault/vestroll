"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function ModalWelcomeOnboard({
  open = true,
}: {
  open: boolean;
}) {
  const [isOpen, setOpen] = useState(open);
  const router = useRouter();

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-white rounded-2xl p-8">
        <button
          onClick={() => setOpen(false)}
          className="bg-transparent border-0 cursor-pointer"
        >
          <X className="size-8 text-text-header" />
        </button>

        <AlertDialogHeader className="max-w-2xs !text-center m-auto">
          <Image
            src="/done.svg"
            alt="success"
            width={120}
            height={120}
            className="mx-auto mb-5 mt-12"
          />
          <AlertDialogTitle className="font-bold text-[28px] text-text-header">
            Welcome Onboard!
          </AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-xs mx-10 text-text-subtext">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
            VestRoll
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 !justify-center">
          <AlertDialogAction
            className="bg-primary-500 hover:bg-primary-500/80 w-full text-base rounded-[12px] h-14 font-medium 
        
          "
            onClick={() => {
              setOpen(false);
              router.push("/dashboard");
            }}
          >
            Go to dashboard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
