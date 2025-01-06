
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
  const { saveToken } = useUserContext();
  const router = useRouter();
  const { createLog } = useAccessLogContext();

  const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { mockUser, token, accessLog } = await login(loginData);

      // Save token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('accessLog', JSON.stringify(accessLog));

      saveToken(token, {
        id: mockUser.id,
        username: mockUser.user?.username || 'Unknown User',
        email: mockUser.user?.email || 'Unknown Email',
        role: mockUser.user?.role ?? null,
      });

      // Create access log
      if (accessLog) {
        await createLog(accessLog);
      } else {
        console.warn('Access log data is missing.');
      }

      // Redirect based on user role
      const userRole = mockUser.user?.role;
      if (userRole) {
        router.push(userRole === 'user' ? '/employee' : '/admin');
      } else {
        throw new Error('User role is undefined.');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('Login error:', {
          message: err.message,
          response: err.response?.data,
        });
      } else {
        console.error('Unexpected error:', err);
      }
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [router, saveToken, createLog]);

  return (
    <div className="LoginContainer">
      {error && <p className="error-text">{error}</p>}
      {loading ? <p>Loading...</p> : <UserLogin onSubmit={handleLogin} />}
    </div>
  );
};

export default UserLoginForm;
