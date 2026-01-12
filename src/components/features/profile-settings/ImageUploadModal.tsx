"use client";

import React, { useState, useRef, useCallback} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, Upload, Camera, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { ImageUploadModalProps } from "./types";

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setSelectedFile(file);
      // Reset editing state
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Generate cropped image
  const getCroppedImage = useCallback((): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current;
      const image = imageRef.current;

      if (!canvas || !image || !selectedImage) {
        reject(new Error("Missing required elements"));
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Set canvas size for circular crop (200x200 for profile image)
      const size = 200;
      canvas.width = size;
      canvas.height = size;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Create circular clipping path
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      // Calculate image positioning and scaling
      const centerX = size / 2;
      const centerY = size / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.translate(-centerX + position.x, -centerY + position.y);

      // Draw the image
      ctx.drawImage(image, 0, 0, size, size);
      ctx.restore();

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const croppedFile = new File(
              [blob],
              `cropped-${selectedFile?.name || "image.png"}`,
              {
                type: "image/png",
                lastModified: Date.now(),
              }
            );
            resolve(croppedFile);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        "image/png",
        0.9
      );
    });
  }, [selectedImage, selectedFile, zoom, rotation, position]);

  const handleSave = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const croppedFile = await getCroppedImage();
      await onSave(croppedFile);
      handleCancel();
    } catch (error) {
      console.error("Failed to save image:", error);
      alert("Failed to save image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedImage(null);
    setSelectedFile(null);
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(0.5, Math.min(3, newZoom)));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Mouse/touch handlers for image dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePosition.x;
    const deltaY = e.clientY - lastMousePosition.y;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const displayImage = selectedImage || currentImage;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl shadow-lg focus:outline-none p-4 sm:p-6 w-[95vw] sm:w-[90vw] max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Edit Image
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                onClick={handleCancel}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Image Preview */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 relative">
                  {displayImage ? (
                    <div
                      className="w-full h-full relative cursor-move"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <Image
                        ref={imageRef}
                        src={displayImage}
                        alt="Profile preview"
                        width={192}
                        height={192}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                          transformOrigin: "center",
                        }}
                        draggable={false}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image Editing Controls */}
            {selectedImage && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Zoom
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleZoomChange(zoom - 0.1)}
                      className="p-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      <ZoomOut size={16} className="text-gray-600" />
                    </button>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(e) =>
                        handleZoomChange(parseFloat(e.target.value))
                      }
                      className="w-20 accent-[#5E2A8C]"
                    />
                    <button
                      onClick={() => handleZoomChange(zoom + 0.1)}
                      className="p-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      <ZoomIn size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Rotate
                  </span>
                  <button
                    onClick={handleRotate}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    <RotateCw size={14} />
                    90°
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Drag the image to reposition • Use zoom to fit perfectly
                </p>
              </div>
            )}

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver
                  ? "border-[#5E2A8C] bg-purple-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop an image here, or{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#5E2A8C] hover:underline font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!selectedFile || isLoading}
                className="flex-1 px-4 py-2.5 bg-[#5E2A8C] text-white rounded-lg hover:bg-[#4A1F6F] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" width={200} height={200} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageUploadModal;
