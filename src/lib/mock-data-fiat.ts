import { Asset, Transaction } from "@/types/finance.types";

export const MOCK_FIAT_ASSETS: Asset[] = [
  {
    id: 1,
    name: "US Dollar",
    symbol: "USD",
    balance: "$2,850.75",
    amount: "2,850.75 USD",
    price: "$1.00",
    change: "+0.00%",
    icon: "/images/circle-flags_us-fiat.png",
    bgColor: "bg-[#85BB65]",
  },
  {
    id: 2,
    name: "Euro",
    symbol: "EUR",
    balance: "€1,245.30",
    amount: "1,245.30 EUR",
    price: "$1.07",
    change: "+0.15%",
    icon: "/images/emojione_flag-for-european-union_fiat.png",
    bgColor: "bg-[#003399]",
  },
  {
    id: 3,
    name: "British Pound",
    symbol: "GBP",
    balance: "£890.50",
    amount: "890.50 GBP",
    price: "$1.25",
    change: "+0.08%",
    icon: "/images/circle-flags_uk_fiat.png",
    bgColor: "bg-[#C8102E]",
  },
  {
    id: 4,
    name: "Nigerian Naira",
    symbol: "NGA",
    balance: ",000",
    amount: "950,000 NGA",
    price: "$0.0067",
    change: "-0.12%",
    icon: "/images/emojione_flag-for-nigeria_fiat.png",
    bgColor: "bg-[#BC002D]",
  },
];

// Helper functions for random data generation
const generateRandomTxId = (): string => {
  const prefixes = ["TRX-", "WIRE-", "ACH-", "SWIFT-", "SEPA-"];
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let id = prefix;

  const length = Math.floor(Math.random() * 9) + 10;
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  const mid = Math.floor(id.length / 2);
  return id.substring(0, mid) + "..." + id.substring(mid);
};

const randomFiatDescriptions = [
  "Salary payment",
  "Invoice payment",
  "Consulting services",
  "Freelance work",
  "Client payment",
  "Contract work",
  "Web development",
  "Design services",
  "Marketing campaign",
  "Software subscription",
  "Office rent",
  "Utilities payment",
  "Tax payment",
  "Insurance premium",
  "Loan repayment",
  "Investment deposit",
  "Stock purchase",
  "Bond investment",
  "Mutual fund contribution",
  "Retirement account deposit",
  "Savings transfer",
  "Bill payment",
  "Credit card payment",
  "Mortgage payment",
  "Car loan payment",
  "Student loan payment",
  "Medical expenses",
  "Education fees",
  "Travel expenses",
  "Hotel booking",
  "Flight ticket",
  "Car rental",
  "Restaurant payment",
  "Grocery shopping",
  "Online shopping",
  "Electronics purchase",
  "Clothing purchase",
  "Gift purchase",
  "Charitable donation",
  "Membership fee",
  "Gym subscription",
  "Streaming service",
  "Internet bill",
  "Phone bill",
  "Cable TV bill",
  "Bank transfer fee",
  "Currency conversion",
  "Wire transfer",
  "International payment",
  "Remittance",
  "Family support",
  "Business expense",
  "Equipment purchase",
  "Software license",
  "Cloud services",
  "Domain registration",
  "Hosting service",
  "Legal fees",
  "Accounting services",
  "Business consulting",
];

const fiatCompanies = [
  "Bank of America",
  "Chase Bank",
  "Wells Fargo",
  "Citibank",
  "HSBC",
  "Barclays",
  "Deutsche Bank",
  "UBS",
  "Credit Suisse",
  "Goldman Sachs",
  "Morgan Stanley",
  "PayPal",
  "Wise",
  "Revolut",
  "TransferWise",
  "Western Union",
  "MoneyGram",
  "Xoom",
  "Remitly",
  "WorldRemit",
];

const generateRandomFiatDescription = (): string => {
  const description =
    randomFiatDescriptions[
      Math.floor(Math.random() * randomFiatDescriptions.length)
    ];
  const company =
    fiatCompanies[Math.floor(Math.random() * fiatCompanies.length)];

  if (Math.random() > 0.5) {
    return `${company}: ${description}`;
  }

  return description;
};

const fiatAssets = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "SGD",
  "HKD",
  "CNY",
];
const fiatStatuses = ["Successful", "Pending", "Failed"] as const;
const fiatTransactionTypes = ["Deposit", "Withdrawal", "Invoice"] as const;

const generateRandomFiatAmount = (currency: string): string => {
  // Random amount between $10 and $50,000
  const amount = Math.floor(Math.random() * 50000) + 10;

  // Format based on currency
  switch (currency) {
    case "USD":
      return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case "EUR":
      return `€${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case "GBP":
      return `£${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case "JPY":
      return `¥${amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    case "CHF":
      return `CHF ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case "CAD":
      return `C$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case "AUD":
      return `A$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case "SGD":
      return `S$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    default:
      return `${currency} ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

const generateRandomFiatTimestamp = (): string => {
  const now = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const suffixes = ["th", "st", "nd", "rd"];

  const daysAgo = Math.floor(Math.random() * 90);
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let suffix = suffixes[0];
  if (day % 10 === 1 && day !== 11) suffix = suffixes[1];
  else if (day % 10 === 2 && day !== 12) suffix = suffixes[2];
  else if (day % 10 === 3 && day !== 13) suffix = suffixes[3];

  const hours = Math.floor(Math.random() * 24)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0");
  const ampm = parseInt(hours) >= 12 ? "pm" : "am";
  const displayHour = parseInt(hours) % 12 || 12;

  const formats = [
    () => `${day}${suffix} ${month} ${year} | ${displayHour}:${minutes}${ampm}`,
    () => `${month} ${day}${suffix}, ${year} ${displayHour}:${minutes}${ampm}`,
    () =>
      `${day}/${date.getMonth() + 1}/${year} ${displayHour}:${minutes}${ampm}`,
    () => `${displayHour}:${minutes}${ampm}, ${day} ${month} ${year}`,
  ];

  return formats[Math.floor(Math.random() * formats.length)]();
};

export const generateMockFiatTransactions = (
  count: number = 80
): Transaction[] => {
  return Array.from({ length: count }, (_, i) => {
    // Assign a random transaction type to each transaction
    const type =
      fiatTransactionTypes[
        Math.floor(Math.random() * fiatTransactionTypes.length)
      ];

    // Determine status
    let status: Transaction["status"];
    if (i === 0) status = "Pending";
    else if (i === 1) status = "Failed";
    else if (i === 2) status = "Successful";
    else {
      const statusIdx = Math.floor(Math.random() * fiatStatuses.length);
      status = fiatStatuses[statusIdx];
    }

    // Generate random description
    const description = generateRandomFiatDescription();

    // Generate random asset
    const asset = fiatAssets[Math.floor(Math.random() * fiatAssets.length)];

    // Generate random amount based on currency
    const amount = generateRandomFiatAmount(asset);

    return {
      id: generateRandomTxId(),
      description: description,
      amount: amount,
      asset: asset,
      status: status,
      timestamp: generateRandomFiatTimestamp(),
      network: ["SWIFT", "SEPA", "ACH", "Wire Transfer", "Local Transfer"][
        Math.floor(Math.random() * 5)
      ],
      fee: `${Math.random() > 0.5 ? "$" : "€"}${(Math.random() * 35 + 5).toFixed(2)}`,
      destinationAddress:
        fiatCompanies[Math.floor(Math.random() * fiatCompanies.length)],
      type: type,
    };
  });
};
