export type User = {
  username: string;
  full_name: string;
  role: string;
  isAdmin?: boolean;
};

export type UserAuth = {
  username: string;
  password: string;
};


export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  username: string;
  full_name: string;
  role: string;
  is_admin: boolean;
};
