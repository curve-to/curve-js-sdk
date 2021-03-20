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
   * Call cloud function
   * @returns cloud function callback result
   */
  static async call(name: string, params = {}): Promise<void> {
    if (!name) {
      throw new CurveError(600);
    }

    // Cloud functions cannot be called in Node environment
    if (config.WITH_NODE) {
      throw new CurveError(603);
    }

    return await API.cloudFunction.invoke({
      params: { name },
      data: params,
    });
  }
}
