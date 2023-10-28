export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  isAdmin?: boolean;
};

export type UserAuth = {
  username: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};
