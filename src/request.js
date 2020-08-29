import axios from './interceptor';
import BaaS from './baas';

const METHOD_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const send = (url, method, params) => {
  const data = method === 'GET' ? 'params' : 'data';
  return new Promise((resolve, reject) => {
    axios({
      url: BaaS.config.HOST + url,
      method,
      [data]: params,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export default {
  get: (url, params = {}) => send(url, METHOD_TYPE.GET, params),
  post: (url, params = {}) => send(url, METHOD_TYPE.POST, params),
  put: (url, params = {}) => send(url, METHOD_TYPE.PUT, params),
  delete: (url, params = {}) => send(url, METHOD_TYPE.DELETE, params),
};
