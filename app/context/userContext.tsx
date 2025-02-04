'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '@/app/api/userApi';
import {
  User,
  NewUserRequestBody,
  UserProfile,
  UpdatedUserRequestBody,
  updateUserResponseBody,
  AccessLog,
  RegisterUserResponse,
} from '@/app/utilities/definitions';

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
  logoutCount: number;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userById, setUserById] = useState<User | null>(null);
  const [logoutCount, setLogoutCount] = useState(0);

  const router = useRouter();

  // Sync users to localStorage whenever it changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

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
    } catch (err) {
      setErrorFromException(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!users || users.length === 0) {
      fetchUsers();
    }
  }, [users, fetchUsers]);

  const saveToken = (newToken: string, user: UserProfile) => {
    setToken(newToken);
    setCurrentUser(user);
    localStorage.setItem('token', newToken);
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.cookie = `token=${newToken}; path=/; samesite=strict; max-age=3600`;
  };

  const fetchUserById = useCallback(async (id: string): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      const fetchedUser = await getUserById(id, token!);
      setUserById(fetchedUser);
      localStorage.setItem(`user_${id}`, JSON.stringify(fetchedUser));
      return fetchedUser;
    } catch (err) {
      setErrorFromException(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const registerUser = async (newUser: NewUserRequestBody): Promise<RegisterUserResponse> => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await createUser(newUser);
      const { user, updatedUsers, token, accessLog } = responseData;

      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      const flattenedUser: UserProfile = {
        id: user.id,
        username: user.user.username,
        email: user.user.email,
        role: user.user.role ?? null,
      };

      saveToken(token, flattenedUser);

      const userRole = user.user.role;
      if (userRole) {
        return { userRole, accessLog };
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
      }
      return updatedUserData;
    } catch (err) {
      setErrorFromException(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteUser(id, token!);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== Number(id)));
    } catch (err) {
      setErrorFromException(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLogoutCount((prevCount) => prevCount + 1);
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
        logoutCount,
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
