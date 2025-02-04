

import { ApiError } from '@/app/validation/errorEnum';

import { 
  User, 
  NewUserRequestBody, 
  UpdatedUserRequestBody, 
  DeleteUserResponseBody, 
  AccessLog 
} from '@/app/utilities/definitions';

import { 
  axiosInstance, 
  validatePayload, 
  handleApiError, 
  configWithToken, 
  validateUpdate 
} from '@/app/validation/validation';

// Get users with automatic token and error handling
export const getUsers = async (token: string | null): Promise<User[] | []> => {
  try {
    console.log('token in get userApi', token);
    const response = await axiosInstance.get('/users', configWithToken(token));
    console.log('Users list fetched in api:', response.data);
    console.log('Users List without .data in response', response);
    console.log('users in api', response.data);
    return response.data; // Return the flattened data
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage); // Throw the error to be handled in the calling function
  }
};

// Example function to get user by ID
export const getUserById = async (id: string, token: string): Promise<User | null> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`, configWithToken(token));
    console.log('User fetched by Id in api:', response.data);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

// Example function to create a new user
export const createUser = async (
  user: NewUserRequestBody
): Promise<{ user: User; updatedUsers: User[]; token: string; accessLog: AccessLog }> => {
  try {
    // Validate the input
    const isValidInput = validatePayload(user);
    if (!isValidInput) {
      throw new Error(ApiError.INVALID_PAYLOAD); // Invalid input provided
    }

    const response = await axiosInstance.post('/users', user);
    console.log('Received token, accessLog and user from mockApi', response.data);

    return {
      user: response.data.user,
      updatedUsers: response.data.updateUsers,
      token: response.data.token,
      accessLog: response.data.accessLog,
    };
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

export const updateUser = async (
  id: string,
  token: string,
  user: UpdatedUserRequestBody
): Promise<{ userProfile: User | null; token: string | null; users: User[] | null }> => {
  try {
    // Validate the input
    const isValidInput = validateUpdate(user);
    if (!isValidInput) {
      throw new Error(ApiError.INVALID_PAYLOAD); // Invalid input provided
    }

    // Make the PUT request with the token in the headers
    const response = await axiosInstance.put(`/users/${id}`, user, configWithToken(token));
    console.log('User updated successfully:', response.data);

    // Assuming the response contains the updated user, users array, and new token
    const updatedUserData = response.data.userProfile;
    const updatedUsersArray = response.data.users;
    const newToken = response.data.token;

    return {
      userProfile: updatedUserData ?? null,
      token: newToken ?? null,
      users: updatedUsersArray ?? [],
    };
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (
  id: string,
  token: string
): Promise<DeleteUserResponseBody | undefined> => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`, configWithToken(token));
    console.log('response.data:', response);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};
