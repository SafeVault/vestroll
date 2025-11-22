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

export const currencies = [
  {
    label: "USD",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PGNsaXBQYXRoIGlkPSJjIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzMCIvPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI2MpIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNiMjIyMzQiLz48ZyBmaWxsPSIjZmZmIj48cmVjdCB5PSI4IiB3aWR0aD0iNjAiIGhlaWdodD0iNCIvPjxyZWN0IHk9IjI0IiB3aWR0aD0iNjAiIGhlaWdodD0iNCIvPjxyZWN0IHk9IjQwIiB3aWR0aD0iNjAiIGhlaWdodD0iNCIvPjxyZWN0IHk9IjU2IiB3aWR0aD0iNjAiIGhlaWdodD0iNCIvPjwvZz48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjgiIGZpbGw9IiMzYzNiNmUiLz48L2c+PC9zdmc+"
  },
  {
    label: "GBP",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PGNsaXBQYXRoIGlkPSJjIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzMCIvPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI2MpIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMTIxNjkiLz48cGF0aCBkPSJNMCAwbDYwIDYwTTYwIDBMMCA2MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEyIi8+PHBhdGggZD0iTTAgMGw2MCA2ME02MCAwTDAgNjAiIHN0cm9rZT0iI2M4MTAyZSIgc3Ryb2tlLXdpZHRoPSI4Ii8+PHBhdGggZD0iTTMwIDB2NjBNMCAzMGg2MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBhdGggZD0iTTMwIDB2NjBNMCAzMGg2MCIgc3Ryb2tlPSIjYzgxMDJlIiBzdHJva2Utd2lkdGg9IjEyIi8+PC9nPjwvc3ZnPg=="
  },
  {
    label: "FR",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PGNsaXBQYXRoIGlkPSJjIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzMCIvPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI2MpIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMDU1QTQiLz48cmVjdCB4PSI0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRUY0MTM1Ii8+PC9nPjwvc3ZnPg=="
  },
  {
    label: "YEN",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PGNsaXBQYXRoIGlkPSJjIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzMCIvPjwvY2xpcFBhdGg+PGcgY2xwLXBhdGg9InVybCgjYykiPjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjE4IiBmaWxsPSIjYmMwMDJkIi8+PC9nPjwvc3ZnPg=="
  },
];
