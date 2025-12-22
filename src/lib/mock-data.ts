// lib/mockData.ts

import { Asset, Transaction } from "@/types/finance.types";

export const MOCK_ASSETS: Asset[] = [
  {
    id: 1,
    name: "Tether USD",
    symbol: "USDT",
    balance: "$476.19",
    amount: "581 USDT",
    price: "$1.00",
    change: "-0.0018%",
    icon: "/tether-icon.svg",
    bgColor: "bg-[#26A17B]",
  },
  {
    id: 2,
    name: "DAI",
    symbol: "DAI",
    balance: "$476.19",
    amount: "581 USDT",
    price: "$1.00",
    change: "-0.0018%",
    icon: "/dai-icon.svg",
    bgColor: "bg-[#F5AC37]",
  },
  {
    id: 3,
    name: "USDC",
    symbol: "USDC",
    balance: "$476.19",
    amount: "581 USDT",
    price: "$1.00",
    change: "-0.0018%",
    icon: "/usdc-icon.svg",
    bgColor: "bg-[#2775CA]",
  },
  {
    id: 4,
    name: "BNB",
    symbol: "BNB",
    balance: "$476.19",
    amount: "581 USDT",
    price: "$1.00",
    change: "-0.0018%",
    icon: "/bnb-icon.svg",
    bgColor: "bg-[#F3BA2F]",
  },
];

// Helper functions for random data generation
const generateRandomTxId = (): string => {
  const prefixes = ["0x", "TX", "TRX", "ETH-", "POLY-"];
  const chars = "0123456789abcdef";
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let id = prefix;

  const length = Math.floor(Math.random() * 9) + 16;
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  const mid = Math.floor(id.length / 2);
  return id.substring(0, mid) + "..." + id.substring(mid);
};

const randomDescriptions = [
  "Payment for services rendered",
  "Monthly subscription payment",
  "Freelance work compensation",
  "Consulting fee",
  "Software license purchase",
  "Web hosting renewal",
  "Digital marketing campaign",
  "Mobile app development",
  "UI/UX design work",
  "Blockchain development",
  "Smart contract deployment",
  "NFT collection minting",
  "Token swap execution",
  "Wallet maintenance fee",
  "Exchange trading fee",
  "Staking rewards",
  "Liquidity pool deposit",
  "Yield farming returns",
  "Airdrop distribution",
  "Community reward",
  "Bug bounty payout",
  "Security audit fee",
  "Protocol upgrade",
  "Governance vote",
  "DAO contribution",
  "Charitable donation",
  "Educational grant",
  "Research funding",
  "Conference sponsorship",
  "Partnership agreement",
  "Licensing royalty",
  "Content creation",
  "Social media marketing",
  "Influencer collaboration",
  "Brand partnership",
  "Product launch",
  "Service upgrade",
  "Maintenance contract",
  "Support subscription",
  "API access fee",
  "Data analytics",
  "Cloud storage",
  "Server hosting",
  "Domain registration",
  "SSL certificate",
  "Backup service",
  "Security monitoring",
  "Performance optimization",
  "SEO services",
  "Content marketing",
];

const companies = [
  "MintForge",
  "WebFlow",
  "CryptoCorp",
  "BlockChain Inc",
  "DeFi Labs",
  "NFT Marketplace",
  "Staking Pool",
  "Exchange Pro",
  "SmartWallet",
  "TokenFactory",
  "DApp Studio",
  "MetaVerse Corp",
  "ChainLinkers",
];

const generateRandomDescription = (): string => {
  const description =
    randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];

  // Sometimes add company name, sometimes not
  if (Math.random() > 0.5) {
    return `${company}: ${description}`;
  }

  return description;
};

const assets = [
  "USDT",
  "USDC",
  "ETH",
  "BTC",
  "DAI",
  "BNB",
  "SOL",
  "MATIC",
  "AVAX",
  "DOT",
];
const statuses = ["Successful", "Pending", "Failed"] as const;
const transactionTypes = ["Deposit", "Withdrawal", "Invoice"] as const;

const generateRandomAmount = (): string => {
  // Random amount between $10 and $50,000
  const amount = Math.floor(Math.random() * 50000) + 10;
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const generateRandomTimestamp = (): string => {
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

export const generateMockTransactions = (count: number = 80): Transaction[] => {
  return Array.from({ length: count }, (_, i) => {
    // Assign a random transaction type to each transaction
    const type =
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)];

    // Determine status (use lowercase to match your TransactionStatus type)
    let status: Transaction["status"];
    if (i === 0) status = "Pending";
    else if (i === 1) status = "Failed";
    else if (i === 2) status = "Successful";
    else {
      // Random status for remaining transactions
      const statusIdx = Math.floor(Math.random() * statuses.length);
      status = statuses[statusIdx];
    }

    // Generate random description (not based on type)
    const description = generateRandomDescription();

    // Generate random amount
    const amount = generateRandomAmount();

    // Generate random asset
    const asset = assets[Math.floor(Math.random() * assets.length)];

    return {
      id: generateRandomTxId(),
      description: description,
      amount: amount,
      asset: asset,
      status: status,
      timestamp: generateRandomTimestamp(),
      network: ["Ethereum", "Polygon", "Arbitrum", "Optimism"][
        Math.floor(Math.random() * 4)
      ],
      fee: `$${(Math.random() * 15 + 0.5).toFixed(2)}`,
      destinationAddress: generateRandomTxId().replace("...", ""),
      type: type,
    };
  });
};

// export const MOCK_ASSETS: Asset[] = [
//   {
//     id: 1,
//     name: 'Tether USD',
//     symbol: 'USDT',
//     balance: '$476.19',
//     amount: '581 USDT',
//     price: '$1.00',
//     change: '-0.0018%',
//     icon: '/tether-icon.svg',
//     bgColor: 'bg-[#26A17B]'
//   },
//   {
//     id: 2,
//     name: 'DAI',
//     symbol: 'DAI',
//     balance: '$476.19',
//     amount: '581 USDT',
//     price: '$1.00',
//     change: '-0.0018%',
//     icon: '/dai-icon.svg',
//     bgColor: 'bg-[#F5AC37]'
//   },
//   {
//     id: 3,
//     name: 'USDC',
//     symbol: 'USDC',
//     balance: '$476.19',
//     amount: '581 USDT',
//     price: '$1.00',
//     change: '-0.0018%',
//     icon: '/usdc-icon.svg',
//     bgColor: 'bg-[#2775CA]'
//   },
//   {
//     id: 4,
//     name: 'BNB',
//     symbol: 'BNB',
//     balance: '$476.19',
//     amount: '581 USDT',
//     price: '$1.00',
//     change: '-0.0018%',
//     icon: '/bnb-icon.svg',
//     bgColor: 'bg-[#F3BA2F]'
//   }
// ];

// export const generateMockTransactions = (count: number = 80): Transaction[] => {
//   return Array.from({ length: count }, (_, i) => ({
//     id: `0x6885afa...63b3`,
//     description: 'MintForge Bug fixes and performance updates',
//     amount: '$1,200.00',
//     asset: 'USDT',
//     status: i === 0 ? 'Pending' : i === 1 ? 'Failed' : 'Successful',
//     timestamp: '25th Oct 2025 | 2:00pm'
//   }));
// };
