
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserProfile, User } from '@/app/utilities/definitions';
import { useAccessLogContext } from '@/app/context/accesslogContext';

interface UserListProps {
  users: User[];
  currentUser: UserProfile | null;
  onDelete: (id: string | null | undefined) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  const { accessLogs } = useAccessLogContext();

  // State for search input and filtered users
  const [filterText, setFilterText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [noMatchFound, setNoMatchFound] = useState(false);

  useEffect(() => {
    const filterUsers = () => {
      if (!users || !accessLogs) return;

      // Escape special characters for regex safety
      const escapeRegExp = (str: string) => {
        return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
      };

      // Create a regex pattern from filterText
      const regex = new RegExp(escapeRegExp(filterText), 'i'); // 'i' for case-insensitive matching

      // Filter users based on regex match for username, email, or log info
      const filtered = users.filter(user => {
        const userLog = accessLogs.find(log => log.userId === user.id);
        const username = user.user.username ?? '';
        const email = user.user.email ?? '';
        const logInfo = userLog ? userLog.access_locate : '';

        return (
          regex.test(username) ||
          regex.test(email) ||
          regex.test(logInfo)
        );
      });

      setFilteredUsers(filtered);
      setNoMatchFound(filtered.length === 0); // Set to true if no matches found
    };

    filterUsers();
  }, [filterText, users, accessLogs]);

  if (users.length === 0) {
    return <div>Loading users...</div>;
  }

  return (
    
      <div className="w-[70%] mx-auto  p-4 mt-4 min-h-screen">


    <div className="w-full flex justify-end space-x-4 mb-4">
  <Link
    href="/admin"
    className="flex items-center justify-center w-28 h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
  >
    Back
  </Link>
  <Link
    href="/admin/addedUser"
    className="flex items-center justify-center w-40 h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
  >
    Add New User
  </Link>
</div>


      <h2 className="text-3xl font-semibold mb-6 text-center">Users</h2>

      {/* Filter Input */}
      <div className="mb-4 text-center">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter by username, email, or log info"
          className="px-4 py-2 border-2 border-gray-300 rounded-md w-full max-w-xs mx-auto"
        />
      </div>

      {/* Display "No match found" if no matching users */}
      {noMatchFound && (
        <div className="text-center text-red-500">
          No users found based on your filter criteria.
        </div>
      )}

      <div className="text-center mb-4">
       

      </div>

      <ul className="space-y-4 w-full">
        {filteredUsers.map(user => {
          const userLog = accessLogs.find(log => log.userId === user.id);

          return (
            <li key={user.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-100 w-full">
              <div className="flex justify-between align-middle w-[60%] mr-8">
                <h3 className="text-xl font-semibold">{user.user.username}</h3>
                <p className="text-sm text-gray-500">email: {user.user.email}</p>
              </div>
              <div className="flex space-x-4">
                {/* View link with validation */}
                <Link
                  href={user.id ? `/admin/userView/${encodeURIComponent(user.id)}` : '#'}
                  className={`text-blue-500 hover:text-blue-700 ${!user.id && 'pointer-events-none text-gray-400'}`}
                >
                  View
                </Link>

                <button
                  onClick={() => onDelete(user.id?.toString())}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Remove
                </button>

                {/* Access log link with userLog.id, if available */}
                {userLog ? (
                  <Link href={`/admin/viewLog/${userLog.id}`} className="text-red-500 hover:text-red-700">
                    View Log
                  </Link>
                ) : (
                  <span className="text-gray-400">No log available</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;

