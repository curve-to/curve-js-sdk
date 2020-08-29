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
   * @param {String} username
   * @param {String} password
   * @return {Promise} response from server
   */
  static async login({ username, password }) {
    return await API.login({
      username: convertInput(username),
      password: convertInput(password),
    });
  }

  /**
   * static register method
   * @param {String} username
   * @param {String} password
   * @param {String} email
   * @return {Promise} response from server
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
   * @param {String} username
   * @param {String} password new password to reset
   * @param {String} email
   * @return {Promise} response from server
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
