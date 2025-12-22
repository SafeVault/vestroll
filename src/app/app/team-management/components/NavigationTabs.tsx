// Renders the main navigation tabs for the dashboard.

type NavigationTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  const tabs = [
    "Employees",
    "Time tracking",
    "Milestone",
    "Time off",
    "Expense",
  ];

  return (
    <div className="w-full -mx-4 sm:mx-0 max-sm:w-sm">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 mt-4 px-4 sm:px-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-2 px-1 relative transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-primary-500 font-medium"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
