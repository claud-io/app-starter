export type User = {
  email: string;
  fullName: string;
  role: string;
  isAdmin: boolean;
};

export type UserAuth = {
  username: string;
  password: string;
};

export type TokenResponse = User & {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};
