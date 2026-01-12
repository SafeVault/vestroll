import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon } from "@/components/shared/icons";

interface AccordionProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  title?: string;
  handleOpen?: () => void;
}

export const Accordion: FC<AccordionProps> = ({
  children,
  isOpen = false,
  title,
  handleOpen,
}) => {
  return (
    <div
      className={`w-full overflow-hidden transition-all duration-300 ease-in-out  rounded-lg   dark:bg-gray-500 bg-white`}
    >
      <div
        onClick={handleOpen}
        role="button"
        className={`flex items-center justify-between gap-2 px-4 ${
          isOpen
            ? "pt-6 pb-0 sm:p-6 sm:pb-0 transition-all delay-300 ease-in-out"
            : " pt-6 pb-6 sm:p-6 delay-500"
        } font-semibold text-gray-600 cursor-pointer  dark:text-gray-200`}
      >
        <p>{title}</p>
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ArrowDownIcon />
        </motion.span>
      </div>

      <AnimatePresence initial={isOpen}>
        <motion.div
          key="accordion-content"
          initial={{ opacity: 0, height: "0", visibility: "hidden" }}
          animate={
            isOpen
              ? { opacity: 1, height: "auto", visibility: "visible" }
              : { opacity: 0, height: "0", visibility: "hidden" }
          }
          exit="exit"
          custom={isOpen}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
