
'use client';

import { useUserContext } from '@/app/context/userContext';
import { useAccessLogContext } from '../context/accesslogContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdminDashboardPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [logCount, setLogCount] = useState(0);
  const { logout, currentUser, loading, users, logoutCount } = useUserContext();
  const { accessLogs } = useAccessLogContext();
  const router = useRouter();

  useEffect(() => {
    setLogCount(accessLogs.length);
    setUserCount(users.length);
  }, [accessLogs, users]);

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex flex-wrap justify-between items-center px-4 py-4 shadow-md bg-white">
        <h1 className="text-xl sm:text-2xl font-serif text-blue-800">
          Welcome, {currentUser.username}!
        </h1>
        <ul className="flex flex-wrap gap-4">
          <li>
            <Link
              href="/userEdit"
              className="text-sm sm:text-lg font-bold text-blue-500 hover:text-yellow-700"
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-200 transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="flex flex-col space-y-4 border-2 shadow-md w-full lg:w-1/4 h-auto mt-6 lg:mt-8 rounded-lg mx-4 text-gray-600">
          <Link
            href="/admin/usersList"
            className="w-full border shadow-lg bg-blue-500 text-white rounded-md text-center py-3 hover:bg-blue-100 hover:text-blue-500"
          >
            View All Users
          </Link>
          <Link
            href="/accessLogListView"
            className="w-full border shadow-lg bg-blue-500 text-white rounded-md text-center py-3 hover:bg-blue-100 hover:text-blue-500"
          >
            View All Logs
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 mx-4 lg:mx-8 mt-6">
          {/* Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-2 border-blue-600 shadow-inner flex items-center justify-center text-sm text-gray-600 bg-gray-100">
              <p>Image</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold my-6 text-center lg:text-left">
            Admin Dashboard
          </h2>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin/usersList">
              <div className="border-2 shadow-lg p-4 rounded-md">
                <p className="text-gray-700">Total Users:</p>
                <span className="font-bold text-xl text-blue-600">
                  {userCount}
                </span>
              </div>
            </Link>

            <Link href="/accessLogListView">
              <div className="border-2 shadow-lg p-4 rounded-md">
                <p className="text-gray-700">Total Access Logs:</p>
                <span className="font-bold text-xl text-blue-600">
                  {logCount}
                </span>
              </div>
            </Link>

            <div className="border-2 shadow-lg p-4 rounded-md">
              <p className="text-gray-700">Total Logouts:</p>
              <span className="font-bold text-xl text-blue-600">
                {logoutCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
