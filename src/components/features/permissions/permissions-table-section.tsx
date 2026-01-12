"use client";

import React from 'react';
import { Pencil } from 'lucide-react';
import { User } from '@/types/permissions-tab.types';
import UserTableRow from './user-table-row';
import UserCard from './user-card';


interface PermissionsTableSectionProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  onSetPermission: () => void;
}

export default function PermissionsTableSection({
  users,
  onEditUser,
  onDeleteUser,
  onSetPermission
}: PermissionsTableSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Permissions</h2>
        <button
          onClick={onSetPermission}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
        >
          <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
          Set permission
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Permissions</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={() => onEditUser(user)}
                onDelete={() => onDeleteUser(user.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => onEditUser(user)}
            onDelete={() => onDeleteUser(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

