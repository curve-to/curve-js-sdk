import STORAGE from './storage';
import constants from './constants';
import { WITH_MINI_PROGRAM } from './config';
import API from './api';

/**
 * Silent login
 */
const silentLogin = (): Promise<loginInfo> => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async (res: genericObject) => {
        if (res.code) {
          const response = await API.user.signInWithWeChat({
            data: { code: res.code },
          });
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
  return await API.user.updateWeChatUserInfo({ data: { userInfo } });
};

/**
 * User class
 * @memberof BaaS
 * @public
 */
export default class User {
  /**
   * static login method
   * @param username
   * @param password
   * @returns response from server
   */
  static async login({ username, password }: credential): Promise<loginInfo> {
    try {
      const result = await API.user.login({ data: { username, password } });
      const { token, user: _userInfo, expiredAt } = result;
      console.log('result - ', result);
      STORAGE.set(constants.USER_INFO, _userInfo);
      STORAGE.set(constants.AUTH_TOKEN, token);
      STORAGE.set(constants.TOKEN_EXPIRED_AT, expiredAt);
      return result;
    } catch (error) {
      return null;
    }
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
    return await API.user.register({ data: { username, password, email } });
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
    return await API.user.changePassword({
      data: { username, password, email },
    });
  }

  /**
   * Check if token is expired
   */
  static async checkToken(): Promise<void> {
    return await API.user.checkToken();
  }

  /**
   * static sign in with WeChat method
   * @param data
   * @returns login session and credentials
   */
  static async signInWithWeChat(userInfo?: genericObject): Promise<unknown> {
    if (!WITH_MINI_PROGRAM) {
      console.error(
        'Unable to sign in with WeChat. Make sure your app is in WeChat environment.'
      );
      return;
    }

    if (userInfo) {
      const _userInfo = await updateWeChatUserInfo(userInfo);
      STORAGE.set(constants.USER_INFO, _userInfo);
      return _userInfo;
    } else {
      const { token, user: _userInfo, expiredAt } = await silentLogin();
      STORAGE.set(constants.USER_INFO, _userInfo);
      STORAGE.set(constants.AUTH_TOKEN, token);
      STORAGE.set(constants.TOKEN_EXPIRED_AT, expiredAt);
      return { token, user: _userInfo };
    }
  }

  static signOut(): void {
    STORAGE.clear(constants.USER_INFO);
    STORAGE.clear(constants.AUTH_TOKEN);
    STORAGE.clear(constants.TOKEN_EXPIRED_AT);
  }
}
