
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/app/mocks/browser')
        .then(({ worker }) => {
          return worker.start({
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
            onUnhandledRequest: 'bypass',
          });
        })
        .then(() => {
          console.log('Mock Service Worker is active.');
        })
        .catch((error) => {
          console.error('Failed to initialize MSW:', error);
        });
    }
  }, []);

  const handleClick = () => {
    localStorage.clear();
    alert('local storage successfully cleared')
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className='h-screen'>
      <nav className='h-12 w-full flex justify-between border-2 shadow-lg align-middle'>
        <h1 className="pl-6 bg-gradient-to-r from-black via-gray-500 to-orange-500 bg-clip-text text-transparent font-bold italic text-4xl">
          DashBoard </h1>
        <ul className='flex w-[40%] justify-around mt-2' data-aos="fade-right">
          <li >sign Up</li>
          <li>Login</li>
          <li
            onClick={handleClick}>  
          clear storage
          </li>
        </ul>

      </nav>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-300 via-gray-100 to-orange-100 border-2">
        
        <div className='flex flex-col self-end mt-2' data-aos="fade-up-right mr-4">
          <div className='flex'>
            <div className='bg-gray-700 h-16 w-16 rounded-full'></div>
            <div className='bg-yellow-700 h-16 w-16 rounded-full'></div>
          </div>
          <div className='bg-blue-400 h-16 w-16 self-end rounded-full'></div>

        </div>

        <div className='self-center text-center'>
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome To DashBoard App with MSW Mocked API</h1>
        <p className="text-lg text-gray-700 mb-6">
          Open the browser console to see MSW logs when mocking is enabled.
        </p>
        <div className="flex space-x-4 text-center">
          <Link
            href="/user/register"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            Register a new account
          </Link>
          <Link
            href="/user/login"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            Already have an account? Log in
          </Link>
        </div>
        </div>


        <div className='flex flex-col  mt-2 mb-0' data-aos="fade-up-right ml-4">
          
        <div className='bg-purple-400 h-16 w-16 rounded-full'></div>
          <div className='flex'>
            <div className='bg-green-900 h-16 w-16 rounded-full'></div>
            <div className='bg-rose-500 h-16 w-16 rounded-full'></div>
          </div>
        

        </div>

      </div>

     

    </div>
  );
}
