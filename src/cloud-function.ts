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
   * @param name
   * @param param
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

  /**
   * Create cloud function
   * @param name
   * @param code
   * @returns cloud function callback result
   */
  static async create(name: string, code: string): Promise<void> {
    if (!name || !code) {
      throw new CurveError(600);
    }

    return await API.cloudFunction.create({
      data: { name, code },
    });
  }

  /**
   * Create cloud function
   * @param name
   * @returns cloud function callback result
   */
  static async remove(name: string): Promise<void> {
    if (!name) {
      throw new CurveError(600);
    }

    // Cloud functions cannot be called in Node environment
    if (config.WITH_NODE) {
      throw new CurveError(603);
    }

    return await API.cloudFunction.remove({
      params: { name },
    });
  }

  /**
   * Create cloud function
   * @param name
   * @returns cloud function callback result
   */
  static async find(name: string): Promise<void> {
    if (!name) {
      throw new CurveError(600);
    }

    return await API.cloudFunction.find({
      params: { name },
    });
  }

  /**
   * Update cloud function
   * @param name
   * @param code
   * @returns cloud function callback result
   */
  static async update(name: string, code: string): Promise<void> {
    if (!name || !code) {
      throw new CurveError(600);
    }

    return await API.cloudFunction.update({
      params: { name },
      data: { code },
    });
  }
}
