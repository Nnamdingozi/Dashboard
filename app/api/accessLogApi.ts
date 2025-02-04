

import { 
  axiosInstance, 
  handleApiError, 
  configWithToken,
} from '@/app/validation/validation';

// Import type declaration
import { AccessLog, UpdateAccessLog } from '@/app/utilities/definitions';

export const getAccessLogs = async (token: string): Promise<AccessLog[] | []> => {
  try {
    const response = await axiosInstance.get('/accesslogs', configWithToken(token));
    console.log('AccessLog for all user:', response.data);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

export const getAccessLogById = async (
  id: string, 
  token: string
): Promise<AccessLog | null> => {
  try {
    const response = await axiosInstance.get(`/accesslogs/${id}`, configWithToken(token));
    console.log('Access log by Id:', response.data);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    console.error('Error fetching access log:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const createAccessLog = async (
  token: string, 
  log: AccessLog
): Promise<{ logResponse: AccessLog; updatedLogs: AccessLog[] }> => {
  try {
    const response = await axiosInstance.post('/accesslogs', log, configWithToken(token));
    console.log('Access log successfully created:', response.data);

    return {
      logResponse: response.data.logResponse, // Log response as returned by handler
      updatedLogs: response.data.updatedLogs, // Updated logs array as returned by handler
    };
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

export const updateAccessLog = async (
  id: string, 
  token: string, 
  log: UpdateAccessLog
): Promise<AccessLog | null> => {
  try {
    const response = await axiosInstance.put(`accesslogs/${id}`, log, configWithToken(token));
    console.log('Access log updated successfully:', response.data);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

export const deleteAccessLog = async (id: string, token: string) => {
  try {
    const response = await axiosInstance.delete(`accesslogs/${id}`, configWithToken(token));
    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};
