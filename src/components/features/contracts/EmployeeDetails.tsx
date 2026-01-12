"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, Search, X } from "lucide-react";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
}

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface SavedEmployee {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const COUNTRIES: Country[] = [
  { name: "Afghanistan", code: "AF", dialCode: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "AL", dialCode: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", dialCode: "+57", flag: "🇨🇴" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Hong Kong", code: "HK", dialCode: "+852", flag: "🇭🇰" },
  { name: "Hungary", code: "HU", dialCode: "+36", flag: "🇭🇺" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "IL", dialCode: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Romania", code: "RO", dialCode: "+40", flag: "🇷🇴" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Taiwan", code: "TW", dialCode: "+886", flag: "🇹🇼" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "Ukraine", code: "UA", dialCode: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
];

const SAVED_EMPLOYEES: SavedEmployee[] = [
  { id: "1", name: "James Akinbiola", role: "Front-end developer", avatar: "" },
  { id: "2", name: "James Akinbiola", role: "Front-end developer", avatar: "" },
  { id: "3", name: "James Akinbiola", role: "Front-end developer", avatar: "" },
  { id: "4", name: "James Akinbiola", role: "Front-end developer", avatar: "" },
  { id: "5", name: "James Akinbiola", role: "Front-end developer", avatar: "" },
  { id: "6", name: "James Akinbiola", role: "Front-end developer", avatar: "" },
  { id: "7", name: "James Akinbiola", role: "Front-end developer", avatar: "" },
];

export default function EmployeeDetails() {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [showSavedEmployees, setShowSavedEmployees] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [phoneCodeDropdownOpen, setPhoneCodeDropdownOpen] = useState(false);
  const [countries] = useState<Country[]>(COUNTRIES);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState({
    dialCode: "+234",
    flag: "🇳🇬",
    code: "NG",
  });
  const [employeeSearch, setEmployeeSearch] = useState("");

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const phoneCodeDropdownRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
      if (
        phoneCodeDropdownRef.current &&
        !phoneCodeDropdownRef.current.contains(event.target as Node)
      ) {
        setPhoneCodeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCountrySelect = (countryName: string) => {
    handleInputChange("country", countryName);
    setCountryDropdownOpen(false);
  };

  const handlePhoneCodeSelect = (country: Country) => {
    setSelectedPhoneCode({
      dialCode: country.dialCode,
      flag: country.flag,
      code: country.code,
    });
    setPhoneCodeDropdownOpen(false);
  };

  const handleEmployeeSelect = (employee: SavedEmployee) => {
    console.log("Selected employee:", employee);
    setShowSavedEmployees(false);
  };

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
    ) {
      setShowSavedEmployees(false);
    }
  };

  const filteredEmployees = SAVED_EMPLOYEES.filter((emp) =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <div className="bg-white rounded-lg">
        {/* Select Saved Employee Button */}
        <button
          onClick={() => setShowSavedEmployees(!showSavedEmployees)}
          className="w-full mb-6 p-4 bg-[#F3EBF9] hover:bg-purple-100 rounded-[8px] flex items-center justify-between transition-colors"
        >
          <span className="text-[#5A42DE] font-medium">
            Select saved employee
          </span>
          <ChevronRight className="w-5 h-5 text-[#5A42DE]" />
        </button>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                First name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F6F7] rounded-[8px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                Last name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F6F7] rounded-[8px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F6F7] rounded-[8px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                Phone number
              </label>
              <div className="flex gap-2">
                <div className="relative" ref={phoneCodeDropdownRef}>
                  <button
                    onClick={() => setPhoneCodeDropdownOpen(!phoneCodeDropdownOpen)}
                    className="h-full px-3 py-3 bg-[#F5F6F7] rounded-[8px] flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">{selectedPhoneCode.flag}</span>
                    <span className="text-sm text-gray-700">
                      {selectedPhoneCode.dialCode}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {phoneCodeDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => handlePhoneCodeSelect(country)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-sm text-gray-700">
                            {country.dialCode}
                          </span>
                          <span className="text-sm text-gray-500">
                            {country.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#F5F6F7] rounded-[8px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Country and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                Country
              </label>
              <div className="relative" ref={countryDropdownRef}>
                <button
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className="w-full px-4 py-3 bg-[#F5F6F7] rounded-[8px] flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <span
                    className={
                      formData.country ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {formData.country || "--"}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {countryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.name)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm text-gray-700">
                          {country.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F6F7] rounded-[8px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
          </div>

          {/* City and Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F6F7] rounded-[8px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                Postal / zip code
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F6F7] rounded-[8px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Selection Modal */}
      {showSavedEmployees && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleModalBackdropClick}
        >
          <div
            ref={modalContentRef}
            className="bg-white rounded-[24px] w-full max-w-2xl max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-[24px] font-semibold text-[#17171C]">
                Select employee
              </h2>
              <button
                onClick={() => setShowSavedEmployees(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F5F6F7] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all pr-10"
                />
                <Search className="w-5 h-5 text-[#7F8C9F] absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Employee List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {filteredEmployees.map((employee) => (
                  <button
                    key={employee.id}
                    onClick={() => handleEmployeeSelect(employee)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#E9D5F5] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#5E2A8C] font-semibold text-lg">
                        {employee.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px] font-semibold text-[#17171C]">
                        {employee.name}
                      </p>
                      <p className="text-[14px] text-[#7F8C9F]">
                        {employee.role}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}