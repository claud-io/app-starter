import axios from "axios";
import { TokenResponse, User, UserAuth } from "../types";

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export const refreshToken = (_refresh_token: string): Promise<TokenResponse> => axios.post("/api/auth/refreshtoken",{refresh_token: _refresh_token});
export const me = (): Promise<User> => axios.get("/api/auth/me");
export const login = (data: UserAuth): Promise<TokenResponse> =>
  axios.post("/api/auth/signin", data);
