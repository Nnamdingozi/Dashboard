'use client';

import UserLogin from '@/app/components/AccessLog/loginForm';
import { LoginRequest } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useUserContext } from '@/app/context/userContext';
import { login } from '@/app/api/loginApi';
import { useAccessLogContext } from '@/app/context/accesslogContext';
import { AxiosError } from 'axios';



const UserLoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { saveToken} = useUserContext();
  const router = useRouter();


  const { setAccessLogs, setAccessLog, getLogs, accessLogs, createLog } = useAccessLogContext();

  const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
        const responseData = await login(loginData);

        
        const {mockUser, token, accessLog } = responseData;
        
        console.log('user from login:', mockUser);
        console.log('token from loging:', token);
        console.log('accesslog from loging:', accessLog);

        // Save token and user details
        try {
          await createLog(accessLog)
            localStorage.setItem('token', token);
            localStorage.setItem('accessLog', JSON.stringify(accessLog));
        } catch (storageError) {
            console.warn('LocalStorage is unavailable:', storageError);
        }

        // Save token and user profile
        saveToken(token, {
            id: mockUser.id,
            username: mockUser.user?.username || 'Unknown User',
            email: mockUser.user?.email || 'Unknown Email',
            role: mockUser.user?.role ?? null,
        });
        setAccessLog(accessLog)
         await getLogs()
        // Save access logs
        setAccessLogs((prevLogs) => [...prevLogs, accessLog]);
        localStorage.setItem('accessLogs', JSON.stringify(accessLogs));

      

        // Redirect based on user role
        const userRole = mockUser.user?.role;
        if (userRole) {
            router.push(userRole === 'user' ? '/employee' : '/admin');
        } else {
            throw new Error('User role is undefined.');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          // Handling AxiosError specifically
          const axiosError = err as AxiosError; // Cast to AxiosError type
          console.error('Login error:', {
            message: err.message,
            stack: err.stack,
            response: axiosError.response?.data, // Safely access the response data
          });
      
          setError(err.message || 'An unexpected error occurred.');
      
        } else {
          console.error('Unknown error:', err);
          setError('An unexpected error occurred.');
        }
    } finally {
        setLoading(false);
    }
  }, [router, saveToken, setAccessLogs, accessLogs, createLog, getLogs, setAccessLog]);

  return (
    <div className="LoginContainer">
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserLogin onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default UserLoginForm;






