export type Transaction = {
  id: string;
  employeeName: string;
  profileImage: string;
  employeeRole: string;
  description: string;
  amount: number;
  status: 'Pending' | 'Failed' | 'Successful';
  timestamp: string;
};

export const transactions: Transaction[] = [
  {
    id: '0x6885afa...63b3',
    employeeName: 'John Doe',
    profileImage: 'https://via.placeholder.com/50',
    employeeRole: 'Software Engineer',
    description: 'MintForge Bug fixes and performance updates',
    amount: 1200.00,
    status: 'Pending',
    timestamp: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Cody Fisher',
    profileImage: 'https://via.placeholder.com/50',
    employeeRole: 'Front-end Developer',
    description: 'MintForge Bug fixes and performance updates',
    amount: 1200.00,
    status: 'Failed',
    timestamp: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Lizzie Alba',
    profileImage: 'https://via.placeholder.com/50',
    employeeRole: 'Backend Engineer',
    description: 'MintForge Bug fixes and performance updates',
    amount: 1200.00,
    status: 'Successful',
    timestamp: '25th Oct 2025'
  }
];
