import axios from "axios";
import { TokenResponse, User, UserAuth } from "../types";

axios.defaults.baseURL = "/api/";
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export const refreshToken = (refreshToken: string): Promise<TokenResponse> =>
  axios.post("auth/refreshtoken", { refreshToken });
export const me = (): Promise<User> => axios.get("auth/me");
export const login = (data: UserAuth): Promise<TokenResponse> =>
  axios.post("auth/signin", data);
