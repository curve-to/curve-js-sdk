import BaaS from './baas';
import User from './user';

BaaS.init = (host = BaaS.config.HOST) => {
  BaaS.config.HOST = host;
};

BaaS.User = User;

export default BaaS;
