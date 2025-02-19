
// 'use client'

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { AccessLog, User } from '@/app/utilities/definitions';

// interface AccessLogListProps {
//   accessLogs: AccessLog[];
//   users: User[] | null;
//   onDelete: (id: string | null | undefined) => void;
// }

// export const AccessLogList: React.FC<AccessLogListProps> = ({ accessLogs, users, onDelete }) => {
//   const [filterText, setFilterText] = useState('');
//   const [filteredAccessLogs, setFilteredAccessLogs] = useState<AccessLog[]>(accessLogs);
//   const [noMatchFound, setNoMatchFound] = useState(false);

//   useEffect(() => {
//     const filterLogs = () => {
//       if (!accessLogs || !users) return;

//       // Escape special characters in the filter text for regular expression safety
//       const escapeRegExp = (str: string) => {
//         return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
//       };

//       // Create a regex pattern from filterText
//       const regex = new RegExp(escapeRegExp(filterText), 'i'); // 'i' for case-insensitive matching

//       // Filter logs based on regex match (case insensitive)
//       const filteredLogs = accessLogs.filter((log) => {
//         const user = users.find((u) => u.id === log.userId);
//         const username = user?.user.username ?? '';
//         const accessLocate = log.access_locate ?? '';
//         const accessTime = new Date(log.accesstime).toLocaleString() ?? '';

//         // Check if any part of the log matches the filter text
//         return (
//           regex.test(username) ||
//           regex.test(accessLocate) ||
//           regex.test(accessTime)
//         );
//       });

//       setFilteredAccessLogs(filteredLogs);
//       setNoMatchFound(filteredLogs.length === 0); // Set to true if no matches found
//     };

//     filterLogs();
//   }, [filterText, accessLogs, users]);

//   return (
//     <div className="max-w-4xl mx-auto p-6 w-full">
//       <div className='flex justify-between mb-5'>
//         <h2 className="text-3xl font-semibold mb-6 text-center">Access Logs</h2>
//         <div className="text-center mb-4 flex space-x-4">
//           <Link href="/" className="px-4 h-8 pt-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//             Add New Log
//           </Link>
//           <Link href="/admin" className="px-4 pt-1 h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//             back
//           </Link>
//         </div>
//       </div>

//       {/* Filter Input */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//           placeholder="Filter by username, location, or access time"
//           className="px-4 py-2 border-2 rounded-md w-full border-gray-500 mb-6"
//         />
//       </div>

//       {/* Display "No match found" if there are no matching logs */}
//       {noMatchFound && (
//         <div className="text-center text-red-500">
//           No Access Logs found based on your filter criteria.
//         </div>
//       )}

//       <ul className="space-y-4 w-full">
//         {filteredAccessLogs.map((accessLog) => {
//           const user = users?.find((u) => u.id === accessLog.userId);
//           const username = user?.user.username ?? 'Unknown User'; // Gracefully handle missing user

//           return (
//             <li
//               key={accessLog.id}
//               className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-100 w-full"
//             >
//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-100 w-full">
//   <div className="grid grid-cols-3 gap-4 w-[70%]">
//     <h3 className="text-xl font-semibold">{username}</h3>
//     <p className="text-sm text-gray-500">Access Time: {new Date(accessLog.accesstime).toLocaleString()}</p>
//     <p className="text-sm text-gray-500">Access Location: {accessLog.access_locate}</p>
//   </div>
//   <div className="flex space-x-4">
//     {accessLog.id ? (
//       <Link
//         href={`/admin/viewLog/${encodeURIComponent(accessLog.id)}`}
//         className="text-blue-500 hover:text-blue-700"
//       >
//         View
//       </Link>
//     ) : (
//       <span className="text-gray-400">View</span>
//     )}
//     <button
//       onClick={() => onDelete(accessLog.id?.toString())}
//       className="text-red-500 hover:text-red-700 focus:outline-none"
//     >
//       Remove
//     </button>
//     <Link
//       href={`/admin/userView/${accessLog.userId}`}
//       className="text-red-500 hover:text-red-700"
//     >
//       View User
//     </Link>
//   </div>
// </div>

//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };



'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AccessLog, User } from '@/app/utilities/definitions';

interface AccessLogListProps {
  accessLogs: AccessLog[];
  users: User[] | null;
  onDelete: (id: string | null | undefined) => void;
}

export const AccessLogList: React.FC<AccessLogListProps> = ({ accessLogs, users, onDelete }) => {
  const [filterText, setFilterText] = useState('');
  const [filteredAccessLogs, setFilteredAccessLogs] = useState<AccessLog[]>(accessLogs);
  const [noMatchFound, setNoMatchFound] = useState(false);

  useEffect(() => {
    const filterLogs = () => {
      if (!accessLogs || !users) return;

      // Escape special characters in the filter text for regular expression safety
      const escapeRegExp = (str: string) => {
        return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
      };

      // Create a regex pattern from filterText
      const regex = new RegExp(escapeRegExp(filterText), 'i'); // 'i' for case-insensitive matching

      // Filter logs based on regex match (case insensitive)
      const filteredLogs = accessLogs.filter((log) => {
        const user = users.find((u) => u.id === log.userId);
        const username = user?.user.username ?? '';
        const accessLocate = log.access_locate ?? '';
        const accessTime = new Date(log.accesstime).toLocaleString() ?? '';

        // Check if any part of the log matches the filter text
        return (
          regex.test(username) ||
          regex.test(accessLocate) ||
          regex.test(accessTime)
        );
      });

      setFilteredAccessLogs(filteredLogs);
      setNoMatchFound(filteredLogs.length === 0); // Set to true if no matches found
    };

    filterLogs();
  }, [filterText, accessLogs, users]);

  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between mb-5 items-center">
        <h2 className="text-3xl font-semibold mb-4 sm:mb-0 text-center w-full sm:w-auto">
          Access Logs
        </h2>
        <div className="flex space-x-0 sm:space-x-4 flex-col sm:flex-row w-full sm:w-auto text-center">
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2 sm:mb-0"
          >
            Add New Log
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter by username, location, or access time"
          className="px-4 py-2 border-2 rounded-md w-full border-gray-500"
        />
      </div>

      {/* Display "No match found" if there are no matching logs */}
      {noMatchFound && (
        <div className="text-center text-red-500 mb-4">
          No Access Logs found based on your filter criteria.
        </div>
      )}

      <ul className="space-y-4 w-full">
        {filteredAccessLogs.map((accessLog) => {
          const user = users?.find((u) => u.id === accessLog.userId);
          const username = user?.user.username ?? 'Unknown User'; // Gracefully handle missing user

          return (
            <li
              key={accessLog.id}
              className="border rounded-lg shadow-sm hover:bg-gray-100 p-4 w-full"
            >
              <div className="flex flex-col md:flex-row items-center justify-between w-full">
                {/* Log Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <h3 className="text-xl font-semibold">{username}</h3>
                  <p className="text-sm text-gray-500">
                    Access Time: {new Date(accessLog.accesstime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Access Location: {accessLog.access_locate}
                  </p>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-4 md:mt-0">
                  {accessLog.id ? (
                    <Link
                      href={`/admin/viewLog/${encodeURIComponent(accessLog.id)}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </Link>
                  ) : (
                    <span className="text-gray-400">View</span>
                  )}
                  <button
                    onClick={() => onDelete(accessLog.id?.toString())}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                  <Link
                    href={`/admin/userView/${accessLog.userId}`}
                    className="text-red-500 hover:text-red-700"
                  >
                    View User
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
