declare const wx: genericObject;

declare type credential = {
  username: string;
  password: string;
  email?: string;
};

declare type genericObject = {
  [key: string]: any;
};

declare type LoginInfo = {
  token: string;
  user: genericObject;
};
