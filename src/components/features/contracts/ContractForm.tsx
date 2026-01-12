import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Select } from '@headlessui/react';
import Image from 'next/image';

export default function ContractForm() {
    const [network, setNetwork] = useState('Ethereum');
    const [asset, setAsset] = useState('USDT');
    const [amount, setAmount] = useState('2000.00');
    const [firstInvoiceType, setFirstInvoiceType] = useState('full');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [terminationPeriod, setTerminationPeriod] = useState('');
    const [invoiceFrequency, setInvoiceFrequency] = useState('');
    const [issueInvoiceOn, setIssueInvoiceOn] = useState('');
    const [paymentDue, setPaymentDue] = useState('');
    const [firstInvoiceDate, setFirstInvoiceDate] = useState('');
    const [firstInvoiceAmount, setFirstInvoiceAmount] = useState('');
    const [taxType, setTaxType] = useState('');
    const [taxId, setTaxId] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const gasfee = Number(amount) < 10 ? 0.50 : Number(amount) < 20 ? 2.99 : Number() > 100 ? 10.12 : 1.87;



    const networks = [
        { name: 'Ethereum', color: 'purple' },
        { name: 'Polygon', color: 'purple' },
        { name: 'Binance Smart Chain', color: 'yellow' },
        { name: 'Avalanche', color: 'red' },
        { name: 'Arbitrum', color: 'blue' }
    ];

    const assets = [
        { name: 'USDT', symbol: "UsdtIcon" },
        { name: 'USDC', symbol: "UsdcIcon" },
        { name: 'BTC', symbol: "BitcoinIcon" },
        { name: 'Stellar', symbol: "StellarIcon" },
    ];

    const getAssetIcon = () => {
        if (asset === 'USDT') {
            return <Image src="/Tether.svg" alt="USDT" width={30} height={30} />
        } else if (asset === 'USDC') {
            return <Image src="/usdc.svg" alt="USDC" width={30} height={30} />
        } else if (asset === 'BTC') {
            return <Image src="/bitcoin.svg" alt="BTC" width={30} height={30} />
        } else if (asset === 'Stellar') {
            return <Image src="/stellar.svg" alt="Stellar" width={30} height={30} />
        } else {
            return null;
        }
    };


    return (
        <div className="w-full mx-auto bg-white">
            {/* Contract Dates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm text-gray-700 mb-2">
                        End date (optional)
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-700 mb-2">
                        Start date
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Termination Notice Period */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm text-gray-700 mb-2">
                        Termination notice period (days)
                    </label>
                    <input
                        type="number"
                        placeholder="e.g., 30"
                        value={terminationPeriod}
                        onChange={(e) => setTerminationPeriod(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-3">
                        Either party may terminate this contract by the specified notice, after which the contract will end.
                    </p>
                </div>
            </div>

            {/* Payment Details */}
            <div className="flex items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mr-4 whitespace-nowrap">Payment details</h2>
                <hr className="flex-grow border-t border-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm text-gray-700 mb-2">Network</label>
                    <div className="relative">
                        <Select
                            value={network}
                            onChange={(e) => setNetwork(e.target.value)}
                            className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-lg text-gray-900 border-none appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {networks.map((net) => (
                                <option key={net.name} value={net.name}>{net.name}</option>
                            ))}
                        </Select>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center pointer-events-none">
                            <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                        </div>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-700 mb-2">
                        Asset
                        <span className="float-right text-gray-900">={Number(amount) - gasfee}</span>
                    </label>
                    <div className="relative">
                        <div className="flex items-center w-full px-4 py-3 bg-gray-50 border-0 rounded-lg">
                            <div className="w-8 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                {getAssetIcon()}
                            </div>
                            <select
                                value={asset}
                                onChange={(e) => setAsset(e.target.value)}
                                className="bg-transparent border-0 w-30 focus:outline-none text-gray-900 cursor-pointer appearance-none pr-2"
                            >
                                {assets.map((a) => (
                                    <option key={a.name} value={a.name}>{a.name}</option>
                                ))}
                            </select>
                            <svg className="w-5 h-5 text-gray-400 mr-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <input
                                type="text"
                                value={`$ ${amount}`}
                                onChange={(e) => setAmount(e.target.value.replace('$ ', ''))}
                                className="text-right bg-transparent border-0 focus:outline-none text-gray-900 w-28"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Details */}
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Invoice details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm text-gray-700 mb-2">Invoice frequency</label>
                    <div className="relative">
                        <select
                            value={invoiceFrequency}
                            onChange={(e) => setInvoiceFrequency(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">--</option>
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="annually">Annually</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-700 mb-2">Issue invoice on</label>
                    <div className="relative">
                        <select
                            value={issueInvoiceOn}
                            onChange={(e) => setIssueInvoiceOn(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">--</option>
                            <option value="1">1st of the month</option>
                            <option value="15">15th of the month</option>
                            <option value="last">Last day of the month</option>
                            <option value="start">Start of contract period</option>
                            <option value="end">End of contract period</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm text-gray-700 mb-2">Payment due</label>
                <div className="relative">
                    <select
                        value={paymentDue}
                        onChange={(e) => setPaymentDue(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">--</option>
                        <option value="immediately">Immediately</option>
                        <option value="7">Within 7 days</option>
                        <option value="14">Within 14 days</option>
                        <option value="30">Within 30 days</option>
                        <option value="60">Within 60 days</option>
                        <option value="90">Within 90 days</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* First Invoice Section */}
            <h2 className="text-lg font-semibold text-gray-900 mb-6">First Invoice</h2>

            <div className="mb-6">
                <div className="flex gap-6 mb-3">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="invoiceType"
                            value="full"
                            checked={firstInvoiceType === 'full'}
                            onChange={(e) => setFirstInvoiceType(e.target.value)}
                            className="sr-only"
                        />
                        <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                ${firstInvoiceType === 'full' ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}
                            `}
                        >
                            {firstInvoiceType === 'full' && (
                                <span className="w-2.5 h-2.5 bg-white rounded-full" />
                            )}
                        </span>
                        <span className="ml-2 text-gray-900">Full amount</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="invoiceType"
                            value="custom"
                            checked={firstInvoiceType === 'custom'}
                            onChange={(e) => setFirstInvoiceType(e.target.value)}
                            className="sr-only"
                        />
                        <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                ${firstInvoiceType === 'custom' ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}
                            `}
                        >
                            {firstInvoiceType === 'custom' && (
                                <span className="w-2.5 h-2.5 bg-white rounded-full" />
                            )}
                        </span>
                        <span className="ml-2 text-gray-900">Custom amount</span>
                    </label>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                    You would receive the full monthly amount for your first payment.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm text-gray-700 mb-2">Date</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={firstInvoiceDate}
                            onChange={(e) => setFirstInvoiceDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-700 mb-2">Amount</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={firstInvoiceAmount}
                        onChange={(e) => setFirstInvoiceAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Add Inclusive Tax Section */}
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Add inclusive tax (optional)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm text-gray-700 mb-2">Tax type</label>
                    <div className="relative">
                        <select
                            value={taxType}
                            onChange={(e) => setTaxType(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">e.g VAT, GST, HST, PST</option>
                            <option value="VAT">VAT - Value Added Tax</option>
                            <option value="GST">GST - Goods and Services Tax</option>
                            <option value="HST">HST - Harmonized Sales Tax</option>
                            <option value="PST">PST - Provincial Sales Tax</option>
                            <option value="SST">SST - State Sales Tax</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-700 mb-2">ID / account number</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter tax ID or account number"
                            value={taxId}
                            onChange={(e) => setTaxId(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-700 mb-2">Tax rate</label>
                <div className="relative">
                    <select
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">--</option>
                        <option value="5">5%</option>
                        <option value="7.5">7.5%</option>
                        <option value="10">10%</option>
                        <option value="13">13%</option>
                        <option value="15">15%</option>
                        <option value="18">18%</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}