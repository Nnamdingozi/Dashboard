
'use client';

import React, { useEffect, useState } from 'react';
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
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    paramsPromise.then(({ id }) => setId(id));
  }, [paramsPromise]);

  // Fetch the access log when `id` changes
  useEffect(() => {
    if (id) {
      getLogById(id); // Fetch the access log by id
    }
  }, [id, getLogById]);

  // Fetch the user data when `accessLog.userId` changes
  useEffect(() => {
    if (accessLog?.userId) {
      const userIdFromLog = accessLog.userId.toString();
      fetchUserById(userIdFromLog); // Fetch user details by userId from access log
    }
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

  return <AccessLogView logById={accessLog} userById={userById} />;
}
