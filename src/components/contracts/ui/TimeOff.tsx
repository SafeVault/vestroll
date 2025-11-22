import EmptyState from "@/components/ui/EmptyState";
import { Check, XCircle, Clock } from "lucide-react";
import { cn } from "@/utils/classNames";
import { Transaction, transactions } from "@/data/transactions";
import { CalendarIcon } from "../../../../public/svg";

function ContractTimeOff({ contract }: { contract: any }) {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-3 h-3 text-[#F5A623]" />;
      case 'Failed':
        return <XCircle className="w-3 h-3 text-[#FF4D4F]" />;
      case 'Successful':
        return <Check className="w-3 h-3 text-[#52C41A]" />;
    }
  };

  const getStatusClass = (status: Transaction['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FFF7E6] text-[#F5A623] border-[#F5A623]';
      case 'Failed':
        return 'bg-[#FFF1F0] text-[#FF4D4F] border-[#FF4D4F]';
      case 'Successful':
        return 'bg-[#F6FFED] text-[#52C41A] border-[#52C41A]';
    }
  };

  const getStatusText = (status: Transaction['status']) => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'Failed':
        return 'Rejected';
      case 'Successful':
        return 'Approved';
    }
  };

  return (
    <section className="p-2 sm:p-4">
      <div className="bg-white sm:bg-white p-4 rounded-lg">
        <div className="space-y-4 mb-6">
            <h2 className="text-base font-semibold text-gray-900">
                Time off
            </h2>
            <div className="flex space-x-3 divide-x divide-gray-300">
                <div className="flex gap-2 pr-6">
                    <div className="bg-[#F3EBF9] flex items-center px-4 rounded-lg">
                        <CalendarIcon />
                    </div>
                    <div>
                        <small className="text-gray-400">Paid time off</small>
                        <p>26/100 used</p>
                    </div>
                </div>
                <div className="flex gap-2 pl-6">
                    <div className="bg-[#F3EBF9] flex items-center px-4 rounded-lg">
                        <CalendarIcon />
                    </div>
                    <div>
                        <small className="text-gray-400">Unpaid time off</small>
                        <p>26/100 used</p>
                    </div>
                </div>
            </div>
        </div>

        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="hidden md:table-header-group ltr:text-left rtl:text-right bg-gray-50 rounded-t-lg text-xs font-medium">
                <tr className="*:font-medium *:text-gray-500">
                  <th className="px-3 py-4 whitespace-nowrap">
                    Type
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Period
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Total time off
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">Status</th>
                  <th className="px-3 py-4 whitespace-nowrap">Submitted</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                <tr className="*:text-[#17171C] *:first:font-medium" key={index}>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{transaction.id}</td>
                  <td className="px-3 py-4 w-52 md:w-auto">
                    <div className="line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {transaction.description}
                    </div>
                    {/* mobile view */}
                    <small className="text-xs md:hidden">
                      14 days
                    </small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    14 days
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {/* Status */}
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs flex items-center gap-1 border w-fit",
                      getStatusClass(transaction.status)
                    )}>
                      {getStatusIcon(transaction.status)}
                      <span className="text-xs">{getStatusText(transaction.status)}</span>
                    </div>
                    {/* mobile view */}
                    <small className="md:hidden text-xs text-[#414F62]">{transaction.timestamp}</small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{transaction.timestamp}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No transactions yet"
            description="Your transactions will be displayed here"
          />
        )}
      </div>
    </section>
  );
}

export default ContractTimeOff;
