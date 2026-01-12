"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { FileText, Upload } from "lucide-react";

export default function AgreementSelector() {
    const [selectedOption, setSelectedOption] = useState<"standard" | "custom">(
        "standard"
    );
    const [additionalTerms, setAdditionalTerms] = useState<string>("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            setSelectedOption("custom");

            if (file.type === "application/pdf" || file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const handlePreview = () => {
        if (selectedOption === "standard") {
            setPreviewUrl("standard");
            setShowPreview(true);
        } else if (uploadedFile && previewUrl) {
            setShowPreview(true);
        }
    };

    const closePreview = () => {
        setShowPreview(false);
    };

    // Cleanup preview URL
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl !== "standard") {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileClick = () => {
        if (selectedOption === "custom") {
            fileInputRef.current?.click();
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const getFileType = (filename?: string): string => {
        const ext = filename?.split(".").pop()?.toUpperCase();
        return ext ? `${ext} format` : "PDF format";
    };

    const displayFile =
        selectedOption === "standard"
            ? { name: "Standard Agreement", size: 13 * 1024 * 1024, type: "PDF format" }
            : uploadedFile
                ? {
                    name: uploadedFile.name,
                    size: uploadedFile.size,
                    type: getFileType(uploadedFile.name),
                }
                : null;

    return (
        <div className="mx-auto bg-white">
            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {displayFile?.name || "Agreement Preview"}
                            </h2>
                            <button
                                onClick={closePreview}
                                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                            >
                                X
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-auto text-gray-500 p-6">
                            {previewUrl === "standard" ? (
                                // Mock standard agreement
                                <div className="prose max-w-none">
                                    <h1 className="text-2xl font-bold mb-4">
                                        Standard Service Agreement
                                    </h1>
                                    <p className="mb-4">
                                        This Service Agreement (&quot;Agreement&quot;) is entered into as of the
                                        date of acceptance between the Service Provider and the Client.
                                    </p>
                                    <h2 className="text-xl font-semibold mt-6 mb-3">1. Services</h2>
                                    <p className="mb-4">
                                        The Service Provider agrees to provide the services as described
                                        in the project details and scope of work.
                                    </p>
                                    <h2 className="text-xl font-semibold mt-6 mb-3">
                                        2. Payment Terms
                                    </h2>
                                    <p className="mb-4">
                                        The Client agrees to pay the Service Provider according to the
                                        payment schedule outlined in the project details.
                                    </p>
                                    <h2 className="text-xl font-semibold mt-6 mb-3">
                                        3. Term and Termination
                                    </h2>
                                    <p className="mb-4">
                                        This Agreement shall commence on the start date specified in the
                                        project details and continue until completion or termination as
                                        outlined herein.
                                    </p>
                                    <h2 className="text-xl font-semibold mt-6 mb-3">
                                        4. Intellectual Property
                                    </h2>
                                    <p className="mb-4">
                                        All intellectual property rights in the deliverables shall be
                                        transferred to the Client upon full payment, unless otherwise
                                        specified.
                                    </p>
                                    <h2 className="text-xl font-semibold mt-6 mb-3">
                                        5. Confidentiality
                                    </h2>
                                    <p className="mb-4">
                                        Both parties agree to maintain the confidentiality of any
                                        proprietary information shared during the course of this
                                        engagement.
                                    </p>
                                    <h2 className="text-xl font-semibold mt-6 mb-3">6. Liability</h2>
                                    <p className="mb-4">
                                        The Service Provider&apos;s liability under this Agreement shall be
                                        limited to the total amount paid by the Client for the services.
                                    </p>
                                    <p className="mt-8 text-sm text-gray-600">
                                        This is a preview of the standard service agreement template. The
                                        actual agreement will include specific project details and may
                                        contain additional terms.
                                    </p>
                                </div>
                            ) : uploadedFile?.type === "application/pdf" ? (
                                <iframe
                                    src={previewUrl ?? ""}
                                    className="w-full h-full min-h-[600px] border border-gray-200 rounded"
                                    title="PDF Preview"
                                />
                            ) : uploadedFile?.type.startsWith("image/") ? (
                                <img
                                    src={previewUrl ?? ""}
                                    alt="Document preview"
                                    className="max-w-full h-auto mx-auto"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <FileText className="w-16 h-16 text-gray-400 mb-4" />
                                    <p className="text-gray-600 text-center">
                                        Preview is not available for this file type.
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {displayFile?.type} •{" "}
                                        {formatFileSize(displayFile?.size || 0)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={closePreview}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Radio Options */}
            <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="agreement"
                        value="standard"
                        checked={selectedOption === "standard"}
                        onChange={(e) =>
                            setSelectedOption(e.target.value as "standard" | "custom")
                        }
                        className="mt-1 w-4 h-4 accent-purple-600 cursor-pointer"
                        style={{ accentColor: "#8b5cf6" }}
                    />
                    <span className="text-sm text-gray-900 font-normal">
                        Use our standard service agreement
                    </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="agreement"
                        value="custom"
                        checked={selectedOption === "custom"}
                        onChange={(e) =>
                            setSelectedOption(e.target.value as "standard" | "custom")
                        }
                        className="mt-1 w-4 h-4 bg-amber-700 accent-purple-600 cursor-pointer"
                        style={{ accentColor: "#8b5cf6" }}
                    />
                    <div className="flex-1">
                        <span className="text-sm text-gray-900 font-normal">
                            Use your own custom agreement
                        </span>
                        <span className="text-xs text-gray-500 italic block mt-1">
                            (For custom uploaded contracts, project details will appear in an
                            addendum section attached to your PDF file.)
                        </span>
                    </div>
                </label>
            </div>

            {/* Agreement File Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Agreement file
                </label>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                {displayFile ? (
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                    {displayFile.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {displayFile.type} • {formatFileSize(displayFile.size)}
                                </div>
                            </div>
                        </div>
                        <button
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex-shrink-0 ml-4"
                            onClick={handlePreview}
                        >
                            Preview
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={handleFileClick}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 font-medium">
                            Upload custom agreement
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX</p>
                    </div>
                )}
            </div>

            {/* Additional Terms Section */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Additional terms (optional)
                </label>

                <div className="mb-2">
                    <span className="text-xs font-medium text-gray-700">Terms</span>
                </div>

                <textarea
                    value={additionalTerms}
                    onChange={(e) => setAdditionalTerms(e.target.value)}
                    placeholder="-"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                />

                <p className="text-xs text-gray-500 mt-2">
                    Add additional terms to cover special scenarios. These terms will be
                    applied to the Service Agreement Template or uploaded contract and
                    override existing contract terms.
                </p>
            </div>
        </div>
    );
}
