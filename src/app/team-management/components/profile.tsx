import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

interface EmployeeProfileHeaderProps {
  employee?: Employee;
  defaultEmployee?: Employee;
}

const EmployeeProfileHeader: React.FC<EmployeeProfileHeaderProps> = ({
  employee,
  defaultEmployee,
}) => {
  const employeeData = employee ||
    defaultEmployee || {
      id: "0",
      name: "Unknown Employee",
      email: "N/A",
      phone: "N/A",
      address: "N/A",
      image: "/profileImage.png",
    };

  return (
    <div className="py-4 sm:py-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl">
          <Image
            src={employeeData.image}
            alt="Profile picture"
            width={100}
            height={100}
            className=""
          />
        </div>

        {/* Employee Info */}
        <div className="flex-1 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
              {employeeData.name}
            </h1>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2 text-text-secondary px-3 text-sm bg-background-b1 py-1 rounded-lg">
                <Mail className="w-4 h-4" />
                <span>{employeeData.email}</span>
              </div>
              <div className="flex items-center gap-2 px-3 text-text-secondary text-sm bg-background-b1 py-1 rounded-lg">
                <Phone className="w-4 h-4" />
                <span>{employeeData.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-text-secondary px-1 md:px-3 w-fit text-sm bg-background-b1  py-1 rounded-lg">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span className="leading-relaxed text-sm">
                {employeeData.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileHeader;
