
// 'use client';

// import { AccessLogList } from '@/app/components/AccessLog/AccessLogList';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { useUserContext } from '@/app/context/userContext';

// const ViewAccessLogsPage = () => {
//   const { users, token } = useUserContext(); // Access users and token from context
//   const { accessLogs, deleteLog } = useAccessLogContext();

//   console.log('Users in AccessLogPage:', users);
//   console.log('Token in AccessLogPage:', token);


//   // Handle deletion of logs
//   const handleDelete = async (id: string | null | undefined) => {
//     if (!id) return;
//     try {
//       await deleteLog(id); // Delete log via context
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Show loading state if users or logs are not yet loaded
//   if (!users || users.length === 0) {
//     return <p>Loading users...</p>;
//   }

//   if (!accessLogs || accessLogs.length === 0) {
//     return <p>Loading access logs...</p>;
//   }

//   // Render the AccessLogList once data is loaded
//   return (
//     <AccessLogList
//       accessLogs={accessLogs}
//       users={users} // Pass users list as prop
//       onDelete={handleDelete}
//     />
//   );
// };

// export default ViewAccessLogsPage;



'use client';

import { AccessLogList } from '@/app/components/AccessLog/AccessLogList';
import { useAccessLogContext } from '@/app/context/accesslogContext';
import { useUserContext } from '@/app/context/userContext';
import LoadingSpinner from '../components/loadingSpinner';

const ViewAccessLogsPage = () => {
  const { users, token } = useUserContext(); // Access users and token from context
  const { accessLogs, deleteLog } = useAccessLogContext();

  console.log('Users in AccessLogPage:', users);
  console.log('Token in AccessLogPage:', token);

  // Handle deletion of logs
  const handleDelete = async (id: string | null | undefined) => {
    if (!id) return;
    try {
      await deleteLog(id); // Delete log via context
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Show loading state if users or logs are not yet loaded
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <LoadingSpinner />
        <p className="mt-4 text-lg md:text-xl text-gray-600 animate-pulse text-center">
          Loading users...
        </p>
      </div>
    );
  }

  if (!accessLogs || accessLogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <LoadingSpinner />
        <p className="mt-4 text-lg md:text-xl text-gray-600 animate-pulse text-center">
          Loading access logs...
        </p>
      </div>
    );
  }

  // Render the AccessLogList once data is loaded
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">
        Access Logs
      </h1>

      <div className="max-w-7xl mx-auto w-full">
        <AccessLogList
          accessLogs={accessLogs}
          users={users} // Pass users list as prop
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ViewAccessLogsPage;
