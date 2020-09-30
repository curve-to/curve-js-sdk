import config from './config';
import User from './user';
import Collection from './collection';
import Document from './document';

/**
 * Define BaaS
 */
const BaaS = {
  init: ({ host = BaaS.config.HOST } = {}): void => {
    BaaS.config.HOST = host;
  },
  config,
  User,
  Collection,
  Document,
};

export default BaaS;
