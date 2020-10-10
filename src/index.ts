import config from './config';
import User from './user';
import Collection from './collection';
import Document from './document';

/**
 * Define BaaS
 */
const BaaS = {
  init: ({
    host = config.HOST,
    useWithMiniProgram = config.USE_WITH_MINI_PROGRAM,
  } = {}): void => {
    config.HOST = host;
    config.USE_WITH_MINI_PROGRAM = useWithMiniProgram;
  },
  config,
  User,
  Collection,
  Document,
};

export default BaaS;
