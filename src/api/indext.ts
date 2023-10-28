import axios from "axios";
import { TokenResponse, User, UserAuth } from "../types";

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export const refreshToken = (): Promise<TokenResponse> => axios.get("/refresh");
export const me = (): Promise<User> => axios.get("/me");
export const login = (data: UserAuth): Promise<TokenResponse> =>
  axios.post("/login", data);
