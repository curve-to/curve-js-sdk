import config from './config';
import User from './user';
import Collection from './collection';
import Document from './document';
import Query from './query';
import File from './file';
import Where from './where';
import Storage from './storage';
import CurveError from './error';
import constants from './constants';

/**
 * Define BaaS
 */
const BaaS = {
  init: ({
    host = config.HOST,
    appid = '',
    silentLogin = false,
  } = {}): void => {
    config.HOST = host;
    config.APP_ID = appid;
    config.SILENT_LOGIN = silentLogin;

    if (config.WITH_MINI_PROGRAM && !appid) {
      throw new CurveError(
        601,
        'You must provide an app id when using this SDK in WeChat Mini Program.'
      );
    }
  },
  config,
  User,
  Collection,
  Document,
  File,
  Query,
  Where,
  Storage,
};

/**
 * Bind BaaS to wx if current environment is Mini Program
 */
if (config.WITH_MINI_PROGRAM) {
  wx.BaaS = BaaS;
}

/**
 * Define path __baseDir to help node local storage to find project's root directory
 * In a node application, you must import this SDK in app.js
 * and should not import in any sub folders
 * Otherwise node local storage will create another storage file in where you import the SDK
 * If you want to use BaaS in other files, use global['BaaS']
 */
if (config.WITH_NODE) {
  import('app-root-path').then(appRoot => {
    global[constants.NODE_ROOT_PATH] = appRoot.toString();
    global[constants.BaaS] = BaaS;
  });
}

export default BaaS;
