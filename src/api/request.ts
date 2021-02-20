import axios from './interceptor';
import config from '../config';
import { getAuthToken, checkToken } from '../common';
import constants from '../constants';
import User from '../user';
import CurveError from '../error';

let silentLoginInProgress = false;

/**
 * Convert API params
 * @private
 * @param url API URL
 * @param params API params
 * @returns API URL formatted
 */
const format = (url: string, params: genericObject) => {
  params = params || {};
  for (const key in params) {
    const regForQueryString = new RegExp('(&?)' + key + '=:' + key, 'g');
    const value = encodeURIComponent(params[key]);
    if (value !== 'undefined') {
      url = url.replace(regForQueryString, function (match, p1) {
        return p1 + key + '=' + value;
      });
    } else {
      url = url.replace(regForQueryString, '');
    }

    const regForPathname = new RegExp(':' + key, 'g');
    url = url.replace(regForPathname, encodeURIComponent(params[key]));
  }
  return url.replace(/([^:])\/\//g, (m, m1) => {
    return m1 + '/';
  });
};

/**
 * Send requests to server side
 * @param url api endpoint
 * @param method method type
 * @param data data to pass as body
 * @param params params to replace in path
 * @returns response from server
 */
const send = ({ url, method, params, data }) => {
  const body = method === 'GET' ? 'params' : 'data';
  return new Promise((resolve, reject) => {
    axios({
      url: config.HOST + format(url, params),
      method,
      [body]: data,
    })
      .then(res => resolve(res.data.data))
      .catch(err => reject(err));
  });
};

/**
 * Send requests to server (via WeChat Mini Program)
 * @param url api endpoint
 * @param method method type
 * @param data data to pass as body
 * @param params params to replace in path
 * @returns response from server
 */
const sendViaMiniProgram = ({ url, method, params, data }) => {
  if (config.WITH_MINI_PROGRAM && !config.APP_ID) {
    throw new CurveError(601, 'Required WeChat app id is missing.');
  }

  const isTokenExpired = checkToken(); // check if token is expired

  let interceptor: Promise<unknown>;
  if (config.SILENT_LOGIN && isTokenExpired && !silentLoginInProgress) {
    silentLoginInProgress = true;
    interceptor = User.signInWithWeChat();
  } else {
    interceptor = Promise.resolve();
  }

  return interceptor.then(() => {
    return new Promise((resolve, reject) => {
      const token = getAuthToken();
      const header = token
        ? { appid: config.APP_ID, Authorization: token }
        : { appid: config.APP_ID };

      wx.request({
        url: config.HOST + format(url, params),
        method,
        data,
        header,
        success: (res: genericObject) => resolve(res.data.data),
        fail: (err: genericObject) => reject(err),
      });
    });
  });
};

/**
 * Create a request obj for get, post, put and delete functions to pass data
 * @returns request object of functions
 */
const request = (): genericObject => {
  const methods = ['get', 'post', 'put', 'delete'];
  const requestObj = methods.reduce((result, method) => {
    result[method] = (url: string, { params = {}, data = {} }) => {
      const paramsToSend = {
        url,
        method: constants.METHOD_TYPE[method.toUpperCase()],
        params,
        data,
      };

      if (config.WITH_MINI_PROGRAM) {
        return sendViaMiniProgram(paramsToSend);
      }

      return send(paramsToSend);
    };
    return result;
  }, {});

  return requestObj;
};

export default request();
