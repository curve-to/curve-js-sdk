import STORAGE from './storage';
import { AUTH_TOKEN } from './constants';

/**
 * Get auth token
 */
export const getAuthToken = (): unknown => {
  const token = STORAGE.get(AUTH_TOKEN);

  if (!token) return null;
  return 'bearer ' + token;
};
