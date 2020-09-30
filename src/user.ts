import API from './api';
import credential from './types/credential';

/**
 * User class
 * @memberof BaaS
 * @public
 */
class User {
  /**
   * static login method
   * @param username
   * @param password
   * @return response from server
   */
  static async login({ username, password }: credential): Promise<void> {
    return await API.login({ username, password });
  }

  /**
   * static register method
   * @param username
   * @param password
   * @param email
   * @return response from server
   */
  static async register({
    username,
    password,
    email,
  }: credential): Promise<void> {
    return await API.register({ username, password, email });
  }

  /**
   * static change password method
   * @param username
   * @param password new password to reset
   * @param email
   * @return response from server
   */
  static async changePassword({
    username,
    password,
    email,
  }: credential): Promise<void> {
    return await API.changePassword({ username, password, email });
  }
}

export default User;
