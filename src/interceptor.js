import _axios from 'axios';
import xhrAdapter from 'axios/lib/adapters/xhr';
import httpAdapter from 'axios/lib/adapters/http';

function getDefaultAdapter() {
  let adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhrAdapter;
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = httpAdapter;
  }
  return adapter;
}

const axios = _axios.create({ adapter: getDefaultAdapter() });

axios.interceptors.request.use((config) => {
  config.timeout = 40 * 1000; // timeout 40s
  config.withCredentials = true;

  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';

  return config;
});

export default axios;
