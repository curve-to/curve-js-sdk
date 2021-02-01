import request from './request';

export default {
  user: {
    login: (data: genericObject): Promise<void> => {
      return request.post({ url: '/user/login', data });
    },
    register: (data: genericObject): Promise<void> => {
      return request.post({ url: '/user/register', data });
    },
    changePassword: (data: genericObject): Promise<void> => {
      return request.put({ url: '/user/change', data });
    },
    signInWithWeChat: (data: genericObject): Promise<void> => {
      return request.get({ url: '/user/signInWithWeChat', data });
    },
    updateWeChatUserInfo: (data: genericObject): Promise<void> => {
      return request.post({ url: '/user/updateWeChatUserInfo', data });
    },
  },

  collection: {
    getCollection: (
      params: genericObject,
      data: genericObject
    ): Promise<void> => {
      return request.get({ url: '/collection/:collection', params, data });
    },
    count: (params: genericObject): Promise<void> => {
      return request.get({ url: '/collection/:collection/count', params });
    },

    // document related
    create: (params: genericObject, data: genericObject): Promise<void> => {
      return request.post({ url: '/collection/:collection', params, data });
    },
    createMany: (params: genericObject, data: genericObject): Promise<void> => {
      return request.post({
        url: '/collection/:collection/createMany',
        params,
        data,
      });
    },
    getDocument: (
      params: genericObject,
      data: genericObject
    ): Promise<void> => {
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
    updateMany: (params: genericObject, data: genericObject): Promise<void> => {
      return request.put({
        url: '/collection/:collection/updateMany',
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
  },
};
