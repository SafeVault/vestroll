"use client";
import React from "react";

export function ContractType() {
  return (
    <ul className="grid w-full gap-6 md:grid-cols-2">
      <li>
        <input
          type="radio"
          id="hosting-small"
          name="hosting"
          value="hosting-small"
          className="hidden peer" />
        <label
          htmlFor="hosting-small"
          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">0-50 MB</div>
            <div className="w-full">Good for small websites</div>
          </div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="hosting-big"
          name="hosting"
          value="hosting-big"
          className="hidden peer" />
        <label
          htmlFor="hosting-big"
          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">500-1000 MB</div>
            <div className="w-full">Good for large websites</div>
          </div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="hosting-medium"
          name="hosting"
          value="hosting-medium"
          className="hidden peer" />
        <label
          htmlFor="hosting-medium"
          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">500-1000 MB</div>
            <div className="w-full">Good for large websites</div>
          </div>
        </label>
      </li>
    </ul>
  );
}
