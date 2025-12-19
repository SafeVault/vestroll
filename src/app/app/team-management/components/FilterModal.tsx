import { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: Record<string, string>;
  onApply: (filters: Record<string, string>) => void;
  filterConfiguration: FilterGroup[];
};

export const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onApply,
  filterConfiguration,
}: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync local filters when modal opens or external filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleCancel = () => {
    setLocalFilters(filters);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40" onClick={handleCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            {filterConfiguration.map((group) => (
              <div key={group.key}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {group.label}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      setLocalFilters({ ...localFilters, [group.key]: "All" })
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !localFilters[group.key] || localFilters[group.key] === "All"
                        ? "bg-purple-100 text-primary-500 border border-purple-300"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {group.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setLocalFilters({ ...localFilters, [group.key]: option.value })
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        localFilters[group.key] === option.value
                          ? "bg-purple-100 text-primary-500 border border-purple-300"
                          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 bg-primary-500 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
