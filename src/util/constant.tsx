import {
  CalendarOngoingIcon,
  CalendarCheckIcon,
  CoinsIcon,
  DocumentIcon,
  DollarCircleIcon,
  NotebookIcon,
  Profile
} from "../../public/svg";

// Fallback icon components to preserve existing usage and resolve missing default export
const Icons = {
  DoneIcon: () => <CalendarCheckIcon />,
  BriefcaseIcon: () => <CalendarOngoingIcon />,
  CoinsIcon: () => <CoinsIcon />,
  EscrowIcon: () => <DollarCircleIcon />,
};

export const invoiceMetricsData = [
  {
    title: "Total invoices",
    value: "$ 21,600.00",
    subValue: "12 Invoices",
    icon: <DocumentIcon />,
  },
  {
    title: "Successful invoices",
    value: "$ 10,100.00",
    subValue: "05 Invoices",
    icon: <DocumentIcon />,
  },
  {
    title: "Pending invoices",
    value: "$ 6,100.00",
    subValue: "04 Invoices",
    icon: <DocumentIcon />,
  },
  {
    title: "Failed invoices",
    value: "$ 5,400.00",
    subValue: "03 Invoices",
    icon: <DocumentIcon />,
  },
];

// Contracts page metrics
export const contractMetricsData = [
  {
    title: "Completed contracts",
    value: "12",
    subValue: "10 employees",
    icon: <Icons.DoneIcon />,
  },
  {
    title: "Active contracts",
    value: "04",
    subValue: "04 employees",
    icon: <Icons.BriefcaseIcon />,
  },
  {
    title: "Average Salary per Contract",
    value: "$ 7,200.00",
    subValue: "12 contracts",
    icon: <Icons.CoinsIcon />,
  },
  {
    title: "Total Locked in Escrow",
    value: "$ 20,200.00",
    subValue: "04 contracts",
    icon: <Icons.EscrowIcon />,
  },
];

export const billingDetailsData = [
  {
    tag: "Billed to",
    name: "James Akinbiola",
    mail: " mailjames@gmail.com",
    phone: "+234 903 489 4238",
    location:
      "No 8 James Robertson Shittu/Ogunlana Drive, Surulere, Nigeria | 142261",
  },
  {
    tag: "Billed from",
    name: "Tomiwa Oluwagbemiga",
    mail: " mailjames@gmail.com",
    phone: "+234 903 489 4238",
    location:
      "No 8 James Robertson Shittu/Ogunlana Drive, Surulere, Nigeria | 142261",
  },
];

export const invoiceServiceData = [
  {
    icon: <NotebookIcon />,
    title: "Quikdash",
    desc: "Pay as you go",
    buttonText: "View contract",
    link: "",
  },
  {
    icon: <Profile />,
    title: "James Akinbiola",
    desc: "Front-end developer",
    buttonText: "View details",
    link: "",
  },
];

export const invoiceBreakDownData = [
  {
    title: "Item Name",
    value: "$500",
    subValue: "100 unit(s) at $5",
  },
  {
    title: "Item Name",
    value: "$80",
    subValue: "10 unit(s) at $8",
  },
  {
    title: "Subtotal",
    value: "$580",
  },
  {
    title: "VAT (20%)",
    value: "$2.20",
  },
];
