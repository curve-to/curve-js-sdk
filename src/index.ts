import config from './config';
import User from './user';
import Collection from './collection';
import Document from './document';
import Query from './query';
import Storage from './storage';

/**
 * Define BaaS
 */
const BaaS = {
  init: ({ host = config.HOST, appid = '' } = {}): void => {
    config.HOST = host;
    config.APP_ID = appid;
  },
  config,
  User,
  Collection,
  Document,
  Query,
  Storage,
};

/**
 * Bind BaaS to wx if current environment is Mini Program
 */
if (config.WITH_MINI_PROGRAM) {
  wx.BaaS = BaaS;
}

export default BaaS;
