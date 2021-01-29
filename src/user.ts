import API from './api';

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
   * @returns response from server
   */
  static async login({ username, password }: credential): Promise<void> {
    return await API.user.login({ username, password });
  }

  /**
   * static register method
   * @param username
   * @param password
   * @param email
   * @returns response from server
   */
  static async register({
    username,
    password,
    email,
  }: credential): Promise<void> {
    return await API.user.register({ username, password, email });
  }

  /**
   * static change password method
   * @param username
   * @param password new password to reset
   * @param email
   * @returns response from server
   */
  static async changePassword({
    username,
    password,
    email,
  }: credential): Promise<void> {
    return await API.user.changePassword({ username, password, email });
  }

  /**
   * static sign in with WeChat method
   * @returns login session and credentials
   */
  static async silentLogin(): Promise<void> {
    if (!wx || !wx.login) {
      console.error(
        'Unable to sign in with WeChat. Make sure your app is in WeChat environment.'
      );
      return;
    }
    wx.login({
      success: async (res: genericObject) => {
        if (res.code) {
          return await API.user.signInWithWeChat(res.code);
        } else {
          console.log('Login failed! ' + res.errMsg);
        }
      },
    });
  }
}

export default User;
