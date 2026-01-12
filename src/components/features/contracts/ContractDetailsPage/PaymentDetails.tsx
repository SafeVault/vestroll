"use client"


import { Wallet, Coins, Calendar, DollarSign } from "lucide-react";

export default function PaymentDetails() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-gray-500 bg-gray-100 py-1 px-2">
        <span className="">Network</span>
        <span className=" ">
           asset
        </span>
      </div>
      <div className="flex justify-between font-bold my-3 text-md text-black">
       <div className="flex items-center gap-2">
         <img className="w-6" src="/images/eth.png" alt="" />
        <span className="">Ethereum</span>
       </div>
        <div className="flex items-center gap-2">
            <img className="w-6" src="/images/usdt.png" alt="" />

        <span className="">USDT</span>
        </div>
      </div>
      <div className="flex bg-gray-100 py-1 px-2 justify-between">
        <span className="text-gray-500">Payent Rate</span>
      </div>
       <div className="flex font-bold my-3 text-md text-black py-1 px-2 justify-between">
        <span>$580.89 (581 USDT)</span>
      </div>
      <div className="flex justify-between text-gray-500 bg-gray-100 py-1 px-2">
        <span className="">Invoice frequency</span>
        <span className=" ">
           Issue invoice on 
        </span>
      </div>
      <div className="flex justify-between font-bold my-3 text-md text-black">
      
        <span className="">Weekly</span>
     
     

        <span className="">Monday</span>
      </div>
          <div className="flex justify-between text-gray-500 bg-gray-100 py-1 px-2">
        <span className="">Payment Due</span>
        <span className=" ">
           First Invoice Date
        </span>
      </div>
      <div className="flex text-black font-bold my-3 text-md justify-between">
        <span className="">Same day</span>
        <span className="font-bold flex items-center gap-1">
          <Calendar size={14} /> 25th Oct 2025
        </span>
      </div>
          <div className="flex justify-between text-gray-500 bg-gray-100 py-1 px-2">
        <span className="">Amount</span>
        <span className=" ">
           Inclusive Tax
        </span>
      </div>
      <div className="flex font-bold my-3 justify-between">
        <span className="">Full Amount . 681 USDT</span>
        <span className="">
          No
        </span>
      </div>
    </div>
  );
}
