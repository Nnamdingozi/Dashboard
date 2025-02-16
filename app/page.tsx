

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import LoadingSpinner from './components/loadingSpinner'

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Ensure animations happen only once
    });

    // Optional: Refresh AOS when needed
    AOS.refresh();

    // Initialize MSW (Mock Service Worker) if mocking is enabled
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
    alert('Local storage successfully cleared');
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
       
        <LoadingSpinner/>
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="h-16 w-full flex justify-between items-center px-4 sm:px-6 lg:px-12 shadow-md bg-white">
        <h1 className="text-2xl sm:text-3xl bg-gradient-to-r from-blue-700 via-gray-500 to-orange-500 bg-clip-text text-transparent font-bold italic">
          DashBoard
        </h1>
        <ul className="flex gap-4 sm:gap-6" data-aos="fade-right">
          <li>
            <Link
              href="/user/register"
              className="text-sm sm:text-base text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              href="/user/login"
              className="text-sm sm:text-base text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Login
            </Link>
          </li>
          <li
            onClick={handleClick}
            className="text-sm sm:text-base cursor-pointer text-red-600"
          >
            Clear Storage
          </li>
        </ul>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center px-4 sm:py-8 sm:px-6 lg:px-12 space-y-8 h-auto">
        {/* Animation Section */}
        <div className="flex justify-between w-full max-w-4xl  sm:flex-col" data-aos="fade-down-left">
          <div className="flex self-end">
            <div className="bg-gradient-to-br from-gray-400 via-gray-50 to-yellow-700 h-12 sm:h-16 w-12 sm:w-16 rounded-full"></div>
            <div className="bg-gradient-to-br from-red-400 via-rose-200 to-pink-700 h-12 sm:h-16 w-12 sm:w-16 rounded-full"></div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 via-purple-300 to-blue-700 h-12 sm:h-16 w-12 sm:w-16 rounded-full self-end"></div>
        </div>

        {/* Welcome Section */}
        <div
          className="text-center bg-gradient-to-br from-blue-500 via-gray-300 to-orange-200 w-full max-w-2xl p-6  sm:rounded-xl shadow-2xl"
          // data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <h1 className="text-xl sm:text-3xl font-bold text-black mb-4">
            Welcome To DashBoard App with MSW Mocked API
          </h1>
          <p className="text-sm sm:text-lg text-blue-800">
            Open the browser console to see MSW logs when mocking is enabled.
          </p>
        </div>

        {/* Additional Animations */}
        <div className="flex justify-between w-full max-w-4xl sm:flex-col" data-aos="fade-up-right">
          <div className="bg-gradient-to-br from-purple-600 via-purple-300 to-blue-700 h-12 sm:h-16 w-12 sm:w-16 rounded-full"></div>
          <div className="flex">
            <div className="bg-gradient-to-br from-green-400 via-green-100 to-blue-500 h-12 sm:h-16 w-12 sm:w-16 rounded-full"></div>
            <div className="bg-gradient-to-br from-red-400 via-rose-100 to-pink-400 h-12 sm:h-16 w-12 sm:w-16 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
