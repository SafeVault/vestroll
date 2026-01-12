"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";

// Type definitions
interface BillingAddressFormData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  country: string;
  postalCode: string;
}

interface FormErrors {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  postalCode?: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountryDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  countries: Country[];
  placeholder: string;
  error?: string;
  required?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  label,
  value,
  onChange,
  countries,
  placeholder,
  error,
  required = false,
  isOpen,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  const selectedCountry = countries.find((country) => country.name === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className={`w-full px-4 py-3 text-left bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
            value ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div className="flex items-center">
            {selectedCountry && (
              <span className="mr-3 text-lg">{selectedCountry.flag}</span>
            )}
            <span>{value || placeholder}</span>
          </div>
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Search input */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Country list */}
            <div className="max-h-48 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      onChange(country.name);
                      onToggle();
                      setSearchTerm("");
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 focus:bg-purple-50 focus:outline-none transition-colors duration-150 flex items-center text-gray-900"
                  >
                    <span className="mr-3 text-lg">{country.flag}</span>
                    <span>{country.name}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

interface StateDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  required?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const StateDropdown: React.FC<StateDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className={`w-full px-4 py-3 text-left bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
            value ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {value || placeholder}
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option);
                  onToggle();
                }}
                className="w-full px-4 py-3 text-left hover:bg-purple-50 focus:bg-purple-50 focus:outline-none transition-colors duration-150 text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const BillingAddressForm: React.FC = () => {
  const [formData, setFormData] = useState<BillingAddressFormData>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    country: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Country data with flags
  const countries: Country[] = [
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "RU", name: "Russia", flag: "🇷🇺" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
  ];

  // Nigerian states
  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  // US states for reference
  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // Get states based on selected country
  const getStatesForCountry = (country: string): string[] => {
    switch (country) {
      case "Nigeria":
        return nigerianStates;
      case "United States":
        return usStates;
      default:
        return [];
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address line is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.stateProvince) {
      newErrors.stateProvince = "Please select a state/province";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Billing address submitted:", formData);
      alert("Billing address saved successfully!");
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (
    field: keyof BillingAddressFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear state when country changes
    if (field === "country" && formData.country !== value) {
      setFormData((prev) => ({ ...prev, stateProvince: "" }));
    }
  };

  const isFormValid =
    formData.addressLine1 &&
    formData.city &&
    formData.stateProvince &&
    formData.country &&
    formData.postalCode;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Mobile Header */}

      <div className="px-4 py-6 space-y-1  bg-white">
        {/* Back button - Desktop */}

        <button className="flex text-xs items-center text-gray-500 hover:text-gray-800 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Billing address
        </h1>
      </div>
      <div className="w-full max-w-xl mx-auto p-2 sm:p-6">
        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address line <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={(e) =>
                  handleInputChange("addressLine1", e.target.value)
                }
                placeholder="--"
                className={`w-full px-4 py-3 bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                  errors.addressLine1 ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.addressLine1 && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.addressLine1}
                </p>
              )}
            </div>

            {/* Address Line 2 (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alternate Address line (optional)
              </label>
              <input
                type="text"
                value={formData.addressLine2}
                onChange={(e) =>
                  handleInputChange("addressLine2", e.target.value)
                }
                placeholder="--"
                className="w-full px-4 py-3 bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 border-gray-300"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="--"
                className={`w-full px-4 py-3 bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                  errors.city ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="mt-2 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            {/* State/Province */}
            <StateDropdown
              label="Region/State/Province"
              value={formData.stateProvince}
              onChange={(value) => handleInputChange("stateProvince", value)}
              options={getStatesForCountry(formData.country)}
              placeholder="--"
              error={errors.stateProvince}
              required
              isOpen={openDropdown === "stateProvince"}
              onToggle={() =>
                setOpenDropdown(
                  openDropdown === "stateProvince" ? null : "stateProvince"
                )
              }
            />

            {/* Country */}
            <CountryDropdown
              label="Country"
              value={formData.country}
              onChange={(value) => handleInputChange("country", value)}
              countries={countries}
              placeholder="--"
              error={errors.country}
              required
              isOpen={openDropdown === "country"}
              onToggle={() =>
                setOpenDropdown(openDropdown === "country" ? null : "country")
              }
            />

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal code / ZIP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                placeholder="--"
                className={`w-full px-4 py-3 bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                  errors.postalCode ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.postalCode && (
                <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>
              )}
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                isFormValid && !isSubmitting
                  ? "bg-[#5E2A8C] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                "Save changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingAddressForm;
