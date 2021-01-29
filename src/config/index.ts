const USE_WITH_MINI_PROGRAM = Boolean(typeof wx !== 'undefined' && wx.request); // auto detect current environment and differentiate web from mini program

export default {
  HOST: 'http://localhost:4000', // dest url for curve
  APP_ID: '', // WeChat miniprogram app id
  USE_WITH_MINI_PROGRAM, // if set to true, it will use wx.request to send requests to support WeChat miniprogram
};
