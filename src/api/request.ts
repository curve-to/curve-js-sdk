import axios from './interceptor';
import config from '../config';

type genericObject = {
  [key: string]: any;
};

const METHOD_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
 * Convert API params
 * @private
 * @param url API URL
 * @param params API params
 * @return API URL formatted
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
 * @return response from server
 */
const send = ({ url, method, params, data }) => {
  const body = method === 'GET' ? 'params' : 'data';
  return new Promise((resolve, reject) => {
    axios({
      url: config.HOST + format(url, params),
      method,
      [body]: data,
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

/**
 * Create a request obj for get, post, put and delete functions to pass data
 * @return {Object} request object of functions
 */
const request = (): genericObject => {
  const methods = ['get', 'post', 'put', 'delete'];
  const requestObj = methods.reduce((result, method) => {
    result[method] = ({ url, params = {}, data = {} }) =>
      send({ url, method: METHOD_TYPE[method.toUpperCase()], params, data });
    return result;
  }, {});

  return requestObj;
};

export default request();
