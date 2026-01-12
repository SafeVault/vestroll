import { useEffect, useState } from "react";
import {
  ChevronDown,
  Briefcase,
  Calendar,
  Clock,
  Notebook,
} from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import EmployeeCard from "./EmployeeCard";
import PaymentCard from "./PaymentCard";
import ComplianceCard from "./ComplianceCard";
import { ContractProps } from "@/types/interface";
import useModal from "@/hooks/useModal";
import ContractReviewModal from "./ContractReviewModal";

export default function ContractReviewAccordion() {
  const { hideModal, showEnhancedModal } = useModal();
  const [openSections, setOpenSections] = useState({
    details: true,
    employee: false,
    payment: false,
    compliance: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const projectData = {
    title: "Insyder Website & Webapp Design",
    type: "UI/UX Designer",
    workType: "Freelancer",
    rateType: "Fixed rate",
    notice: "14 days notice",
    duration: "25th Oct 22 - 25th Nov 22",
    scopeItems: [
      {
        title: "Infrastructure Management",
        description:
          "Manage and optimize cloud-based infrastructure, ensuring scalability and cost-effectiveness.",
      },
      {
        title: "CI/CD Pipeline Optimization",
        description:
          "Improve and expand CI/CD pipelines to enable faster and more reliable code deployment.",
      },
      {
        title: "Scripting and Automation",
        description:
          "Develop scripts and automation tools to streamline various DevOps processes.",
      },
      {
        title: "Containerization",
        description:
          "Implement and manage containerization technologies like Docker and Kubernetes.",
      },
      {
        title: "Performance Optimization",
        description:
          "Identify and resolve performance bottlenecks in applications and infrastructure.",
      },
      {
        title: "Disaster Recovery",
        description:
          "Plan and implement disaster recovery and backup solutions for critical systems.",
      },
      {
        title: "DevOps Tools",
        description:
          "Evaluate and integrate new DevOps tools to enhance efficiency and collaboration.",
      },
    ],
  };
  const employeeData = {
    firstName: "James ",
    lastName: "Adeboye",
    email: "mailjames@gmail.com",
    phoneNumber: "+234 904 384 2019",
    country: "Nigeria",
    address: "No 8 James Robertson Shittu/Ogunlana Drive,",
    city: "Surulere",
    postalCode: "142261",
  };

  const contractDetails: ContractProps = {
    noticePeriod: 7,
    paymentDetails: {
      network: "Ethereum",
      asset: "USDT",
      amount: "$580.89 (581 USDT)",
    },
    firstInvoice: {
      type: "full",
      date: "25th Oct 2025",
      amount: "580.89",
    },
    invoiceDetails: {
      invoiceFrequency: "Weekly",
      issueInvoiceOn: "Monday",
      paymentDue: "Same day",
    },
  };

  const complianceData = {
    agreement:
      "In the event that any payment due under this Agreement is not received by the Contractor within fifteen (15) days after the due date, the Client agrees to pay a late fee of 1.5% per month on any overdue amount, or the maximum amount permitted by law, whichever is lower.",
    additional_agreement: "",
  };
  const closeModal = () => {
    hideModal();
  };

  const OpenContractReviewModal = () => {
    showEnhancedModal(<ContractReviewModal />, {
      showCloseButton: false,
      size: "md",
      onCancel: closeModal,
    });
  };
  useEffect(() => {
    window.addEventListener("contracts:next", OpenContractReviewModal);
    return () =>
      window.removeEventListener("contracts:next", OpenContractReviewModal);
  });
  return (
    <div className="max-w-full min-h-screen space-y-2">
      {/* Project Details Section */}

      <div className="border rounded-lg border-gray-150 dark:border-gray-250 pb-4">
        <Accordion
          title="Project details"
          isOpen={openSections.details}
          handleOpen={() => toggleSection("details")}
        >
          {openSections.details && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="flex items-start gap-3 mb-4 mt-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Notebook className="w-5 h-5 text-[#5E2A8C]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {projectData.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {projectData.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {projectData.workType}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-400">💰</span>
                      {projectData.rateType}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {projectData.notice}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {projectData.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Scope of work
                </h4>
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  {projectData.scopeItems.map((item, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-gray-900">
                        {item.title}:
                      </span>{" "}
                      <span className="text-gray-700">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Accordion>
      </div>
      {/* Employee Details Section */}

      <div className="border rounded-lg border-gray-150 ">
        <Accordion
          isOpen={openSections.employee}
          handleOpen={() => toggleSection("employee")}
          title="Employee details"
        >
          <EmployeeCard employeeDetails={[employeeData]} />
        </Accordion>
      </div>

      {/* Payment Section */}

      <div className="border rounded-lg border-gray-150 ">
        <Accordion
          isOpen={openSections.payment}
          handleOpen={() => toggleSection("payment")}
          title="Payment details"
        >
          <PaymentCard
            contractType="Fixed Rate"
            contractDetails={contractDetails}
          />
        </Accordion>
      </div>

      {/* Compliance Section */}

      <div className="border rounded-lg border-gray-150 ">
        <Accordion
          isOpen={openSections.compliance}
          handleOpen={() => toggleSection("compliance")}
          title="Compliance"
        >
          <ComplianceCard additionalAgreement={complianceData.agreement} />
        </Accordion>
      </div>
    </div>
  );
}
