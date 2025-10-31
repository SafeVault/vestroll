import React from "react";

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address line
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
          placeholder="--"
          value={formData.address || ""}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alternate Address line (optional)
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
          placeholder="--"
          value={formData.altAddress || ""}
          onChange={(e) =>
            setFormData({ ...formData, altAddress: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
          placeholder="--"
          value={formData.city || ""}
          onChange={(e) =>
            setFormData({ ...formData, city: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Region/State/Province
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
          placeholder="--"
          value={formData.region || ""}
          onChange={(e) =>
            setFormData({ ...formData, region: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
          value={formData.country || ""}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        >
          <option value="">Select Country</option>
          <option value="Nigeria">🇳🇬 Nigeria</option>
          <option value="Ghana">🇬🇭 Ghana</option>
          <option value="Kenya">🇰🇪 Kenya</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Postal code / ZIP
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm placeholder:text-gray-300 bg-gray-100"
          placeholder="--"
          value={formData.zip || ""}
          onChange={(e) =>
            setFormData({ ...formData, zip: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Step2;
