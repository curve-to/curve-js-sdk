import config from './config';
import User from './user';
import Collection from './collection';
import Document from './document';

export type credential = {
  username: string;
  password: string;
  email?: string;
};

export type genericObject = {
  [key: string]: any;
};

/**
 * Define BaaS
 */
const BaaS = {
  init: ({ host = config.HOST } = {}): void => {
    config.HOST = host;
  },
  config,
  User,
  Collection,
  Document,
};

export default BaaS;
