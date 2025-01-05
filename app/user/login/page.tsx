// 'use client';

// import UserLogin from '@/app/components/AccessLog/loginForm';
// import { LoginRequest } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';
// import { useState, useCallback } from 'react';
// import { useUserContext } from '@/app/context/userContext';
// import { login } from '@/app/api/loginApi';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { AxiosError } from 'axios';



// const UserLoginForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { saveToken} = useUserContext();
//   const router = useRouter();


//   const { setAccessLogs, setAccessLog, getLogs, accessLogs, createLog } = useAccessLogContext();

//   const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//         const responseData = await login(loginData);

        
//         const {mockUser, token, accessLog } = responseData;
        
//         console.log('user from login:', mockUser);
//         console.log('token from loging:', token);
//         console.log('accesslog from loging:', accessLog);

//         // Save token and user details
//         try {
//           await createLog(accessLog)
//             localStorage.setItem('token', token);
//             localStorage.setItem('accessLog', JSON.stringify(accessLog));
//         } catch (storageError) {
//             console.warn('LocalStorage is unavailable:', storageError);
//         }

//         // Save token and user profile
//         saveToken(token, {
//             id: mockUser.id,
//             username: mockUser.user?.username || 'Unknown User',
//             email: mockUser.user?.email || 'Unknown Email',
//             role: mockUser.user?.role ?? null,
//         });
//         setAccessLog(accessLog)
//          await getLogs()
//         // Save access logs
//         setAccessLogs((prevLogs) => [...prevLogs, accessLog]);
//         localStorage.setItem('accessLogs', JSON.stringify(accessLogs));

      

//         // Redirect based on user role
//         const userRole = mockUser.user?.role;
//         if (userRole) {
//             router.push(userRole === 'user' ? '/employee' : '/admin');
//         } else {
//             throw new Error('User role is undefined.');
//         }
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           // Handling AxiosError specifically
//           const axiosError = err as AxiosError; // Cast to AxiosError type
//           console.error('Login error:', {
//             message: err.message,
//             stack: err.stack,
//             response: axiosError.response?.data, // Safely access the response data
//           });
      
//           setError(err.message || 'An unexpected error occurred.');
      
//         } else {
//           console.error('Unknown error:', err);
//           setError('An unexpected error occurred.');
//         }
//     } finally {
//         setLoading(false);
//     }
//   }, [router, saveToken, setAccessLogs, accessLogs, createLog, getLogs, setAccessLog]);

//   return (
//     <div className="LoginContainer">
//       {error && <p className="error-text">{error}</p>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <UserLogin onSubmit={handleLogin} />
//       )}
//     </div>
//   );
// };

// export default UserLoginForm;



// 'use client';

// import UserLogin from '@/app/components/AccessLog/loginForm';
// import { LoginRequest } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';
// import { useState, useCallback } from 'react';
// import { useUserContext } from '@/app/context/userContext';
// import { login } from '@/app/api/loginApi';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { AxiosError } from 'axios';

// const UserLoginForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { saveToken } = useUserContext();
//   const router = useRouter();
//   const { createLog } = useAccessLogContext(); // Access the createLog function from context

//   const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//       const responseData = await login(loginData);

//       const { mockUser, token, accessLog } = responseData;

//       console.log('user from login:', mockUser);
//       console.log('token from login:', token);
//       console.log('accesslog from login:', accessLog);

//       if (accessLog) {
//         console.log('Calling createLog with accessLog:', accessLog);
//         await createLog(accessLog); // Ensure this is called after successful login
//       } else {
//         console.error('No accessLog returned.');
//       }

//       // Save token and user profile
//       try {
//         localStorage.setItem('token', token);
//         localStorage.setItem('accessLog', JSON.stringify(accessLog));
//       } catch (storageError) {
//         console.warn('LocalStorage is unavailable:', storageError);
//       }

//       saveToken(token, {
//         id: mockUser.id,
//         username: mockUser.user?.username || 'Unknown User',
//         email: mockUser.user?.email || 'Unknown Email',
//         role: mockUser.user?.role ?? null,
//       });

//       // Redirect based on user role
//       const userRole = mockUser.user?.role;
//       if (userRole) {
//         router.push(userRole === 'user' ? '/employee' : '/admin');
//       } else {
//         throw new Error('User role is undefined.');
//       }
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         const axiosError = err as AxiosError;
//         console.error('Login error:', {
//           message: err.message,
//           stack: err.stack,
//           response: axiosError.response?.data,
//         });

//         setError(err.message || 'An unexpected error occurred.');
//       } else {
//         console.error('Unknown error:', err);
//         setError('An unexpected error occurred.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [router, saveToken, createLog]);

//   return (
//     <div className="LoginContainer">
//       {error && <p className="error-text">{error}</p>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <UserLogin onSubmit={handleLogin} />
//       )}
//     </div>
//   );
// };

// export default UserLoginForm;



// 'use client';

// import UserLogin from '@/app/components/AccessLog/loginForm';
// import { LoginRequest } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';
// import { useState, useCallback } from 'react';
// import { useUserContext } from '@/app/context/userContext';
// import { login } from '@/app/api/loginApi';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { AxiosError } from 'axios';

// const UserLoginForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { saveToken } = useUserContext();
//   const router = useRouter();
//   const { createLog } = useAccessLogContext(); // Access the createLog function from context

//   const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//       const responseData = await login(loginData);

//       const { mockUser, token, accessLog } = responseData;

//       if(mockUser && token  && accessLog) {
        
//         console.log('user from login:', mockUser);
//         console.log('token from login:', token);
//         console.log('accesslog from login:', accessLog);


//         await createLog(accessLog);
//         localStorage.setItem('token', token);
//         localStorage.setItem('accessLog', JSON.stringify(accessLog));
     
     
      
//         const userRole = mockUser.user?.role;
//         if (userRole) {
//           router.push(userRole === 'user' ? '/employee' : '/admin');
//         } else {
//           throw new Error('User role is undefined.');
//         }
      
      
//         saveToken(token, {
//           id: mockUser.id,
//           username: mockUser.user?.username || 'Unknown User',
//           email: mockUser.user?.email || 'Unknown Email',
//           role: mockUser.user?.role ?? null,
//         });
     
//       }

       
   

//       // Redirect based on user role
      
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         const axiosError = err as AxiosError;
//         console.error('Login error:', {
//           message: err.message,
//           stack: err.stack,
//           response: axiosError.response?.data,
//         });

//         setError(err.message || 'An unexpected error occurred.');
//       } else {
//         console.error('Unknown error:', err);
//         setError('An unexpected error occurred.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [router, saveToken, createLog]);

//   return (
//     <div className="LoginContainer">
//       {error && <p className="error-text">{error}</p>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <UserLogin onSubmit={handleLogin} />
//       )}
//     </div>
//   );
// };

// export default UserLoginForm;



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
