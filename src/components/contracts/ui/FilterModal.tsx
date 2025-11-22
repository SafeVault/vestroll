import { motion, AnimatePresence } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";

export interface FilterSelection {
  contractType: string;
  status: string;
}

export interface FilterModalProps {
  onClose: () => void;
  onApply: (selection: FilterSelection) => void;
  contractTypes: string[];
  statusTypes: string[];
  initialSelection: FilterSelection;
}

export default function FilterModal({
  onClose,
  onApply,
  contractTypes,
  statusTypes,
  initialSelection,
}: FilterModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // internal working state (only commit on Apply)
  const [selection, setSelection] = useState<FilterSelection>(initialSelection);

  // --- ESCAPE KEY CLOSE ---
  useEffect(() => {
    const handleKey = (e: KeyboardEvent | any) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // --- CLOSE WHEN CLICKING OUTSIDE ---
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  // --- FOCUS TRAP ---
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors = `
      button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])
    `;

    const focusables = Array.from(
      modal.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const trap = (e: KeyboardEvent | any) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", trap);
    first?.focus();

    return () => window.removeEventListener("keydown", trap);
  }, []);

  // --- APPLY HANDLER ---
  const handleApply = () => {
    onApply(selection); // return final selection to parent
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={backdropRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white w-[90%] max-w-md md:max-w-xl rounded-2xl p-6 shadow-xl relative outline-none"
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 left-4 text-2xl"
            onClick={onClose}
            aria-label="Close filter modal"
          >
            &times;
          </button>

          {/* Title */}
          <h2 className="text-center text-xl font-semibold mb-6">Filter</h2>

          <div className="space-y-8">
            {/* Contract Type */}
            <div>
              <p className="text-gray-600 mb-3">Contract type</p>
              <div className="flex flex-wrap gap-3">
                {contractTypes.map((type) => {
                  const active = selection.contractType === type;
                  return (
                    <button
                      key={type}
                      onClick={() =>
                        setSelection((prev) => ({
                          ...prev,
                          contractType: type,
                        }))
                      }
                      className={`px-4 py-2 rounded-full text-sm transition
                        ${
                          active
                            ? "bg-[#F3EBF9] text-primary-500 font-medium"
                            : "bg-gray-50 text-gray-400"
                        }
                      `}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-gray-600 mb-3">Status</p>
              <div className="flex flex-wrap gap-3">
                {statusTypes.map((s) => {
                  const active = selection.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() =>
                        setSelection((prev) => ({
                          ...prev,
                          status: s,
                        }))
                      }
                      className={`px-4 py-2 rounded-full text-sm transition
                        ${
                          active
                            ? "bg-[#F3EBF9] text-primary-500 font-medium"
                            : "bg-gray-50 text-gray-400"
                        }
                      `}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-10 flex justify-between gap-4">
            <button
              className="flex-1 py-3 rounded-xl border-2 border-[#17171C] text-gray-700
                font-medium cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium
                cursor-pointer"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
