"use client";

import { useAppSelector } from "@/hooks/redux.types";
import useModal from "@/hooks/useModal";
import { Fragment } from "react";

const Modal = () => {
  const { isOpen, modalProps } = useAppSelector((state) => state.modal);
  const { hideModal } = useModal();

  if (!isOpen) return null;

  const {
    title,
    content,
    customComponent,
    size = "md",
    showButtons = true,
    buttons = [],
    showCloseButton = true,
    onCancel,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type,
    fullScreen = false,
  } = modalProps;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-full",
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (onCancel) onCancel();
      hideModal();
    }
  };

  const handleClose = () => {
    if (onCancel) onCancel();
    hideModal();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    hideModal();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#000000bf] ${
        !fullScreen && "p-4"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white md:rounded-lg shadow-xl w-full ${sizeClasses[size]} ${!fullScreen && "rounded-lg"}`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6">
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mx-auto">
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{customComponent ? customComponent : content}</div>

        {/* Footer with buttons */}
        {showButtons && (
          <div className="flex items-center justify-end gap-3 p-6">
            {buttons.length > 0 ? (
              buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (button.onClick) button.onClick();
                    hideModal();
                  }}
                  disabled={button.disabled}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    button.variant === "primary"
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : button.variant === "danger"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : button.variant === "success"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                  } ${button.className || ""}`}
                  {...(button.disabled && { disabled: true })}
                >
                  {button.text}
                </button>
              ))
            ) : (
              <Fragment>
                {type === "confirm" && (
                  <>
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {cancelText}
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-2 rounded-lg font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                    >
                      {confirmText}
                    </button>
                  </>
                )}
                {(type === "info" ||
                  type === "success" ||
                  type === "error" ||
                  type === "warning") && (
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                  >
                    {confirmText}
                  </button>
                )}
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
