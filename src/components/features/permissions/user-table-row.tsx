"use client";

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { User } from '@/types/permissions-tab.types';

interface UserTableRowProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserTableRow({ user, onEdit, onDelete }: UserTableRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
              {user.name}
              {user.status === 'invited' && (
                <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">Invited</span>
              )}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-2">
          {user.permissions.map((permission, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700"
            >
              {permission}
            </span>
          ))}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {user.status === 'invited' && (
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

