import request from './request';

export default {
  // user related
  login: (data) => {
    return request.post({ url: '/user/login', data });
  },
  register: (data) => {
    return request.post({ url: '/user/register', data });
  },
  changePassword: (data) => {
    return request.put({ url: '/user/change', data });
  },
  // collection related
  create: (params, data) => {
    return request.post({ url: '/collection/:collection', params, data });
  },
  getCollection: (params, data) => {
    return request.get({ url: '/collection/:collection', params, data });
  },
  getDocument: (params, data) => {
    return request.get({
      url: '/collection/:collection/:documentId',
      params,
      data,
    });
  },
  update: (params, data) => {
    return request.put({
      url: '/collection/:collection/:documentId',
      params,
      data,
    });
  },
  remove: (params) => {
    return request.delete({
      url: '/collection/:collection/:documentId',
      params,
    });
  },
  count: (params) => {
    return request.get({ url: '/collection/:collection/count', params });
  },
};
