"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dropdown from "@/components/ui/dropdown";

interface ContractDetailsFormProps {
    onDataChange?: (data: ContractFormData) => void;
}

export interface ContractFormData {
    startDate: string;
    endDate: string;
    terminationPeriod: string;
    network: string;
    asset: string;
    amount: string;
    paymentFrequency: "Hourly" | "Daily" | "Weekly" | "Per Deliverable";
    invoiceFrequency: string;
    issueInvoiceOn: string;
    paymentDue: string;
    firstInvoiceType: "full" | "custom";
    firstInvoiceDate: string;
    firstInvoiceAmount: string;
    taxType: string;
    taxId: string;
    taxRate: string;
}

const ContractDetailsForm: React.FC<ContractDetailsFormProps> = ({ onDataChange }) => {
    const [formData, setFormData] = useState<ContractFormData>({
        startDate: "",
        endDate: "",
        terminationPeriod: "",
        network: "Ethereum",
        asset: "USDT",
        amount: "2000.00",
        paymentFrequency: "Hourly",
        invoiceFrequency: "",
        issueInvoiceOn: "",
        paymentDue: "",
        firstInvoiceType: "full",
        firstInvoiceDate: "",
        firstInvoiceAmount: "",
        taxType: "",
        taxId: "",
        taxRate: "",
    });

    useEffect(() => {
        onDataChange?.(formData);
    }, [formData, onDataChange]);

    const updateField = (field: keyof ContractFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const networks = [
        { label: "Ethereum", icon: "/eth.svg" },
        { label: "Polygon", icon: "/eth.svg" },
        { label: "Binance Smart Chain", icon: "/eth.svg" },
    ];

    const assets = [
        { label: "USDT", icon: "/Tether.svg" },
        { label: "USDC", icon: "/usdc.svg" },
        { label: "BTC", icon: "/bitcoin.svg" },
        { label: "Stellar", icon: "/stellar.svg" },
    ];

    const calculateGasFee = () => {
        const amt = Number(formData.amount);
        if (amt < 10) return 0.5;
        if (amt < 20) return 2.99;
        if (amt > 100) return 10.12;
        return 1.87;
    };

    const gasFee = calculateGasFee();
    const netAmount = Number(formData.amount) - gasFee;

    return (
        <div className="w-full">
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#5E2A8C]">Contract details</span>
                </div>
                <div className="flex gap-2">
                    <div className="h-1 flex-1 bg-[#5E2A8C] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#E5E7EB] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#E5E7EB] rounded-full"></div>
                </div>
            </div>

            {/* Contract Details Section */}
            <div className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-[#414F62] mb-2">
                            Start date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => updateField("startDate", e.target.value)}
                                className="w-full px-4 py-3 bg-[#F5F6F7] border-0 rounded-lg text-[#414F62] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C]"
                            />
                            <Image
                                src="/calander.svg"
                                alt="calendar"
                                width={20}
                                height={20}
                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-[#414F62] mb-2">
                            End date (optional)
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => updateField("endDate", e.target.value)}
                                className="w-full px-4 py-3 bg-[#F5F6F7] border-0 rounded-lg text-[#414F62] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C]"
                            />
                            <Image
                                src="/calander.svg"
                                alt="calendar"
                                width={20}
                                height={20}
                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Termination Period */}
                <div>
                    <label className="block text-sm font-medium text-[#414F62] mb-2">
                        Termination notice period (days)
                    </label>
                    <input
                        type="text"
                        placeholder="Enter number of days"
                        value={formData.terminationPeriod}
                        onChange={(e) => updateField("terminationPeriod", e.target.value)}
                        className="w-full px-4 py-3 bg-[#F5F6F7] border-0 rounded-lg text-[#414F62] placeholder:text-[#BDC5D1] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C]"
                    />
                    <p className="text-sm text-[#7F8C9F] mt-2">
                        Either party may terminate this contract by the specified notice, after which the contract will end.
                    </p>
                </div>
            </div>

            {/* Payment Details Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#17171C] mb-6">Payment details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Network Dropdown */}
                    <Dropdown
                        label="Network"
                        value={formData.network}
                        options={networks}
                        onChange={(value) => updateField("network", value)}
                        placeholder="Select network"
                    />

                    {/* Asset with Amount */}
                    <div>
                        <label className="block text-sm font-medium text-[#414F62] mb-2">
                            Asset
                            <span className="float-right text-[#17171C]">
                                +{netAmount.toFixed(2)}
                            </span>
                        </label>
                        <div className="flex items-center w-full px-4 py-3 bg-[#F5F6F7] rounded-lg">
                            <div className="flex items-center gap-2 flex-1">
                                <Image
                                    src={assets.find((a) => a.label === formData.asset)?.icon || "/Tether.svg"}
                                    alt={formData.asset}
                                    width={24}
                                    height={24}
                                />
                                <select
                                    value={formData.asset}
                                    onChange={(e) => updateField("asset", e.target.value)}
                                    className="bg-transparent border-0 focus:outline-none text-[#414F62] cursor-pointer appearance-none"
                                >
                                    {assets.map((a) => (
                                        <option key={a.label} value={a.label}>
                                            {a.label}
                                        </option>
                                    ))}
                                </select>
                                <svg className="w-4 h-4 text-[#414F62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={`$ ${formData.amount}`}
                                onChange={(e) => updateField("amount", e.target.value.replace("$ ", ""))}
                                className="text-right bg-transparent border-0 focus:outline-none text-[#414F62] w-32"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Frequency */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[#414F62] mb-3">
                        Rate unit (Payment is based on the exact number of units submitted.)
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {(["Hourly", "Daily", "Weekly", "Per Deliverable"] as const).map((freq) => (
                            <button
                                key={freq}
                                type="button"
                                onClick={() => updateField("paymentFrequency", freq)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${formData.paymentFrequency === freq
                                        ? "bg-[#5E2A8C] text-white"
                                        : "bg-white border border-[#E5E7EB] text-[#414F62] hover:border-[#5E2A8C]"
                                    }`}
                            >
                                {freq}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Invoice Details Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#17171C] mb-6">Invoice details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Invoice Frequency */}
                    <Dropdown
                        label="Invoice frequency"
                        value={formData.invoiceFrequency}
                        options={["Weekly", "Bi-weekly", "Monthly", "Quarterly", "Annually"]}
                        onChange={(value) => updateField("invoiceFrequency", value)}
                        placeholder="--"
                    />

                    {/* Issue Invoice On */}
                    <Dropdown
                        label="Issue invoice on"
                        value={formData.issueInvoiceOn}
                        options={[
                            "1st of the month",
                            "15th of the month",
                            "Last day of the month",
                            "Start of contract period",
                            "End of contract period",
                        ]}
                        onChange={(value) => updateField("issueInvoiceOn", value)}
                        placeholder="--"
                    />
                </div>

                {/* Payment Due */}
                <Dropdown
                    label="Payment due"
                    value={formData.paymentDue}
                    options={["Immediately", "Within 7 days", "Within 14 days", "Within 30 days", "Within 60 days", "Within 90 days"]}
                    onChange={(value) => updateField("paymentDue", value)}
                    placeholder="--"
                    className="mb-6"
                />
            </div>

            {/* First Invoice Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#17171C] mb-6">First Invoice</h2>

                {/* Radio Buttons */}
                <div className="flex gap-6 mb-3">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="invoiceType"
                            value="full"
                            checked={formData.firstInvoiceType === "full"}
                            onChange={(e) => updateField("firstInvoiceType", e.target.value as "full" | "custom")}
                            className="sr-only"
                        />
                        <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.firstInvoiceType === "full"
                                    ? "bg-[#5E2A8C] border-[#5E2A8C]"
                                    : "bg-white border-[#E5E7EB]"
                                }`}
                        >
                            {formData.firstInvoiceType === "full" && (
                                <span className="w-2.5 h-2.5 bg-white rounded-full" />
                            )}
                        </span>
                        <span className="ml-2 text-[#414F62]">Full amount</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="invoiceType"
                            value="custom"
                            checked={formData.firstInvoiceType === "custom"}
                            onChange={(e) => updateField("firstInvoiceType", e.target.value as "full" | "custom")}
                            className="sr-only"
                        />
                        <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.firstInvoiceType === "custom"
                                    ? "bg-[#5E2A8C] border-[#5E2A8C]"
                                    : "bg-white border-[#E5E7EB]"
                                }`}
                        >
                            {formData.firstInvoiceType === "custom" && (
                                <span className="w-2.5 h-2.5 bg-white rounded-full" />
                            )}
                        </span>
                        <span className="ml-2 text-[#414F62]">Custom amount</span>
                    </label>
                </div>
                <p className="text-sm text-[#7F8C9F] mb-6">
                    You would receive the full monthly amount for your first payment.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-[#414F62] mb-2">Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={formData.firstInvoiceDate}
                                onChange={(e) => updateField("firstInvoiceDate", e.target.value)}
                                className="w-full px-4 py-3 bg-[#F5F6F7] border-0 rounded-lg text-[#414F62] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C]"
                            />
                            <Image
                                src="/calander.svg"
                                alt="calendar"
                                width={20}
                                height={20}
                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-[#414F62] mb-2">Amount</label>
                        <input
                            type="text"
                            placeholder="0.00"
                            value={formData.firstInvoiceAmount}
                            onChange={(e) => updateField("firstInvoiceAmount", e.target.value)}
                            className="w-full px-4 py-3 bg-[#F5F6F7] border-0 rounded-lg text-[#414F62] placeholder:text-[#BDC5D1] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C]"
                        />
                    </div>
                </div>
            </div>

            {/* Tax Section */}
            <div>
                <h2 className="text-lg font-semibold text-[#17171C] mb-6">
                    Add inclusive tax (optional)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Tax Type */}
                    <Dropdown
                        label="Tax type"
                        value={formData.taxType}
                        options={[
                            "VAT - Value Added Tax",
                            "GST - Goods and Services Tax",
                            "HST - Harmonized Sales Tax",
                            "PST - Provincial Sales Tax",
                        ]}
                        onChange={(value) => updateField("taxType", value)}
                        placeholder="e.g VAT, GST, HST, PST"
                    />

                    {/* Tax ID */}
                    <div>
                        <label className="block text-sm font-medium text-[#414F62] mb-2">
                            ID / account number
                        </label>
                        <input
                            type="text"
                            placeholder="Enter tax ID or account number"
                            value={formData.taxId}
                            onChange={(e) => updateField("taxId", e.target.value)}
                            className="w-full px-4 py-3 bg-[#F5F6F7] border-0 rounded-lg text-[#414F62] placeholder:text-[#BDC5D1] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C]"
                        />
                    </div>
                </div>

                {/* Tax Rate */}
                <Dropdown
                    label="Tax rate"
                    value={formData.taxRate}
                    options={["5%", "7.5%", "10%", "13%", "15%", "18%", "20%", "25%"]}
                    onChange={(value) => updateField("taxRate", value)}
                    placeholder="--"
                />
            </div>
        </div>
    );
};

export default ContractDetailsForm;