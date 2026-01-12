import TitleHeader from "@/components/features/dashboard/TitleHeader";
import DesktopHeader from "@/components/layout/desktop-header";
import avatar from "@public/avatar/avatar.png";
import OnboardingCheckList from "@/components/features/dashboard/home/OnboardingCheckList";
import RequiringAttention from "@/components/features/dashboard/home/RequiringAttention";
import QuickAction from "@/components/features/dashboard/home/QuickAction";
import TransactionsList from "@/components/features/dashboard/home/TransactionsList";
import { HeadPhoneIcon } from "@/components/shared/icons";
export default function DashboardPage() {
  const user = {
    name: "Peter",
    email: "peter@vestroll.com",
    userType: "Administrator",
    avatar: avatar,
  };
  return (
    <div>
      <header className="px-6 sm:pt-6 pb-1 space-y-1 sm:space-y-2 bg-white sm:border-b sm:border-[#DCE0E5] sm:pb-5">
        <h1 className="font-bold text-2xl sm:font-semibold sm:text-[1.75rem] text-text-header">
          Welcome back <span className="text-[#9D62D0]">Oreoluwa</span>!
        </h1>
        <p className="text-xs text-[#7F8C9F] font-medium leading-[120%] tracking-[0%]">
          What will you like to do today?
        </p>
      </header>
      <div className="p-2 sm:p-4">
        <OnboardingCheckList />
      </div>
      <div className="flex  gap-4 flex-col-reverse w-full lg:flex-row p-2 sm:p-4">
        <RequiringAttention />
        <QuickAction />
      </div>
      <TransactionsList />

      <div
        role="button"
        aria-label="customer care center"
        className="fixed bottom-10 bg-primary-500 size-14 flex items-center justify-center rounded-full right-10"
      >
        <HeadPhoneIcon />
      </div>
    </div>
  );
}
