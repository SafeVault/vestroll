"use client";

import { JSX } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  desc: string;
  buttonText: string;
  link: string;
}

const ServiceCard = ({
  icon,
  buttonText,
  desc,
  link,
  title,
}: ServiceCardProps) => {
  return (
    <div className="flex items-center gap-2 p-4 rounded-lg bg-white sm:p-6 sm:gap-4 w-full">
      <div className="p-3.5 rounded-lg flex items-center justify-between bg-[#F3EBF9] text-primary-500">
        {icon}
      </div>
      <div className="w-full">
        <p className="text-base font-medium sm:text-xl">{title}</p>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs font-medium">{desc}</p>
          <Link
            href={link}
            className="flex items-center gap-1 text-xs font-medium transition duration-150 ease-in-out text-primary-200 hover:text-primary-300"
          >
            <span>{buttonText}</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
