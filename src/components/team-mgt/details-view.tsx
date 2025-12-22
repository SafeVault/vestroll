import { ArrowLeftIcon, BuildingIcon, CheckIcon, ExternalLink, UserIcon, XIcon } from "lucide-react";
import { DetailsConfig } from "./details.types";
import { Card } from "../ui/card";
import { cn } from "@/utils/classNames";

interface DetailsViewProps<T> {
  data: T | null;
  onBack: () => void;
  onReject: () => void;
  onApprove: () => void;
  config: DetailsConfig<T>;
}

export function DetailsView<T>({
  data,
  onBack,
  onReject,
  onApprove,
  config,
}: DetailsViewProps<T>) {
  if (!data) return null;

  const status = config.getStatus(data);

  return (
    <section>
      <div className="bg-white p-4 rounded-lg">
        <div className="space-y-4 mb-6">
        {/* Back */}
        <button
          onClick={onBack}
          className="text-gray-500 flex items-center gap-2 hover:text-black"
        >
          <ArrowLeftIcon size={16} /> Back
        </button>

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-900">{config.title}</h2>

          {/* reject & approve btns */}
          <div className="flex items-center gap-2">
            <button
              onClick={onReject}
              disabled={status === "Approved" || status === "Rejected"}
              className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-primary-500 border border-primary-500 rounded-lg hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject <XIcon size={16}/>
            </button>
            <button
              onClick={onApprove}
              disabled={status === "Approved"}
              className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Approve <CheckIcon size={16}/>
            </button>
          </div>
        </div>

        {/* Main card */}
        <Card className="p-5 md:p-6 rounded-xl bg-white shadow-xs">
          <div className="flex md:flex-row justify-between items-start md:items-center gap-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#F3EBF9] text-primary-500 py-3 px-3 rounded-md">
                {config.header.icon}
              </div>
              <div>
                <p className="text-sm md:text-lg font-semibold text-gray-800">
                  {config.header.title(data)}
                </p>
                {config.header.subtitle && (
                  <p className="text-xs md:text-sm text-gray-400">
                    {config.header.subtitle(data)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-col flex">
                <span className="text-xs md:text-sm text-gray-600">Status</span>
                <span
                    className={cn(
                        "text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium",
                        status === "Approved"
                            ? "bg-green-50 border border-green-400 text-green-600"
                            : status === "Rejected"
                            ? "bg-red-50 border border-red-400 text-red-600"
                            : "bg-yellow-50 border border-yellow-400 text-yellow-600"
                        )}
                    >
                    {status}
                </span>
            </div>
          </div>

          {/* Summary */}
          {config.summary && (
            <div className="space-y-4">
              <div className="flex justify-between bg-gray-100 text-gray-500 p-2 text-sm">
                <p>{config.summary.leftLabel}</p>
                <p>{config.summary.rightLabel}</p>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <p>{config.summary.leftValue(data)}</p>
                <p>{config.summary.rightValue(data)}</p>
              </div>
            </div>
          )}

          {/* Description */}
          {config.description && (
            <div>
              <p className="text-gray-500 bg-gray-100 p-1 text-sm mb-1">
                Description
              </p>
              <p className="text-gray-700 text-md font-bold p-1">
                {config.description}
              </p>
            </div>
          )}

          {/* Attachments */}
          {config.attachments && (
            <div className="text-sm">
              <div className="bg-gray-100 py-1 px-1 flex items-center justify-between">
                    <p className="text-gray-500 ">Attachment</p>
                    <p className="text-gray-500">Submitted on</p>
                </div>

                <div className="mt-2 text-primary-500 cursor-pointer">
                    <div className="justify-between items-center flex">
                        <span onClick={() => window.open(config.attachments.url, "_blank")} className="pl-1">File_name.pdf</span>
                        <p className="text-gray-700">{config.attachments.submittedAt}</p>
                    </div>
                </div>
            </div>
          )}

          {/* Reason for rejection */}
          {config.reasonForRejection && (
            <div>
              <p className="text-gray-500 bg-gray-100 p-1 text-sm mb-1">
                Reason for rejection
              </p>
              <p className="text-gray-700 text-md font-bold p-1">
                {config.reasonForRejection}
              </p>
            </div>
          )}
        </Card>

        {/* Footer cards */}
        {config.footerCards && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card className="p-4 rounded-xl shadow-xs">
                <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-[#F3EBF9] py-3 px-3 rounded-md">
                        <BuildingIcon className="text-primary-500" size={20} />
                    </div>
                    <div>
                        <p className="font-medium">Quikdash</p>
                        <p className="text-sm text-gray-500">Pay as you go</p>
                    </div>
                </div>
                <button onClick={() => window.open(config.footerCards.contract, "_blank")} className="text-primary-500 relative top-3 gap-1 flex items-center text-sm hover:underline cursor-pointer">
                    View contract

                    <ExternalLink size={15}/>
                </button>
                </div>
            </Card>

            <Card className="p-4 rounded-xl shadow-xs">
                <div className="flex justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#F3EBF9] py-3 px-3 rounded-md">
                        <UserIcon className="text-primary-500" size={20} />
                    </div>
                    <div>
                        <p className="font-medium">{config.footerCards.employeeName}</p>
                        <p className="text-sm text-gray-500">{config.footerCards.employeeRole}</p>
                    </div>
                </div>
                <button onClick={() => window.open(`/app/team-management/${config.footerCards.employeeId}`, "_blank")} className="text-primary-500 relative top-3  gap-1 flex items-center text-sm hover:underline cursor-pointer">
                    View details
                    <ExternalLink size={15}/>
                </button>
                </div>
            </Card>
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
