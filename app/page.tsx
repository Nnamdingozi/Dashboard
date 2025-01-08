
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import 'aos/dist/aos.css';
// import { AppProps } from 'next/app';


// export default function Home(({ Component, pageProps }: AppProps)) {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);

//     if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//       import('@/app/mocks/browser')
//         .then(({ worker }) => {
//           return worker.start({
//             serviceWorker: {
//               url: '/mockServiceWorker.js',
//             },
//             onUnhandledRequest: 'bypass',
//           });
//         })
//         .then(() => {
//           console.log('Mock Service Worker is active.');
//         })
//         .catch((error) => {
//           console.error('Failed to initialize MSW:', error);
//         });
//     }
//   }, []);

//   const handleClick = () => {
//     localStorage.clear();
//     alert('local storage successfully cleared')
//   }

//   if (!isClient) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-gray-700 text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className='h-screen bg-gray-50'>
//       <nav className='h-12 w-full flex justify-between border-2 shadow-lg align-middle'>
//         <h1 className="pl-6 bg-gradient-to-r from-black via-gray-500 to-orange-500 bg-clip-text text-transparent font-bold italic text-4xl">
//           DashBoard </h1>
//         <ul className='flex w-[40%] justify-around mt-2' data-aos="fade-right">
//           <li > <Link
//             href="/user/register"
//             className="text-blue-600 underline hover:text-blue-800 transition-colors"
//           >
//            Sign Up
//           </Link></li>
//           <li><Link
//             href="/user/login"
//             className="text-blue-600 underline hover:text-blue-800 transition-colors"
//           >Login
//           </Link></li>
//           <li
//             onClick={handleClick}>  
//           clear storage
//           </li>
//         </ul>

//       </nav>

//       <div className="flex flex-col min-h-screen border-2">

//         <div className='flex flex-col self-end mt-6 mr-24' data-aos="fade-up-right">
//           <div className='flex'>
//             <div className='bg-gradient-to-br from-gray-400 via-gray-50 to-yellow-700  h-16 w-16 rounded-full'></div>
//             <div className='bg-gradient-to-br from-yellow-300 via-yellow-50 to-pink-300  h-16 w-16 rounded-full'></div>
//           </div>
//           <div className='bg-gradient-to-br from-purple-600 via-purple-300 to-blue-700  h-16 w-16 self-end rounded-full'></div>

//         </div>

//         <div className='self-center text-center  bg-orange-200  blur-3xl w-[50%] rounded-xl h-60 shadow-2xl'>
//         <h1 className="text-4xl font-bold text-black mb-4 pt-6">Welcome To DashBoard App with MSW Mocked API</h1>
//         <p className="text-lg text-blue-800 mb-6">
//           Open the browser console to see MSW logs when mocking is enabled.
//         </p>
//         <div className="flex space-x-4 text-center">


//         </div>
//         </div>


//         <div className='flex flex-col ml-24' data-aos="fade-up-right">

//         <div className='bg-gradient-to-br from-purple-600 via-purple-300 to-blue-700 h-16 w-16 rounded-full'></div>
//           <div className='flex'>
//             <div className='bg-gradient-to-br from-green-400 via-green-100 to-blue-500  h-16 w-16 rounded-full'></div>
//             <div className='bg-gradient-to-br from-red-400 via-rose-100 to-pink-400  h-16 w-16 rounded-full'></div>
//           </div>


//         </div>

//       </div>



//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

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
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      <nav className="h-12 w-full flex justify-between border-2 shadow-lg items-center">
        <h1 className="pl-6 bg-gradient-to-r from-blue-700 via-gray-500 to-orange-500 bg-clip-text text-transparent font-bold italic text-4xl">
          DashBoard
        </h1>
        <ul className="flex w-[40%] justify-around" data-aos="fade-right">
          <li>
            <Link
              href="/user/register"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              href="/user/login"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Login
            </Link>
          </li>
          <li onClick={handleClick} className="cursor-pointer text-red-600">
            Clear Storage
          </li>
        </ul>
      </nav>

      <div className="flex flex-col min-h-screen border-2">
        {/* Animations and Gradients */}
        <div className="flex flex-col self-end mt-6 mr-24" data-aos="fade-up-right">
          <div className="flex">
            <div className="bg-gradient-to-br from-gray-400 via-gray-50 to-yellow-700 h-16 w-16 rounded-full"></div>
            <div className="bg-gradient-to-br from-red-400 via-rose-200 to-pink-700 h-16 w-16 rounded-full"></div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 via-purple-300 to-blue-700 h-16 w-16 self-end rounded-full"></div>
        </div>

        {/* Center Section */}
        <div
          className="self-center text-center bg-gradient-to-br from-blue-500 via-gray-300 to-orange-200  w-[50%] rounded-xl h-60 shadow-2xl"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000">

          <h1 className="text-4xl font-bold text-black mb-4 pt-6">
            Welcome To DashBoard App with MSW Mocked API
          </h1>
          <p className="text-lg text-blue-800 mb-6">
            Open the browser console to see MSW logs when mocking is enabled.
          </p>
        </div>

        {/* Additional Animations */}
        <div className="flex flex-col ml-24" data-aos="fade-up-right">
          <div className="bg-gradient-to-br from-purple-600 via-purple-300 to-blue-700 h-16 w-16 rounded-full"></div>
          <div className="flex">
            <div className="bg-gradient-to-br from-green-400 via-green-100 to-blue-500 h-16 w-16 rounded-full"></div>
            <div className="bg-gradient-to-br from-red-400 via-rose-100 to-pink-400 h-16 w-16 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
