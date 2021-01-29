import API from './api';

/**
 * Silent login
 */
const silentLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async (res: genericObject) => {
        if (res.code) {
          const response =  await API.user.signInWithWeChat({code: res.code});
          resolve(response);
        } else {
          console.log('Login failed! ' + res.errMsg);
          reject(res);
        }
      },
    });
  });
};

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
   * @param data 
   * @returns login session and credentials
   */
  static async signInWithWeChat(authData: genericObject): Promise<unknown> {
    if (!wx || !wx.login) {
      console.error(
        'Unable to sign in with WeChat. Make sure your app is in WeChat environment.'
      );
      return;
    }

    if (authData && authData.detail) {
      return;
    } else {
      return await silentLogin();
    }
  }
}

export default User;
