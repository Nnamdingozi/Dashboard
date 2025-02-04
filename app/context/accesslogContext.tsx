// 'use client';

// import React, { createContext, useState, useContext, useEffect, useCallback} from 'react';
// import { AccessLog, UpdateAccessLog } from '@/app/utilities/definitions';
// import {
//   getAccessLogs,
//   getAccessLogById,
//   createAccessLog,
//   updateAccessLog,
//   deleteAccessLog,
// } from '@/app/api/accessLogApi';
// import { useUserContext } from './userContext';

// interface AccessLogContextType {
//   accessLogs: AccessLog[];
//   accessLog: AccessLog | null;
//   loading: boolean;
//   error: string | null;
//   getLogs: () => Promise<void>;
//   getLogById: (id: string) => Promise<AccessLog | null>;
//   createLog: (log: AccessLog) => Promise<AccessLog | null>;
//   updateLog: (id: string, log: UpdateAccessLog) => Promise<void>;
//   deleteLog: (id: string) => Promise<void>;
//   setAccessLogs: React.Dispatch<React.SetStateAction<AccessLog[] >>;
//   setAccessLog: React.Dispatch<React.SetStateAction<AccessLog | null>>

// }

// interface AccessLogProviderProps {
//   children: React.ReactNode;
// }

// const AccessLogContext = createContext<AccessLogContextType | undefined>(undefined);





// export const AccessLogProvider: React.FC<AccessLogProviderProps> = ({ children }) => {
//   const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
//   const [accessLog, setAccessLog] = useState<AccessLog | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const { token } = useUserContext();

//   const getLogs = useCallback(async (): Promise<void> => {

    // if (!token) {
    //   console.warn('Token is not available. Skipping getLogs call.');
    //   return; // Exit early if the token is not available
    // }
  
//     setLoading(true);
//     setError(null);
  
//     try {
//       const fetchedLogs = await getAccessLogs(token);
//       setAccessLogs(fetchedLogs || []);
//       localStorage.setItem('accessLogs', JSON.stringify(fetchedLogs));
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Unable to fetch AccessLogs';
//       setError(message);
//       console.error('Error fetching logs:', message, err);
//     } finally {
//       setLoading(false);
//     }
//   }, [token])



//   useEffect(() => {
//     const initializeLogs = async () => {
//       if (token && !loading && (!accessLogs || accessLogs.length === 0)) {
//         try {
//           await getLogs(); // Fetch logs only if they are not already loaded
//         } catch (error) {
//           console.error('Error fetching logs:', error);
//         }
//       }
//     };

//     initializeLogs();
//   }, [token, accessLogs, getLogs, loading]); // Depend on token, accessLogs, and loading

  

  // const getLogById = useCallback(async (id: string): Promise<AccessLog | null> => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const fetchedLog = await getAccessLogById(id, token!);
  //     if (!fetchedLog) throw new Error('Access Log for user not found');

  //     setAccessLog(fetchedLog);
  //     localStorage.setItem(`accessLog_${id}`, JSON.stringify(fetchedLog));
  //     return fetchedLog;
  //   } catch (err) {
  //     const message = err instanceof Error ? err.message : 'Failed to fetch log for user.';
  //     setError(message);
  //     console.error(message);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [token]);


//   useEffect(() => {
//     // Load access logs and a specific access log from localStorage on initial mount
//     const savedLogs = localStorage.getItem('accessLogs');
//     if (savedLogs) setAccessLogs(JSON.parse(savedLogs));
  
//     const savedLog = localStorage.getItem('accessLog');
//     if (savedLog) setAccessLog(JSON.parse(savedLog));
//   }, []);
  
//   useEffect(() => {
//     if (token) {
//       getLogs(); // Call getLogs only if the token is available
//     }
//   }, [token, getLogs]);
  
  
// const createLog = async (log: AccessLog): Promise<AccessLog | null> => {
//   try {
//     setLoading(true);
//     setError(null);

//     // Call createAccessLog and destructure the response
//     const { logResponse, updatedLogs }: { logResponse: AccessLog | null, updatedLogs: AccessLog[] } = await createAccessLog(token!, log);

//     // Update the state with the logResponse and updatedLogs
//     setAccessLog(logResponse);   // Set the single log object to accessLog
//     setAccessLogs(updatedLogs);  // Set the updated logs array to accessLogs
//       localStorage.setItem('accessLogs', JSON.stringify(updatedLogs));
//       localStorage.setItem('accessLog', JSON.stringify(logResponse));
//       return logResponse;  // Return the newly created log
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'An error occurred';
//       setError(message);
//       console.error(message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };


  // const updateLog = async (id: string, log: UpdateAccessLog): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const updatedLog = await updateAccessLog(id, token!, log);
  //     setAccessLog(updatedLog);
  //   } catch (err) {
  //     const message = err instanceof Error ? err.message : 'An error occurred';
  //     setError(message);
  //     console.error(message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteLog = async (id: string): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const response = await deleteAccessLog(id, token!);
  //     setAccessLogs((prevLogs) => prevLogs.filter((log) => log.id !== Number(id)));
  //     localStorage.setItem('accessLogs', JSON.stringify(response));
  //   } catch (err) {
  //     const message = err instanceof Error ? err.message : 'An error occurred';
  //     setError(message);
  //     console.error(message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  


