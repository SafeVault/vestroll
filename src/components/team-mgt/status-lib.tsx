import { ApprovalStatus } from "./details.types";
import { Check, XCircle, Clock } from "lucide-react";

export const getStatusIcon = (status: ApprovalStatus) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-3 h-3 text-[#F5A623]" />;
      case 'Rejected':
        return <XCircle className="w-3 h-3 text-[#FF4D4F]" />;
      case 'Approved':
        return <Check className="w-3 h-3 text-[#52C41A]" />;
    }
};

export const getStatusClass = (status: ApprovalStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FFF7E6] text-[#F5A623] border-[#F5A623]';
      case 'Rejected':
        return 'bg-[#FFF1F0] text-[#FF4D4F] border-[#FF4D4F]';
      case 'Approved':
        return 'bg-[#F6FFED] text-[#52C41A] border-[#52C41A]';
    }
};

export const getStatusText = (status: ApprovalStatus) => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'Rejected':
        return 'Rejected';
      case 'Approved':
        return 'Approved';
    }
};
