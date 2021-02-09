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

/**
 * Check if token is expired
 */
export const checkToken = (): boolean => {
  const tokenExpiredAt = STORAGE.get(constants.TOKEN_EXPIRED_AT);
  return Date.now() / 1000 >= (tokenExpiredAt || 0);
};
