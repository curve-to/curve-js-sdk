import { WITH_MINI_PROGRAM } from './config';

const STORAGE_KEY_PREFIX = '_curve_';

/**
 * Get storage method
 */
const getStorage = (key: string) => {
  if (WITH_MINI_PROGRAM) {
    return wx.getStorageSync(STORAGE_KEY_PREFIX + key);
  }

  return localStorage.getItem(STORAGE_KEY_PREFIX + key);
};

/**
 * Set storage method
 */
const setStorage = (key: string, value: unknown) => {
  const _value = typeof value === 'string' ? value : JSON.stringify(value);

  if (WITH_MINI_PROGRAM) {
    return wx.setStorageSync(STORAGE_KEY_PREFIX + key, _value);
  }

  return localStorage.setItem(STORAGE_KEY_PREFIX + key, _value);
};

/**
 * Storage class
 * @memberof BaaS
 * @public
 */
class Storage {
  /**
   * static get method
   * @param key
   */
  static get(key: string): unknown {
    let result: unknown;
    const value = getStorage(key);

    if (value) {
      try {
        result = JSON.parse(value);
      } catch (error) {
        result = value;
      }
    } else {
      result = value;
    }

    return result;
  }

  /**
   * static set method
   * @param key
   * @param value
   */
  static set(key: string, value: unknown): void {
    return setStorage(key, value);
  }
}

export default Storage;
