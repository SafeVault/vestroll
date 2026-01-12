/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { PermissionFormData, User } from '@/types/permissions-tab.types';
import React, { useState } from 'react';
import BillingEmailSection from './billing-email-section';
import PermissionsTableSection from './permissions-table-section';
import PermissionFormView from './permission-form-view';
import { de } from 'zod/v4/locales';

const initialUsers: User[] = [
  {
    id: 1,
    name: 'James Akinbiola',
    email: 'mailjames@gmail.com',
    permissions: ['Administrator'],
    status: 'active'
  },
  {
    id: 2,
    name: 'James Akinbiola',
    email: 'mailjames@gmail.com',
    permissions: ['Team manager', 'Expenses administrator', 'External recruiter'],
    status: 'active'
  },
  {
    id: 3,
    name: 'James Akinbiola',
    email: 'mailjames@gmail.com',
    permissions: ['Administrator'],
    status: 'invited'
  }
];

export default function PermissionsTab() {
  const [billingEmail, setBillingEmail] = useState<string>('legend4tech1@gmail.com');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showPermissionView, setShowPermissionView] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [permissionFormData, setPermissionFormData] = useState<PermissionFormData>({
    name: '',
    email: ''
  });

  const openPermissionView = (user?: User): void => {
    if (user) {
      setSelectedUser(user);
      setSelectedPermissions([...user.permissions]);
      setPermissionFormData({ name: user.name, email: user.email });
    } else {
      setSelectedUser(null);
      setSelectedPermissions([]);
      setPermissionFormData({ name: '', email: '' });
    }
    setShowPermissionView(true);
  };

  const closePermissionView = (): void => {
    setShowPermissionView(false);
    setSelectedUser(null);
    setSelectedPermissions([]);
    setPermissionFormData({ name: '', email: '' });
  };

  const handleDeleteUser = (userId: number): void => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete && window.confirm(`Are you sure you want to remove ${userToDelete.name}?`)) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    }
  };

  const savePermissionChanges = (
    formData: PermissionFormData,
    permissions: string[]
  ): void => {
    if (selectedUser) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.id === selectedUser.id 
          ? { ...u, permissions: [...permissions] }
          : u
      ));
      closePermissionView();
      return;
    }

    const existingUser = users.find(u => 
      u.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (existingUser) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.email.toLowerCase() === formData.email.trim().toLowerCase()
          ? { ...u, permissions: [...permissions] }
          : u
      ));
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name: formData.name.trim(),
        email: formData.email.trim(),
        permissions: [...permissions],
        status: 'invited'
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    closePermissionView();
  };

  if (showPermissionView) {
    return (
      <PermissionFormView
        selectedUser={selectedUser}
        initialFormData={permissionFormData}
        initialPermissions={selectedPermissions}
        onClose={closePermissionView}
        onSave={savePermissionChanges}
      />
    );
  }

  return (
    <div className="w-full">
      <BillingEmailSection
        billingEmail={billingEmail}
        onEmailUpdate={setBillingEmail}
      />
      <PermissionsTableSection
        users={users}
        onEditUser={openPermissionView}
        onDeleteUser={handleDeleteUser}
        onSetPermission={() => openPermissionView()}
      />
    </div>
  );
};
