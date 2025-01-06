
'use client';

import React, { useEffect } from 'react';
import { AccessLogList } from '@/app/components/AccessLog/AccessLogList';
import { useAccessLogContext } from '@/app/context/accesslogContext';
import { useUserContext } from '@/app/context/userContext';

const ViewAccessLogsPage = () => {
  const { users, token } = useUserContext(); // Access users and token from context
  const { accessLogs, deleteLog, loading } = useAccessLogContext();

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
    return <p>Loading users...</p>;
  }

  if (!accessLogs || accessLogs.length === 0) {
    return <p>Loading access logs...</p>;
  }

  // Render the AccessLogList once data is loaded
  return (
    <AccessLogList
      accessLogs={accessLogs}
      users={users} // Pass users list as prop
      onDelete={handleDelete}
    />
  );
};

export default ViewAccessLogsPage;



// 'use client';

// import React, { useEffect } from 'react';
// import { AccessLogList } from '@/app/components/AccessLog/AccessLogList';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { useUserContext } from '@/app/context/userContext';

// const ViewAccessLogsPage = () => {
//   const { users, fetchUsers, token } = useUserContext(); // Access users and token from context
//   const { accessLogs, getLogs, deleteLog, loading } = useAccessLogContext();

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
