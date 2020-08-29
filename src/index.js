import BaaS from './baas';
import User from './user';
import Collection from './collection';

BaaS.init = (host = BaaS.config.HOST) => {
  BaaS.config.HOST = host;
};

BaaS.User = User;
BaaS.Collection = Collection;

export default BaaS;
