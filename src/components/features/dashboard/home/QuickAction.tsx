import {
  CalenderIcon,
  NotePadIcon,
  ReceiveIcon,
  SendIcon,
} from "@/components/shared/icons";

function QuickAction() {
  const actions = [
    {
      name: "Create contract",
      icon: <NotePadIcon />,

      action: () => {},
    },
    {
      name: "Create time-off",
      icon: <CalenderIcon />,
      action: () => {},
    },
    {
      name: "Withdraw",
      icon: <SendIcon />,
      action: () => {},
    },
    {
      name: "Fund wallet",
      icon: <ReceiveIcon />,
      action: () => {},
    },
  ];
  return (
    <div className="max-w-[25rem] w-full sm:bg-white  rounded-lg p-4 gap-4 flex flex-col ">
      <p className="text-base font-medium text-text-header ">Quick actions</p>
      <div className="flex gap-4 flex-wrap items-center">
        {actions.map((action, index) => {
          return (
            <button
              key={index}
              className="p-4 rounded-lg flex items-center gap-2 sm:bg-[#F3EBF9] bg-white text-base font-medium text-text-header  w-fit"
            >
              {action.icon}
              <span>{action.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickAction;
