// 'use client';

// import React, { useEffect } from 'react';
// import AccessLogView from "@/app/components/AccessLog/AccessLogView";
// import { useAccessLogContext } from "@/app/context/accesslogContext";
// import { useUserContext } from '@/app/context/userContext';

// export default function AccessLogViewPage({
//   params: paramsPromise,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { fetchUserById, userById } = useUserContext();
//   const { getLogById, loading, error, accessLog } = useAccessLogContext();

//   const params = React.use(paramsPromise);
//   const { id } = params;

//   console.log('id from params in useView page:', id);

//   useEffect(() => {
//     if (!id) {
//       return;
//     }

//     async function fetchLog() {
//       await getLogById(id); // Fetch the access log by id
//     }
//     fetchLog();
//   }, [id, getLogById]);

//   useEffect(() => {
//     async function fetchuserData() {

//       if (accessLog?.userId) {
//         const userIdFromLog = accessLog.userId.toString();
//         await fetchUserById(userIdFromLog); // Fetch user details by userId from access log
//       }
//     }
//     fetchuserData();
//   }, [accessLog?.userId, fetchUserById]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error}</p>
//         <button onClick={() => location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!accessLog) {
//     return <div>No Access Log found.</div>;
//   }

//   return (
//     <AccessLogView
//       logById={accessLog}
//       userById={userById}
//     />
//   );
// }




'use client';

import React, { useEffect, useCallback } from 'react';
import AccessLogView from '@/app/components/AccessLog/AccessLogView';
import { useAccessLogContext } from '@/app/context/accesslogContext';
import { useUserContext } from '@/app/context/userContext';

export default function AccessLogViewPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { fetchUserById, userById } = useUserContext();
  const { getLogById, loading, error, accessLog } = useAccessLogContext();

  // Extract `id` from the promise only once
  const [id, setId] = React.useState<string | null>(null);

  useEffect(() => {
    paramsPromise.then(({ id }) => setId(id));
  }, [paramsPromise]);

  // Memoized function to fetch the access log
  const fetchLog = useCallback(async () => {
    if (id) {
      await getLogById(id); // Fetch the access log by id
    }
  }, [id, getLogById]);

  // Memoized function to fetch the user data
  const fetchuserData = useCallback(async () => {
    if (accessLog?.userId) {
      const userIdFromLog = accessLog.userId.toString();
      await fetchUserById(userIdFromLog); // Fetch user details by userId from access log
    }
  }, [accessLog?.userId, fetchUserById]);

  // Call fetchLog when `id` changes
  useEffect(() => {
    fetchLog();
  }, [fetchLog]);

  // Call fetchuserData when `accessLog.userId` changes
  useEffect(() => {
    fetchuserData();
  }, [fetchuserData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => location.reload()}>Retry</button>
      </div>
    );
  }

  if (!accessLog) {
    return <div>No Access Log found.</div>;
  }

  return <AccessLogView logById={accessLog} userById={userById} />;
}
