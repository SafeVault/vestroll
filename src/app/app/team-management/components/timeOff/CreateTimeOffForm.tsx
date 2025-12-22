"use client";

// This component contains the entire form for creating a new time off record.
import React, { useState, useRef } from "react";
import {
  User,
  ChevronRight,
  ChevronDown,
  Calendar,
  Upload,
  File,
  Trash2,
} from "lucide-react";
import { TimeOffFormData, Employee } from "@/types/teamManagement.types"; // Import Employee type
import { SelectEmployeeModal } from "./SelectEmployeeModal"; // Import the new modal

// ============================================
// SUB-COMPONENTS (Colocated)
// These are only used within this form.
// ============================================

// This code goes inside your components/time-off/CreateTimeOffForm.tsx file

const EmployeeSelector = ({
  selectedEmployee,
  onClick,
}: {
  selectedEmployee: Employee | null;
  onClick: () => void;
}) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Employee
    </label>
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between hover:bg-purple-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
          {selectedEmployee?.avatar ? (
            <img
              src={selectedEmployee.avatar}
              alt={selectedEmployee.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={20} className="text-primary-500" />
          )}
        </div>
        <div className="text-left">
          <p className="font-medium text-gray-900">
            {selectedEmployee ? selectedEmployee.name : "Select employee"}
          </p>
          <p className="text-sm text-gray-500">
            What employee are you giving a time off
          </p>
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </button>
  </div>
);

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

  // To handle timezone issues and get the correct date
  const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  let day = utcDate.getDate().toString();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(utcDate);
  const year = utcDate.getFullYear();

  // Add ordinal suffix (st, nd, rd, th)
  if (day.endsWith('1') && day !== '11') {
    day += 'st';
  } else if (day.endsWith('2') && day !== '12') {
    day += 'nd';
  } else if (day.endsWith('3') && day !== '13') {
    day += 'rd';
  } else {
    day += 'th';
  }

  return `${day} ${month}, ${year}`;
};

const TimeOffTypeToggle = ({ type, onChange }: { type: 'paid' | 'unpaid'; onChange: (type: 'paid' | 'unpaid') => void; }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Time off type
      </label>
      <div className="w-full bg-gray-100 p-1 rounded-full flex">
        <button
          type="button"
          onClick={() => onChange('paid')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors focus:outline-none ${
            type === 'paid'
              ? 'bg-white text-primary-500 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Paid time off
        </button>
        <button
          type="button"
          onClick={() => onChange('unpaid')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors focus:outline-none ${
            type === 'unpaid'
              ? 'bg-white text-primary-500 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Unpaid time off
        </button>
      </div>
    </div>
);

const ReasonSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Reason
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
      >
        <option value="">Select reason</option>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        size={20}
      />
    </div>
  </div>
);

const DateInput = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void; }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                {/* This is the hidden input that handles date picking */}
                <input
                    ref={inputRef}
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                />
                {/* This is the visible button-like display */}
                <button
                    type="button"
                    onClick={() => inputRef.current?.showPicker()}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 flex justify-between items-center text-left"
                >
                    <span className={value ? "text-gray-800" : "text-gray-500"}>
                        {value ? formatDate(value) : "Select date"}
                    </span>
                    <Calendar className="text-gray-500" size={20} />
                </button>
            </div>
        </div>
    );
};

const FileUpload = ({ file, onChange }: { file: File | null; onChange: (file: File | null) => void; }) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) onChange(droppedFile);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null;
      onChange(selectedFile);
    };

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachment (Optional)
        </label>

        {file ? (
            // UI to show when a file is selected
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-white border border-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <File size={20} className="text-primary-500" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                </div>
                <button
                    onClick={() => onChange(null)}
                    className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors flex-shrink-0"
                    aria-label="Remove file"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        ) : (
            // The dropzone UI to show when no file is selected
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
            >
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-3">
                        <Upload size={24} className="text-primary-500" />
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                        <label className="text-primary-500 font-medium cursor-pointer">
                            Click to upload
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        {' '}or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                </div>
            </div>
        )}
      </div>
    );
};

const DurationDisplay = ({ days }: { days: number }) => (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-grow h-px bg-gray-200" />
      <p className="text-sm text-gray-500 whitespace-nowrap">
        Duration of time off: <span className="font-medium text-gray-700">{days} {days === 1 ? 'day' : 'days'}</span>
      </p>
      <div className="flex-grow h-px bg-gray-200" />
    </div>
);

// ============================================
// MAIN FORM COMPONENT
// ============================================
export const CreateTimeOffForm = ({ employees }: { employees: Employee[] }) => {
  const [formData, setFormData] = useState<TimeOffFormData>({
    employee: null,
    timeOffType: "paid",
    reason: "",
    startDate: "",
    endDate: "",
    description: "",
    attachment: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const reasonOptions = [
    "Vacation",
    "Sick Leave",
    "Personal Leave",
    "Maternity/Paternity Leave",
    "Bereavement",
    "Other",
  ];

  const handleSelectEmployee = (employee: Employee) => {
    setFormData({ ...formData, employee: employee });
  };

  const calculateDuration = (): number => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Time off request created successfully!");
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
          <EmployeeSelector
            selectedEmployee={formData.employee}
            onClick={() => setIsModalOpen(true)}
          />
          <TimeOffTypeToggle
            type={formData.timeOffType}
            onChange={(type) => setFormData({ ...formData, timeOffType: type })}
          />
          <ReasonSelect
            value={formData.reason}
            onChange={(reason) => setFormData({ ...formData, reason })}
            options={reasonOptions}
          />
          <DateInput
            label="Start date"
            value={formData.startDate}
            onChange={(startDate) => setFormData({ ...formData, startDate })}
          />
          <DateInput
            label="End date"
            value={formData.endDate}
            onChange={(endDate) => setFormData({ ...formData, endDate })}
          />
          <DurationDisplay days={calculateDuration()} />
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700 resize-none"
              placeholder="Add any additional notes..."
            />
          </div>
          <FileUpload
            file={formData.attachment}
            onChange={(attachment) => setFormData({ ...formData, attachment })}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-primary-500 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Create record
          </button>
        </div>
      </div>

      <SelectEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employees={employees}
        onSelect={handleSelectEmployee}
      />
    </>
  );
};
