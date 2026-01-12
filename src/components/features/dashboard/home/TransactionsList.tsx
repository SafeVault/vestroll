import EmptyState from "@/components/ui/EmptyState";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function TransactionsList() {
  return (
    <section className="p-2 sm:p-4">
      <div className="sm:bg-white p-4 rounded-lg">
        <div className="flex items-center w-full gap-4 justify-between">
          <p>Transactions</p>
          <Link
            href={""}
            className="flex gap-1 text-xs font-medium text-[#5A42DE] items-center"
          >
            See all
            <ChevronRight size={14} />
          </Link>
        </div>
        <div>
          <EmptyState
            title="No transactions yet"
            description="Your transactions will displayed here "
          />
        </div>
      </div>
    </section>
  );
}

export default TransactionsList;
