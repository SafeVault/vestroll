export type NotificationSettings = {
  contractRequests: boolean;
  contractsUpdates: boolean;
  contractsTerminations: boolean;
  timeOffRequests: boolean;
  timesheets: boolean;
  milestones: boolean;
  invoiceUpdates: "required" | boolean;
  expenseSubmissions: "required" | boolean;
  systemUpdates: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  weeklyReports: boolean;
  monthlyStatements: boolean;
  paymentReminders: boolean;
  taskDeadlines: boolean;
  teamAnnouncements: boolean;
};

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
}

export interface ProfileFormErrors {
  name?: string;
  email?: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageFile: File) => void;
  currentImage?: string;
}
