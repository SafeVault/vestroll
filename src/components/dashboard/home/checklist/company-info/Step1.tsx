import React, { useRef } from "react";

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, setFormData }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-violet-400 bg-violet-50 text-violet-600 text-2xl font-semibold">
          {formData.logo ? (
            <img
              src={formData.logo}
              alt="Company logo"
              className="rounded-full w-24 h-24 object-cover"
            />
          ) : (
            <span>{formData.brandName?.[0]?.toUpperCase() || "T3"}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 text-sm text-violet-700 hover:underline cursor-pointer"
        >
          <img src={"/gallery-add.png"} alt="gallery-icon"/>
          Upload image
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Form fields */}
      <div className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company/Brand name
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
            placeholder="--"
            value={formData.brandName || ""}
            onChange={(e) =>
              setFormData({ ...formData, brandName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registered name
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
            placeholder="--"
            value={formData.registeredName || ""}
            onChange={(e) =>
              setFormData({ ...formData, registeredName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Number / EIN ID
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
            placeholder="--"
            value={formData.registrationNumber || ""}
            onChange={(e) =>
              setFormData({ ...formData, registrationNumber: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country of incorporation
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            value={formData.country || ""}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          >
            <option value="--">Select Country</option>
            <option value="Nigeria">🇳🇬 Nigeria</option>
            <option value="Ghana">🇬🇭 Ghana</option>
            <option value="Kenya">🇰🇪 Kenya</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
              value={formData.size || ""}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
            >
              <option value="--">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              VAT number
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
            placeholder="--"
              value={formData.vat || ""}
              onChange={(e) =>
                setFormData({ ...formData, vat: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company public website URL
          </label>
          <input
            type="url"
            className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
            placeholder="--"
            value={formData.website || ""}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
