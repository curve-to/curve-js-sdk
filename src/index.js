import BaaS from './baas';
import User from './user';
import Collection from './collection';
import Document from './document';

BaaS.init = ({ host = BaaS.config.HOST } = {}) => {
  BaaS.config.HOST = host;
};

BaaS.User = User;
BaaS.Collection = Collection;
BaaS.Document = Document;

export default BaaS;
