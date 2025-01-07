'use client';

import React, { useEffect } from 'react';
import UserList from '@/app/components/User/UserList';
import { useUserContext } from '@/app/context/userContext';

const ViewUsersPage = () => {
  const { users, currentUser, removeUser, setUsers} = useUserContext();


  // Effect to load users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('usersList');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers)); // Load users from localStorage
     
    }
  }, [setUsers]); // Runs only once when the component mounts

  

  // Handle delete user logic
  const handleDelete = async (id: string | null | undefined) => {
    if (!id) return;
    try {
      await removeUser(id); // Call removeUser from context
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  if (!users) {
    return <div className="text-center text-xl text-gray-600">Loading users...</div>;
  }

  return (
    <div>
      <UserList users={users} currentUser={currentUser} onDelete={handleDelete} />
    </div>
  );
};

export default ViewUsersPage;






