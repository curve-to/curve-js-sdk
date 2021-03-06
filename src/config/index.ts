// auto detect current environment and differentiate web from mini program
export const WITH_MINI_PROGRAM = Boolean(
  typeof wx !== 'undefined' && wx.request
);

// Auto detect if current environment is node
export const WITH_NODE =
  !WITH_MINI_PROGRAM &&
  (typeof localStorage === 'undefined' || localStorage === null);

export default {
  HOST: 'http://localhost:4000', // Dest url for curve
  APP_ID: '', // WeChat miniprogram app id
  WITH_MINI_PROGRAM, // If set to true, it will use wx.request to send requests to support WeChat miniprogram
  WITH_NODE,
  SILENT_LOGIN: false, // Auto login before the first request is made
};
