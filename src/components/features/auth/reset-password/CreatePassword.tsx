"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Check, X, HelpCircle, ChevronLeft } from "lucide-react";

export default function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const rules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const allValid = Object.values(rules).every(Boolean);
  const passwordsMatch = confirm.length > 0 && password === confirm;

  function pillClass(valid?: boolean, empty = false) {
    if (empty) {
      return "inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-transparent";
    }
    if (valid) {
      return "inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200";
    }
    return "inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200";
  }

  return (
    <div className="h-screen bg-[#F3F4F6] flex items-stretch sm:items-center justify-center ">
      <div className="w-full h-full sm:h-full sm:max-w-full bg-gray-100 rounded-none sm:rounded-2xl shadow-sm overflow-auto">
        <div className="p-5 sm:p-6 flex flex-col min-h-full">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 text-sm">
             <ChevronLeft/>
            </button>

            <button className="flex items-center border border-black text-black py-1 px-3 rounded-2xl gap-1 text-sm font-medium cursor-pointer">
  <HelpCircle className="w-4 h-4" />
  Need Help?
</button>

          </div>

          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Create New Password</h1>
            <p className="text-sm text-gray-500 mt-1">Enter a new password to keep your account Safe and Secure.</p>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <label className="sr-only" htmlFor="password">New password</label>
              <div
                className={`relative rounded-lg ${
                  password.length === 0 ? "border border-gray-200" : allValid ? "border border-green-300" : "border border-[#8B5CF6]"
                }`}
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-4 py-3 text-sm bg-white rounded-lg outline-none"
                  aria-describedby="pw-rules"
                />
                <button
                  aria-label="Toggle password visibility"
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-2">Must Contain At Least:</div>
            <div id="pw-rules" className="flex flex-wrap gap-2 mb-4">
              <div className={pillClass(rules.length, password.length === 0)}>
                {rules.length ? <Check size={14} className=""/> : password.length === 0 ? null : <X size={14} />}
                <span>8 characters</span>
              </div>

              <div className={pillClass(rules.number, password.length === 0)}>
                {rules.number ? <Check size={14} /> : password.length === 0 ? null : <X size={14} />}
                <span>A number</span>
              </div>

              <div className={pillClass(rules.uppercase, password.length === 0)}>
                {rules.uppercase ? <Check size={14} /> : password.length === 0 ? null : <X size={14} />}
                <span>An uppercase letter</span>
              </div>

              <div className={pillClass(rules.lowercase, password.length === 0)}>
                {rules.lowercase ? <Check size={14} /> : password.length === 0 ? null : <X size={14} />}
                <span>A lowercase letter</span>
              </div>

              <div className={pillClass(rules.special, password.length === 0)}>
                {rules.special ? <Check size={14} /> : password.length === 0 ? null : <X size={14} />}
                <span>A special character</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="sr-only" htmlFor="confirm">Confirm password</label>
              <div
                className={`relative rounded-lg ${
                  confirm.length === 0
                    ? "border border-gray-200"
                    : passwordsMatch
                    ? "border border-green-300"
                    : "border border-red-300"
                }`}
              >
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 text-sm bg-white rounded-lg outline-none"
                />
                <button
                  aria-label="Toggle confirm visibility"
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {confirm.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-600 mt-2">Passwords do not match.</p>
              )}
            </div>

            <div className="flex-1" />
          </div>

          <div className="pt-4">
            <button
              disabled={!allValid || !passwordsMatch}
              className={`w-full py-3 text-sm rounded-full transition ${
                allValid && passwordsMatch
                  ? "bg-purple-700 text-white hover:bg-purple-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Set password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
