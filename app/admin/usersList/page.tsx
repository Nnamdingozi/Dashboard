'use client';

import React from 'react';
import UserList from '@/app/components/User/UserList';
import { useUserContext } from '@/app/context/userContext';

const ViewUsersPage = () => {
  const { users, currentUser, removeUser } = useUserContext();

  const handleDelete = async (id: string | null | undefined) => {
    if (!id) return;
    try {
      await removeUser(id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!users?.length) {
    return (
      <div className="text-center text-xl text-gray-600">
        No users found.
      </div>
    );
  }

  return (
    <div>
      <UserList 
        users={users} 
        currentUser={currentUser} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default ViewUsersPage;
