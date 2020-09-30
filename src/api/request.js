import axios from './interceptor';
import BaaS from '../baas';

const METHOD_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
 * Convert API params
 * @private
 * @param  {String} url    API URL
 * @param  {Object} params API params
 * @return {String}        API URL formatted
 */
const format = (url, params) => {
  params = params || {};
  for (let key in params) {
    let regForQueryString = new RegExp('(&?)' + key + '=:' + key, 'g');
    let value = encodeURIComponent(params[key]);
    if (value !== 'undefined') {
      url = url.replace(regForQueryString, function (match, p1) {
        return p1 + key + '=' + value;
      });
    } else {
      url = url.replace(regForQueryString, '');
    }

    let regForPathname = new RegExp(':' + key, 'g');
    url = url.replace(regForPathname, encodeURIComponent(params[key]));
  }
  return url.replace(/([^:])\/\//g, (m, m1) => {
    return m1 + '/';
  });
};

/**
 * Send requests to server side
 * @param {String} url api endpoint
 * @param {String} method method type
 * @param {Object} data data to pass as body
 * @param {Object} params params to replace in path
 * @return {Promise} response from server
 */
const send = ({ url, method, params, data }) => {
  const body = method === 'GET' ? 'params' : 'data';
  return new Promise((resolve, reject) => {
    axios({
      url: BaaS.config.HOST + format(url, params),
      method,
      [body]: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

/**
 * Create a request obj for get, post, put and delete functions to pass data
 * @return {Object} request object of functions
 */
const request = () => {
  const methods = ['get', 'post', 'put', 'delete'];
  const requestObj = methods.reduce((result, method) => {
    result[method] = ({ url, params = {}, data = {} }) =>
      send({ url, method: METHOD_TYPE[method.toUpperCase()], params, data });
    return result;
  }, {});

  return requestObj;
};

export default request();
