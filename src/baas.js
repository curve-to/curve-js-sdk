import config from './config';

/**
 * Define BaaS
 */
const BaaS = {
  config,
  use: (fn) => fn(BaaS),
};

export default BaaS;
