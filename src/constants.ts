export default {
  USER_INFO: 'user_info',
  AUTH_TOKEN: 'auth_token',
  TOKEN_EXPIRED_AT: 'token_expired_at',
  METHOD_TYPE: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  ROUTES: {
    user: {
      login: {
        url: '/user/login',
        method: 'POST',
      },
      register: {
        url: '/user/register',
        method: 'POST',
      },
      changePassword: {
        url: '/user/change',
        method: 'PUT',
      },
      signInWithWeChat: {
        url: '/user/signInWithWeChat',
        method: 'GET',
      },
      updateWeChatUserInfo: {
        url: '/user/updateWeChatUserInfo',
        method: 'POST',
      },
      checkToken: {
        url: '/user/checkToken',
        method: 'POST',
      },
    },
    collection: {
      findMany: {
        url: '/collection/:collection',
        method: 'GET',
      },
      findDistinct: {
        url: '/collection/:collection/findDistinct',
        method: 'GET',
      },
      count: {
        url: '/collection/:collection/count',
        method: 'GET',
      },
      sum: {
        url: '/collection/:collection/sum',
        method: 'POST',
      },

      // document related
      create: {
        url: '/collection/:collection',
        method: 'POST',
      },
      createMany: {
        url: '/collection/:collection/createMany',
        method: 'POST',
      },
      find: {
        url: '/collection/:collection/:documentId',
        method: 'GET',
      },
      update: {
        url: '/collection/:collection/:documentId',
        method: 'PUT',
      },
      updateMany: {
        url: '/collection/:collection/updateMany',
        method: 'PUT',
      },
      remove: {
        url: '/collection/:collection/:documentId',
        method: 'DELETE',
      },
      removeMany: {
        url: '/collection/:collection',
        method: 'DELETE',
      },
    },
  },
};
