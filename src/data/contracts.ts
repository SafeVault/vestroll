export type Contract = {
  id: string;
  title: string;
  amount: number;
  paymentType: number; // 1: Fiat, 2: Crypto Currency
  contractType: 'Fixed rate' | 'Pay as you go' | 'Milestone'; // 1: Fixed rate, 2: Pay as you go, 3: Milestone
  status: 'In Review' | 'Rejected' | 'Active' | 'Completed';
  period: {startDate: string; endDate: string;};
};

export const mockContracts: Contract[] = [
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'In Review',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Rejected',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Active',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Active',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
];

export interface contractHistoryFilter {
    contractType?: string;
};
