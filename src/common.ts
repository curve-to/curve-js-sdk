import STORAGE from './storage';
import constants from './constants';

/**
 * Get auth token
 */
export const getAuthToken = (): unknown => {
  const token = STORAGE.get(constants.AUTH_TOKEN);

  if (!token) return null;
  return 'bearer ' + token;
};
