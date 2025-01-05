

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/app/api/userApi';
import { User, NewUserRequestBody, UserProfile, UpdatedUserRequestBody, updateUserResponseBody, AccessLog, RegisterUserResponse } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';

interface UserContextProps {
  users: User[];
  currentUser: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<User | null>;
  userById: User | null;
  setUserById: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: (user: NewUserRequestBody) => Promise<RegisterUserResponse>;
  logout: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  saveToken: (token: string, user: UserProfile) => void;
  editUserById: (id: string, user: UpdatedUserRequestBody) => Promise<updateUserResponseBody | null>;
  removeUser: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userById, setUserById] = useState<User | null>(null);



  const router = useRouter();



  const setErrorFromException = (err: unknown) => {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
    setError(errorMessage);
    console.error(errorMessage, err);
  };


  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedUsers = await getUsers(token!);
      setUsers(fetchedUsers);
      localStorage.setItem('users', JSON.stringify(fetchedUsers));
    } catch (err) {
      setErrorFromException(err);
    } finally {
      setLoading(false);
    }
  }, [token]); // `fetchUsers` will now only change when `token` changes

  // useEffect(() => {
  //   // Load users on first mount
  //   const initializeUsers = async () => {
  //     const savedToken = localStorage.getItem('token');
  //     const savedUsers = localStorage.getItem('users');
  //     setToken(savedToken || null);

  //     if (savedUsers) {
  //       setUsers(JSON.parse(savedUsers));
  //     } else {
  //       await fetchUsers();
  //     }
  //   };

  //   initializeUsers();
  

  useEffect(() => {
    const initializeUsers = async () => {
      if (!users || users.length === 0) {
        try {
          await fetchUsers();
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };
  
    initializeUsers();
  }, [users, fetchUsers]);
  

  const saveToken = (newToken: string, user: UserProfile) => {
    setToken(newToken);
    setCurrentUser(user);

    localStorage.setItem('token', newToken);
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.cookie = `token=${newToken}; path=/; samesite=strict; max-age=3600`;
  };




  const fetchUserById = useCallback(
    async (id: string): Promise<User | null> => {
      setLoading(true);
      setError(null);

      try {
        const fetchedUser = await getUserById(id, token!);
        setUserById(fetchedUser);
        localStorage.setItem(`user_${id}`, JSON.stringify(fetchedUser));
        return fetchedUser;
      } catch (err) {
        setError((err as Error).message || 'An error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token] // Dependency ensures `useCallback` is updated only if `token` changes
  );


  const registerUser = async (newUser: NewUserRequestBody): Promise<{ userRole: string | null, accessLog: AccessLog | null }> => {
    setLoading(true);
    setError(null)

    try {
      // const { user, token, accessLog} = await createUser(newUser);
      await fetchUsers();
      const responseData = await createUser(newUser);

      // Validate response data
      if (!responseData.token || !responseData.user || !responseData.updatedUsers || !responseData.accessLog) {
        throw new Error('Missing required fields in login response.');
      }

      const { user, updatedUsers, token, accessLog } = responseData;

      setUsers(updatedUsers);
      console.log('users in register context;', users)

      localStorage.setItem('user', JSON.stringify(user));

      localStorage.setItem('users', JSON.stringify(updatedUsers));


      const flattenedUser: UserProfile = {
        id: user.id,
        username: user.user.username,
        email: user.user.email,
        role: user.user.role ?? null
      }

      saveToken(token, flattenedUser);

      const userRole = user.user.role;
      if (userRole) {
        return { userRole, accessLog }
      }

    } catch (err) {
      setErrorFromException(err);
      return { userRole: null, accessLog: null };
    } finally {
      setLoading(false);
    }
    return { userRole: null, accessLog: null };
  };



  const editUserById = async (id: string, updatedUser: UpdatedUserRequestBody): Promise<updateUserResponseBody | null> => {
    setLoading(true);
    setError(null);

    try {
      const updatedUserData = await updateUser(id, token!, updatedUser);
      setToken(updatedUserData.token);

      const { userProfile, users } = updatedUserData;
      if (userProfile && users) {
        setCurrentUser({
          id: userProfile.id ?? null,
          username: userProfile.user.username ?? null,
          email: userProfile.user.email ?? null,
          role: userProfile.user.role ?? null,
        });

        setUsers(users);
        localStorage.setItem('users', JSON.stringify(users));
      }

      return updatedUserData;

    } catch (err) {
      setErrorFromException(err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const removeUser = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteUser(id, token!);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== Number(id)));
      localStorage.setItem(
        'users',
        JSON.stringify(users.filter((user) => user.id !== Number(id)))
      );
    } catch (err) {
      setErrorFromException(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    router.push('/');
    setCurrentUser(null);
    setToken(null);
    setUsers([]);
    localStorage.clear();
    
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        token,
        loading,
        error,
        fetchUsers,
        fetchUserById,
        registerUser,
        logout,
        setUsers,
        setCurrentUser,
        saveToken,
        editUserById,
        removeUser,
        userById,
        setUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

