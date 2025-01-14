
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading users...</p>
        <LoadingSpinner />
      </div>
    );
  }

  if (!accessLogs || accessLogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading access logs...</p>
        <LoadingSpinner />

      </div>
    );
  }

  // Render the AccessLogList once data is loaded
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
        Access Logs
      </h1>

      <div className="max-w-7xl mx-auto">
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
