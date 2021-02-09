import request from './request';
import constants from '../constants';

const { ROUTES } = constants;

/**
 * Create API calls
 * So that we can focus only on url and method change to
 * avoid adding a very similar request function every time
 * we add a new API route
 */
const createAPICalls = (): genericObject => {
  return Object.keys(ROUTES).reduce((final, key) => {
    final[key] = {};
    for (const subKey in ROUTES[key]) {
      const { url, method } = ROUTES[key][subKey];
      const apiMethod = method.toLowerCase();

      // params are what to be replaced in url string, e.g. /collection/:collection/
      // where data is what to be sent to the backend
      final[key][subKey] = ({ params = {}, data = {} } = {}) => {
        return request[apiMethod](url, { data, params });
      };
    }
    return final;
  }, {});
};

export default createAPICalls();
