
'use client';

import { useUserContext } from '@/app/context/userContext';
import { useAccessLogContext } from '../context/accesslogContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdminDashboardPage = () => {

  const [userCount, setUserCount] = useState(0);
  const [logCount, setLogCount] = useState(0);
  const { logout, currentUser, loading, users } = useUserContext();
  const {accessLogs, accessLog} = useAccessLogContext();
  const router = useRouter();


useEffect(()=> {
  setLogCount(accessLogs.length);
  setUserCount(users.length);

}, [accessLogs, users])

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <p>Redirecting...</p>;
  }


  return (
    <div>
 <nav className='flex justify-between items-center h-16 border-2 shadow-2xl'>
        <h1 className='text-2xl font-serif text-blue-700'>Welcome, {currentUser.username}!</h1>
        <ul className='flex justify-between items-center w-[40%]'>
          <li> <Link href="/userEdit" className="text-lg font-bold text-blue-500 hover:text-yellow-700">
          Edit Profile
        </Link></li>
          <li><button
        onClick={handleLogout}
        className=" bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-200 transition-colors duration-300"
      >
        Logout
      </button></li>
        </ul>
     
      </nav>
   
    <div className="flex flex-col">
     
      <div className="absolute top-24 right-6 h-32 w-32 rounded-full border-2 border-blue-600 shadow-inner"></div>

      <h2 className="text-3xl font-bold mb-6 mt-5 text-center">Admin Dashboard</h2>


<div className='flex'>
      <div className="flex flex-col space-y-4 border-2 shadow-gray-950 w-[20%]  h-64 mt-8 rounded-lg ml-4  text-gray-600">
        <Link href="/admin/usersList" className='w-full border-2 shadow-lg rounded-md hover:bg-blue-100 text-center pt-2 h-12'>
         
            View All Users
         
        </Link>
        <Link href="/accessLogListView" className='w-full border-2 shadow-lg rounded-md hover:bg-blue-100 text-center h-12 pt-2'>
         
            View All Logs
         
        </Link>
      </div>

<div className='w-[70%] border-2 border-blue-700 ml-14 mt-24'>
  <ul className='flex h-full mt-6'>
    <li className='h-16 border-2 shadow-2xl ml-2 w-1/3 rounded-sm pl-2 pt-2'> Total number of users: <span className='font-bold font-serif text-lg ml-2'>{userCount}</span></li>
    <li className='h-16 border-2 shadow-2xl ml-2 w-1/3 pl-2 pt-2'>Total Access logs: <span className='font-bold font-serif text-lg ml-2'>{logCount}</span></li>
    <li className='h-16 border-2 shadow-2xl ml-2 w-1/3 pl-2 pt-2'>Total LogOuts: </li>
  </ul>

</div> image

      </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
