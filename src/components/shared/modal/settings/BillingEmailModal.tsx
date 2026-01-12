import { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CancelIcon } from "@/components/shared/icons";
import useModal from "@/hooks/useModal";
interface BillingEmailModalProps {
  initialEmail: string;
  onSave: (email: string) => void;
}

const BillingEmailModal = ({
  initialEmail,
  onSave,
}: BillingEmailModalProps) => {
  const [billingEmail, setBillingEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const { hideModal } = useModal();
  const handleSubmit = (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      setLoading(false);
      onSave(billingEmail.trim());
    }, 500);
  };

  return (
    <form
      className="w-full h-svh sm:h-fit flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="relative pl-8">
        <button
          onClick={() => hideModal()}
          className="cursor-pointer absolute left-0"
        >
          <CancelIcon size={32} />
        </button>
        <h1 className="text-xl font-semibold text-center">
          Billing email address
        </h1>
      </div>

      <div className="form-control mt-8 flex flex-col gap-2 flex-1 justify-between">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={billingEmail}
          onChange={(e) => setBillingEmail(e.target.value)}
          required
          className="py-4.5 px-3.5 border-0 outline-none bg-[#F5F6F7] rounded-lg"
        />
      </div>

      <button
        disabled={loading}
        className="mt-14 bg-primary-500 hover:bg-primary-500/90 rounded-full text-white font-medium h-14 w-full"
      >
        {loading ? <ClipLoader color="white" size={20} /> : "Update"}
      </button>
    </form>
  );
};

export default BillingEmailModal;