//   return (
//     <AccessLogContext.Provider
      // value={{
        // accessLogs,
        // accessLog,
        // loading,
        // error,
        // getLogs,
        // getLogById,
        // createLog,
        // updateLog,
        // deleteLog,
        // setAccessLogs,
        // setAccessLog,
//       }}
//     >
//       {children}
//     </AccessLogContext.Provider>
//   );
// };


// export const useAccessLogContext = (): AccessLogContextType => {
//   const context = useContext(AccessLogContext);
//   if (!context) {
//     throw new Error('useAccessLogContext must be used within an AccessLogProvider');
//   }
//   return context;
// };


'use client';

import React, { createContext, useState, useContext, useEffect, useCallback} from 'react';
import { AccessLog, UpdateAccessLog } from '@/app/utilities/definitions';
import {
  getAccessLogs,
  getAccessLogById,
  createAccessLog,
  updateAccessLog,
  deleteAccessLog,
} from '@/app/api/accessLogApi';
import { useUserContext } from './userContext';

interface AccessLogContextType {
  accessLogs: AccessLog[];
  accessLog: AccessLog | null;
  loading: boolean;
  error: string | null;
  getLogs: () => Promise<void>;
  getLogById: (id: string) => Promise<AccessLog | null>;
  createLog: (log: AccessLog) => Promise<AccessLog | null>;
  updateLog: (id: string, log: UpdateAccessLog) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
  setAccessLogs: React.Dispatch<React.SetStateAction<AccessLog[] >>;
  setAccessLog: React.Dispatch<React.SetStateAction<AccessLog | null>>

}

interface AccessLogProviderProps {
  children: React.ReactNode;
}

const AccessLogContext = createContext<AccessLogContextType | undefined>(undefined);





export const AccessLogProvider: React.FC<AccessLogProviderProps> = ({ children }) => {
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [accessLog, setAccessLog] = useState<AccessLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useUserContext();
  // Sync accessLogs to localStorage whenever it changes
  useEffect(() => {
    if (accessLogs.length > 0) {
      localStorage.setItem('accessLogs', JSON.stringify(accessLogs));
    }
  }, [accessLogs]);

  // Load accessLogs from localStorage on component mount
  useEffect(() => {
    const storedAccessLogs = localStorage.getItem('accessLogs');
    if (storedAccessLogs) {
      setAccessLogs(JSON.parse(storedAccessLogs));
    }
  }, []);

  const setErrorFromException = (err: unknown) => {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
    setError(errorMessage);
    console.error(errorMessage, err);
  };

  const getLogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {

      const fetchedAccessLogs = await getAccessLogs(token!);
      setAccessLogs(fetchedAccessLogs);
    } catch (err) {
      setErrorFromException(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getLogById = useCallback(async (id: string): Promise<AccessLog | null> => {
    try {
      setLoading(true);
      setError(null);

      const fetchedLog = await getAccessLogById(id, token!);
      if (!fetchedLog) throw new Error('Access Log for user not found');

      setAccessLog(fetchedLog);
      localStorage.setItem(`accessLog_${id}`, JSON.stringify(fetchedLog));
      return fetchedLog;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch log for user.';
      setError(message);
      console.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);





  const createLog = async (log: AccessLog): Promise<AccessLog | null> => {
    try {
      setLoading(true);
      setError(null);
  
      // Call createAccessLog and destructure the response
      const { logResponse, updatedLogs }: { logResponse: AccessLog | null, updatedLogs: AccessLog[] } = await createAccessLog(token!, log);
  
      // Update the state with the logResponse and updatedLogs
      setAccessLog(logResponse);   // Set the single log object to accessLog
      setAccessLogs(updatedLogs);  // Set the updated logs array to accessLogs
    } catch (err) {
      setErrorFromException(err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const updateLog = async (id: string, log: UpdateAccessLog): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const updatedLog = await updateAccessLog(id, token!, log);
      setAccessLog(updatedLog);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  };



  const deleteLog = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await deleteAccessLog(id, token!);
      setAccessLogs((prevLogs) => prevLogs.filter((log) => log.id !== Number(id)));

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <AccessLogContext.Provider
      value={{
            accessLogs,
        accessLog,
        loading,
        error,
        getLogs,
        getLogById,
        createLog,
        updateLog,
        deleteLog,
        setAccessLogs,
        setAccessLog,
    
      }}
    >
      {children}
    </AccessLogContext.Provider>
  );
};

export const useAccessLogContext = () => {
  const context = useContext(AccessLogContext);
  if (!context) {
    throw new Error('useAccessLogContext must be used within an AccessLogProvider');
  }
  return context;
};




