import { Location, Mail, Phone, ProfileIcon } from "@/components/shared/icons";
import { EmployeeDetails } from "@/types/interface";
import useModal from "@/hooks/useModal";
import ContractReviewModal from "./ContractReviewModal";
interface EmployeeCardProps {
  employeeDetails: EmployeeDetails[];
}
function EmployeeCard({ employeeDetails }: EmployeeCardProps) {
  const { hideModal, showEnhancedModal } = useModal();
  const closeModal = () => {
    hideModal();
  };

  const OpenContractReviewModal = () => {
    showEnhancedModal(<ContractReviewModal />, {
      showCloseButton: false,
      size: "lg",
      onCancel: closeModal,
    });
  };

  return (
    <div className="max-w-4xl space-x-4  px-4 py-6 sm:p-6 flex ">
      <div className="items-center justify-between hidden p-4 h-fit rounded-lg sm:flex bg-purple-100  w-fit text-primary-500 dark:text-primary-400 ">
        <ProfileIcon />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-text-header sm:text-xl  capitalize ">
          {employeeDetails[0].firstName} {employeeDetails[0].lastName}
        </p>
        <div className="flex gap-x-6 gap-y-2 [&>div]:flex [&>div]:items-center [&>div]:gap-1 [&>div]:text-sm [&>div]:font-medium [&>div]:text-text-header flex-wrap ">
          <div className="border border-white bg-gray-100 dark:border-gray-700 px-3 py-1 rounded-full dark:bg-gray-600">
            <Mail />
            <p>{employeeDetails[0].email}</p>
          </div>
          <div className="border border-white bg-gray-100 dark:border-gray-700 px-3 py-1 rounded-full dark:bg-gray-600">
            <Phone />
            <p>{employeeDetails[0].phoneNumber}</p>
          </div>
          <div className="border border-white bg-[#DCE0E5]  px-3 py-1 rounded-full  flex ">
            <Location />
            <p>
              {employeeDetails[0].address}, {employeeDetails[0].city}{" "}
              {employeeDetails[0].country} | {employeeDetails[0].postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
