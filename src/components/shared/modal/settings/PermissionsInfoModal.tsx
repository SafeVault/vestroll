import { CancelIcon, PermissionIcon } from "@/components/shared/icons";

const permissionListDetails = [
  {
    title: "Administrator",
    desc: "Has full access to view and edit information in all areas of the platform, including both company and engagement data.",
  },
  {
    title: "Team manager",
    desc: "Can view, add, and edit information relating to members of their team within the Time off and Expenses sections. This role has no access to any other areas or to any information outside of their team.",
  },
  {
    title: "Expenses administrator",
    desc: "Can view and edit information in the Expenses section. This role has no access to any other areas outside of Expenses.",
  },
  {
    title: "Expenses administrator",
    desc: "Can view and edit information in the Expenses section. This role has no access to any other areas outside of Expenses.",
  },
  {
    title: "Invoice administrator",
    desc: "Can view and edit information in the Invoices section. This role can also view the Payroll section but can’t edit information there.",
  },
  {
    title: "Payroll administrator",
    desc: "Can view and edit information in the Payroll section. This role can also view the Invoices section but can’t edit information there.",
  },
  {
    title: "Time off administrator",
    desc: "Can view and edit information in the Time off section. This role has no access to any other areas outside of Time off.",
  },
];

const PermissionsInfoModal = () => {
  return (
    <div className="w-full ">
      <div className="relative ">
        <button className="cursor-pointer absolute left-0">
          <CancelIcon size={32} />
        </button>
        <h1 className="text-xl text-center font-semibold">Permissions</h1>
      </div>

      <div className="divide-y divide-gray-150 dark:divide-gray-250 mt-8 max-h-125 h-full overflow-y-auto custom-scrollbar">
        {permissionListDetails.map((permission) => (
          <div className="py-4 flex gap-2 items-center" key={permission.title}>
            <div className="size-10 shrink-0 flex items-center justify-center bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400 rounded-full">
              <PermissionIcon />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-150 mb-1">
                {permission.title}
              </p>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                {permission.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsInfoModal;
