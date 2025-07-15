export type PayloadToken = {
  sub: string | number;
  email: string;
};

export type AccessTokenInf = {
  access_token: string;
  user: {
    id: string | number;
    email: string;
    roles?: string[];
    permissions?: string[];
  };
};
