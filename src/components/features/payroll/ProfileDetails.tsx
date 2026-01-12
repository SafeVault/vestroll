"use client";
import avatar from "@public/avatar/avatar.png";
import Image from "next/image";

const ProfileDetails = () => {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-[#e5e7eb]">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={avatar}
          alt="User Avatar"
          width={64}
          height={64}
          className="rounded-full border-2 border-purple-100"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">Oreoluwa Peter</h2>
          <p className="text-gray-500 text-sm font-medium">Administrator</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
          <span className="text-gray-500">Next Payout Date</span>
          <span className="text-gray-900 font-semibold">Jan 25, 2026</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
          <span className="text-gray-500">Payment Method</span>
          <span className="text-gray-900 font-semibold">USDT (Ethereum)</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
