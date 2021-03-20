import API from './api';
import CurveError from './error';
import config from './config';

/**
 * Cloud function class
 * @memberof BaaS
 * @public
 */
export default class CloudFunction {
  /**
   * Invoke cloud function
   * @returns cloud function callback result
   */
  static async invoke(name: string, params = {}): Promise<void> {
    if (!name) {
      throw new CurveError(600);
    }

    // Cloud functions cannot be invoked in Node environment
    if (config.WITH_NODE) {
      throw new CurveError(603);
    }

    return await API.cloudFunction.invoke({
      params: { name },
      body: params,
    });
  }
}
