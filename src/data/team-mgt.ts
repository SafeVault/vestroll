import { ApprovalStatus } from "@/components/team-mgt/details.types";

export type TabProps = {
  id: string;
  employeeName: string;
  profileImage: string;
  employeeRole: string;
  status: ApprovalStatus;
  submittedAt: string;
};

export type Timesheet = TabProps & {
  rate: number;
  totalWorked: number;
  totalAmount: number;
};

export type Milestone = TabProps & {
  milestoneName: string;
  milestoneCompleted: number;
  totalMilestone: number;
  amount: number;
  dueDate: string;
};

export type Expense = TabProps & {
  name: string;
  category: string;
  amount: number;
  description: string;
  expenseDate: string;
};

export type Timeoff = TabProps & {
  type: 'paid' | 'unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  description: string;
  totalDuration: number;
};

export const timesheets: Timesheet[] = [
  {
    id: '0x6885afa...63b3',
    employeeName: 'John Doe',
    profileImage: '/profileImage.png',
    employeeRole: 'Software Engineer',
    rate: 12.00,
    totalWorked: 11.65,
    totalAmount: 1200.00,
    status: 'Pending',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Cody Fisher',
    profileImage: '/profileImage.png',
    employeeRole: 'Front-end Developer',
    rate: 15.00,
    totalWorked: 18.55,
    totalAmount: 1200.00,
    status: 'Rejected',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Lizzie Alba',
    profileImage: '/profileImage.png',
    employeeRole: 'Backend Engineer',
    rate: 10.00,
    totalWorked: 12.33,
    totalAmount: 1200.00,
    status: 'Approved',
    submittedAt: '25th Oct 2025'
  }
];

export const milestones: Milestone[] = [
  {
    id: '0x6885afa...63b3',
    employeeName: 'John Doe',
    profileImage: '/profileImage.png',
    employeeRole: 'Software Engineer',
    milestoneName: 'Milestone 1',
    milestoneCompleted: 10,
    totalMilestone: 12,
    amount: 1200.00,
    status: 'Pending',
    dueDate: '25th Oct 2025',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Cody Fisher',
    profileImage: '/profileImage.png',
    employeeRole: 'Front-end Developer',
    milestoneName: 'Milestone 2',
    milestoneCompleted: 4,
    totalMilestone: 12,
    amount: 1200.00,
    status: 'Rejected',
    dueDate: '25th Oct 2025',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Lizzie Alba',
    profileImage: '/profileImage.png',
    employeeRole: 'Backend Engineer',
    milestoneName: 'Milestone 3',
    milestoneCompleted: 6,
    totalMilestone: 12,
    amount: 1200.00,
    status: 'Approved',
    dueDate: '25th Oct 2025',
    submittedAt: '25th Oct 2025'
  }
];

export const expenses: Expense[] = [
  {
    id: '0x6885afa...63b3',
    employeeName: 'John Doe',
    profileImage: '/profileImage.png',
    employeeRole: 'Software Engineer',
    name: 'Expense 1',
    category: 'Category 1',
    amount: 1200.00,
    description: 'Description 1',
    expenseDate: '25th Oct 2025',
    status: 'Pending',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Cody Fisher',
    profileImage: '/profileImage.png',
    employeeRole: 'Front-end Developer',
    name: 'Expense 2',
    category: 'Category 2',
    amount: 1200.00,
    description: 'Description 2',
    expenseDate: '25th Oct 2025',
    status: 'Rejected',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Lizzie Alba',
    profileImage: '/profileImage.png',
    employeeRole: 'Backend Engineer',
    name: 'Expense 3',
    category: 'Category 3',
    amount: 1200.00,
    description: 'Description 3',
    expenseDate: '25th Oct 2025',
    status: 'Approved',
    submittedAt: '25th Oct 2025'
  }
];

export const timeoffs: Timeoff[] = [
  {
    id: '0x6885afa...63b3',
    employeeName: 'John Doe',
    profileImage: '/profileImage.png',
    employeeRole: 'Software Engineer',
    type: 'paid',
    startDate: '25th Oct 2025',
    endDate: '25th Oct 2025',
    reason: 'Annual leave',
    description: 'Utilizing accrued annual leave to spend the festive season with family and recharge for the new year.',
    totalDuration: 12,
    status: 'Pending',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Cody Fisher',
    profileImage: '/profileImage.png',
    employeeRole: 'Front-end Developer',
    type: 'paid',
    startDate: '25th Oct 2025',
    endDate: '25th Oct 2025',
    reason: 'Hospitalized',
    description: 'Utilizing accrued annual leave to spend the festive season with family and recharge for the new year.',
    totalDuration: 12,
    status: 'Rejected',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Lizzie Alba',
    profileImage: '/profileImage.png',
    employeeRole: 'Backend Engineer',
    type: 'paid',
    startDate: '25th Oct 2025',
    endDate: '25th Oct 2025',
    reason: 'Vacation',
    description: 'Utilizing accrued annual leave to spend the festive season with family and recharge for the new year.',
    totalDuration: 12,
    status: 'Approved',
    submittedAt: '25th Oct 2025'
  }
];
