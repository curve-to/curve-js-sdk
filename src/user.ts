import API from './api';
import STORAGE from './storage';
import { WITH_MINI_PROGRAM } from './config';
import { USER_INFO, AUTH_TOKEN } from './constants';

/**
 * Silent login
 */
const silentLogin = (): Promise<loginInfo> => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async (res: genericObject) => {
        if (res.code) {
          const response = await API.user.signInWithWeChat({ code: res.code });
          resolve(response);
        } else {
          reject(res);
        }
      },
    });
  });
};

/**
 * Update WeChat user info
 * @param userInfo
 */
const updateWeChatUserInfo = async (userInfo: genericObject) => {
  return await API.user.updateWeChatUserInfo({ userInfo });
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
  static async login({ username, password }: credential): Promise<loginInfo> {
    const result = await API.user.login({ username, password });
    const { token, user: _userInfo } = result;
    STORAGE.set(USER_INFO, _userInfo);
    STORAGE.set(AUTH_TOKEN, token);
    return result;
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
  static async signInWithWeChat(userInfo: genericObject): Promise<unknown> {
    if (!WITH_MINI_PROGRAM) {
      console.error(
        'Unable to sign in with WeChat. Make sure your app is in WeChat environment.'
      );
      return;
    }

    if (userInfo) {
      const _userInfo = await updateWeChatUserInfo(userInfo);
      STORAGE.set(USER_INFO, _userInfo);
      return _userInfo;
    } else {
      const { token, user: _userInfo } = await silentLogin();
      STORAGE.set(USER_INFO, _userInfo);
      STORAGE.set(AUTH_TOKEN, token);
      return { token, user: _userInfo };
    }
  }
}

export default User;
