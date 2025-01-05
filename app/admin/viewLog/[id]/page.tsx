'use client';

import React, { useEffect } from 'react';
import AccessLogView from "@/app/components/AccessLog/AccessLogView";
import { useAccessLogContext } from "@/app/context/accesslogContext";
import { useUserContext } from '@/app/context/userContext';

export default function AccessLogViewPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { fetchUserById, userById } = useUserContext();
  const { getLogById, loading, error, accessLog } = useAccessLogContext();

  const params = React.use(paramsPromise);
  const { id } = params;

  console.log('id from params in useView page:', id);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchLog() {
      await getLogById(id); // Fetch the access log by id
    }
    fetchLog();
  }, [id, getLogById]);

  useEffect(() => {
    async function fetchuserData() {

      if (accessLog?.userId) {
        const userIdFromLog = accessLog.userId.toString();
        await fetchUserById(userIdFromLog); // Fetch user details by userId from access log
      }
    }
    fetchuserData();
  }, [accessLog?.userId, fetchUserById]);

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

  return (
    <AccessLogView
      logById={accessLog}
      userById={userById}
    />
  );
}




