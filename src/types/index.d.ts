declare const wx: genericObject;

declare type credential = {
  username: string;
  password: string;
  email?: string;
};

declare type genericObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

declare type loginInfo = {
  token: string;
  user: genericObject;
  expiredAt: genericObject;
};

declare type populatedObject = {
  field: string;
  collection: genericObject;
};
