'use client';

import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/app/context/userContext';
import UserView from '@/app/components/User/UserView';

interface Params {
  id: string;
}

interface ViewUserPageProps {
  params: Promise<Params>;
}

export default function ViewUserPage({ params: paramsPromise }: ViewUserPageProps) {
  const { fetchUserById, userById, loading, error } = useUserContext();
  const [id, setId] = useState<string | null>(null);

  // Unwrap params only once
  useEffect(() => {
    paramsPromise.then(({ id }) => setId(id));
  }, [paramsPromise]);

  // Fetch user data whenever `id` changes
  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id, fetchUserById]);

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

  if (!userById) {
    return <div>User not found.</div>;
  }

  return <UserView user={userById} />;
}
