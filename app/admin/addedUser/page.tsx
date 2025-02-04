
'use client';

import React, { useState } from 'react';
import UserForm from '@/app/components/User/UserForm';
import { NewUserRequestBody } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/app/context/userContext';

const UserRegistration = () => {
  const { registerUser, loading } = useUserContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (newUser: NewUserRequestBody): Promise<void> => {
    setErrorMessage('');
    try {
      await registerUser(newUser);
      setSuccess('User Registration successful');
      setTimeout(() => {
        router.push('/usersList');
      }, 4000);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Registration failed: ${error.message}`);
      } else {
        setErrorMessage('User Registration unsuccessful');
      }
    }
  };

  return (
    <div className="flex h-auto items-center flex-col">
      <div className="w-full md:w-1/2 h-full bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 bg-red-100 p-3 rounded mb-4">
              <strong>{errorMessage}</strong>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-green-600 bg-green-100 p-3 rounded mb-4">
              <strong>{success}</strong>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center text-rose-600">Processing...</div>
          ) : (
            <UserForm onSubmit={handleRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;

