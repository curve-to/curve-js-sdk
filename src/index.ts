import config from './config';
import User from './user';
import Collection from './collection';
import Document from './document';
import Query from './query';
import Where from './where';
import Storage from './storage';

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
      throw new Error('You must provide appid when using this SDK in WeChat Mini Program.');
    }
  },
  config,
  User,
  Collection,
  Document,
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

export default BaaS;
