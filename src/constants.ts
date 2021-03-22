export default {
  USER_INFO: 'user_info',
  AUTH_TOKEN: 'auth_token',
  TOKEN_EXPIRED_AT: 'token_expired_at',
  NODE_ROOT_PATH: '__baseDir',
  BaaS: 'BaaS',
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
      random: {
        url: '/collection/:collection/random',
        method: 'GET',
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
    file: {
      upload: {
        url: '/file/upload',
        method: 'POST',
      },
      count: {
        url: '/file/count',
        method: 'GET',
      },
      findMany: {
        url: '/file/findMany',
        method: 'GET',
      },
      find: {
        url: '/file/:fileId',
        method: 'GET',
      },
      remove: {
        url: '/file/:fileId',
        method: 'DELETE',
      },
    },
    cloudFunction: {
      invoke: {
        url: '/cloud/function/:name',
        method: 'POST',
      },
      find: {
        url: '/cloud/function/:name',
        method: 'GET',
      },
      create: {
        url: '/cloud/function/create',
        method: 'POST',
      },
      update: {
        url: '/cloud/function/:name',
        method: 'PUT',
      },
      remove: {
        url: '/cloud/function/:name',
        method: 'DELETE',
      },
    },
  },
};
