import request from './request';

export default {
  // user related
  login: (data: genericObject): Promise<void> => {
    return request.post({ url: '/user/login', data });
  },
  register: (data: genericObject): Promise<void> => {
    return request.post({ url: '/user/register', data });
  },
  changePassword: (data: genericObject): Promise<void> => {
    return request.put({ url: '/user/change', data });
  },

  // collection related
  create: (params: genericObject, data: genericObject): Promise<void> => {
    return request.post({ url: '/collection/:collection', params, data });
  },
  getCollection: (
    params: genericObject,
    data: genericObject
  ): Promise<void> => {
    return request.get({ url: '/collection/:collection', params, data });
  },
  getDocument: (params: genericObject, data: genericObject): Promise<void> => {
    return request.get({
      url: '/collection/:collection/:documentId',
      params,
      data,
    });
  },
  update: (params: genericObject, data: genericObject): Promise<void> => {
    return request.put({
      url: '/collection/:collection/:documentId',
      params,
      data,
    });
  },
  remove: (params: genericObject): Promise<void> => {
    return request.delete({
      url: '/collection/:collection/:documentId',
      params,
    });
  },
  count: (params: genericObject): Promise<void> => {
    return request.get({ url: '/collection/:collection/count', params });
  },
};
