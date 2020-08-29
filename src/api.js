import request from './request';

export default {
  login: (data) => {
    return request.post('/user/login', data);
  },
  register: (data) => {
    return request.post('/user/register', data);
  },
  changePassword: (data) => {
    return request.put('/user/change', data);
  },
};
