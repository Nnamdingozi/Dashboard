
'use client';

import React, { useState } from 'react';
import UserForm from '@/app/components/User/UserForm';
import { NewUserRequestBody } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/app/context/userContext';
import { useAccessLogContext } from '@/app/context/accesslogContext';

const UserRegistration = () => {
  const { registerUser } = useUserContext();
  const { createLog } = useAccessLogContext();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state
  const router = useRouter();

  const handleRegister = async (newUser: NewUserRequestBody): Promise<void> => {
    console.log('User object received in register page:', newUser);
    setErrorMessage('');
    setLoading(true);

    try {
      const { userRole, accessLog } = await registerUser(newUser);

      if (accessLog) {
        await createLog(accessLog);
      }

      setIsSubmitted(true); // Mark as submitted

      if (userRole === 'user') {
        router.push('/employee');
      } else if (userRole === 'admin') {
        router.push('/admin');
      } else {
        setErrorMessage('Unexpected role. Please contact support.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center flex-col">
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {errorMessage && (
            <div className="text-red-600 bg-red-100 p-3 rounded mb-4">
              <strong>{errorMessage}</strong>
            </div>
          )}

          {loading ? (
            <div className="text-center text-rose-600">Processing...</div>
          ) : isSubmitted ? (
            <div className="text-center text-green-600">
              Registration successful! Redirecting...
            </div>
          ) : (
            <UserForm onSubmit={handleRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;

