import API from './api';

/**
 * Convert input to string
 * @param {*} input 
 */
const convertInput = (input) => {
  if (input == null) {
    return '';
  }

  if (typeof input !== 'string') {
    return input.toString();
  }

  return input;
};

/**
 * User class
 */
class User {
  /**
   * static login method
   * @param {string} username
   * @param {string} password
   */
  static async login({ username, password }) {
    return await API.login({
      username: convertInput(username),
      password: convertInput(password),
    });
  }

  /**
   * static register method
   * @param {string} username
   * @param {string} password
   * @param {string} email
   */
  static async register({ username, password, email }) {
    return await API.register({
      username: convertInput(username),
      password: convertInput(password),
      email: convertInput(email),
    });
  }

  /**
   * static change password method
   * @param {string} username
   * @param {string} password new password to reset
   * @param {string} email
   */
  static async changePassword({ username, password, email }) {
    return await API.changePassword({
      username: convertInput(username),
      password: convertInput(password),
      email: convertInput(email),
    });
  }
}

export default User;
