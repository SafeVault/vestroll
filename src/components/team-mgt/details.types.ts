export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export interface DetailsConfig<T> {
  title: string;
  getStatus: (data: T) => ApprovalStatus;

  header: {
    icon: React.ReactNode;
    title: (data: T) => string;
    subtitle?: (data: T) => string;
  };

  summary?: {
    leftLabel: string;
    leftValue: (data: T) => React.ReactNode;
    rightLabel: string;
    rightValue: (data: T) => React.ReactNode;
  };

  description?: string;

  attachments: {
    url: string;
    submittedAt: string;
  };

  reasonForRejection?: string;

  footerCards: {
    employeeId: string;
    contract: string;
    employeeName: string;
    employeeRole: string;
  }
}
