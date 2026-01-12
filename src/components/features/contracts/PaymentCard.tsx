import { ContractProps } from "@/types/interface";

type PaymentCardProps = {
  contractDetails: ContractProps;
  contractType: string;
};

function PaymentCard({ contractDetails, contractType }: PaymentCardProps) {
  return (
    <div className="max-w-4xl px-4 py-6 space-y-2 sm:p-6">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
          <p>Network</p>
          <p>Asset</p>
        </div>
        <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
          <p>{contractDetails.paymentDetails.network}</p>
          <p>{contractDetails.paymentDetails.asset}</p>
        </div>
      </div>

      {contractType.toLowerCase() === "milestone".toLowerCase() && (
        <div className="space-y-2">
          {contractDetails.milestoneDetails &&
            contractDetails.milestoneDetails?.length > 0 &&
            contractDetails.milestoneDetails?.map((milestone, index) => (
              <div key={index} className="flex flex-col w-full">
                <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
                  <p>Milestone {index + 1}</p>
                  <p>Amount</p>
                </div>
                <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
                  <p>{milestone.title}</p>
                  <p>
                    {milestone.amount} (581{" "}
                    {contractDetails.paymentDetails.asset})
                  </p>
                </div>
              </div>
            ))}
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
              <p>Require a deposit</p>
            </div>
            <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
              <p>{contractDetails.requireDeposit ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}
      {contractType.toLowerCase() === "Fixed Rate".toLowerCase() && (
        <div className="space-y-2">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
              <p>Payment Rate</p>
            </div>
            <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
              <p>{contractDetails.paymentDetails.amount}</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
              <p>Invoice Frequency</p>
              <p>Issue Invoice On</p>
            </div>
            <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
              <p>{contractDetails.invoiceDetails.invoiceFrequency}</p>
              <p>{contractDetails.invoiceDetails.issueInvoiceOn}</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
              <p>Payment Due</p>
              <p>First Invoice Date</p>
            </div>
            <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
              <p>{contractDetails.invoiceDetails.paymentDue}</p>
              <p>{contractDetails.firstInvoice.date}</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
              <p>Inclusive Tax</p>
            </div>
            <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
              {/* <p>
                {contractDetails.firstInvoice?.type === "full"
                  ? `Full amount • ${contractDetails.firstInvoice.amount?.toString()} ${
                      contractDetails.paymentDetails.asset
                    }`
                  : contractDetails.firstInvoice?.type === "custom"
                    ? "Custom amount"
                    : "Not specified"}
              </p> */}
              <p>{contractDetails.taxDetails?.taxRate || "No tax applied"}</p>
            </div>
          </div>
        </div>
      )}
      {contractType.toLowerCase() === "Pay as you go".toLowerCase() && (
        <div className="space-y-2">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">
              <p>Unit type</p>
              <p>Payment Rate</p>
            </div>
            <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-150">
              <p>{contractDetails.rateUnit}</p>
              <p>{contractDetails.invoiceDetails.issueInvoiceOn}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentCard;
