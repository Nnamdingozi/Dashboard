
'use client';

import React, { useState } from 'react';
import UserForm from '@/app/components/User/UserForm';
import { AccessLog, NewUserRequestBody } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/app/context/userContext';
import { useAccessLogContext } from '@/app/context/accesslogContext';

const UserRegistration = () => {
  const { registerUser, loading } = useUserContext(); // Using context for state
  const { createLog} = useAccessLogContext();

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (newUser: NewUserRequestBody): Promise<void> => {
    console.log('User object received in register page:', newUser);
    setErrorMessage('');

    try {
       // Await the return value from registerUser
       const { userRole, accessLog } = await registerUser(newUser); // Call registerUser directly

      if (accessLog) {
        // Log creation is done here after successful registration
        await createLog(accessLog);
      }

     

      if (userRole === 'user') {
        router.push('/employee');
      } else if (userRole === 'admin') {
        router.push('/admin');
      } else {
        setErrorMessage('Unexpected role. Please contact support.');
      }

      // Ensure accessLog exists before calling createLog
      
      
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleClik = () => {
    router.push('/user/login');
  };

  return (
    <div className="flex h-auto items-center flex-col">
      <div className="w-full md:w-1/2 h-full bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {errorMessage && (
            <div className="text-red-600 bg-red-100 p-3 rounded mb-4">
              <strong>{errorMessage}</strong>
            </div>
          )}

          {loading ? (
            <div className="text-center text-rose-600">Processing...</div>
          ) : (
            <UserForm 
            onSubmit={handleRegister}
        
             />
          )}
        </div>
      </div>

      <div className="w-full md:w-[40%] h-16 bg-gradient-to-r from-blue-100 to-blue-500 flex align-middle justify-between py-2 rounded-lg border-2">
        <p className="text-lg font-semibold text-blue-600">Already have an account?</p>

        <button
          className="bg-blue-800 text-blue-200 h-10 w-20 rounded-lg shadow-md transition-colors duration-200 hover:bg-blue-200 hover:text-blue-800 mr-3"
          onClick={handleClik}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default UserRegistration;
