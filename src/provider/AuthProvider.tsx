import React from "react";
import axios from "axios";
import { login, refreshToken } from "../api/indext";
import { TokenResponse, User, UserAuth } from "../types";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../const";

interface IAuthProviderProps {
  children?: React.ReactNode;
}

interface IAuthContext {
  initialized: boolean;
  user?: User;
  login?: (auth: UserAuth) => Promise<boolean>;
  logout?: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  initialized: false,
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [initialized, setIsInitialized] = React.useState(false);
  const [user, setUser] = React.useState<User | undefined>();

  const refresh = React.useCallback(() => {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return refreshToken(token).then(loadUser);
    }

    delete axios.defaults.headers.common["Authorization"];
    setUser(undefined);
    return new Promise((resolve) => resolve(true));
  }, []);

  const loadUser = async (response: TokenResponse) => {
    if (!response) {
      return false;
    }
    const { accessToken, refreshToken } = response;
    if (!accessToken || !refreshToken) {
      return false;
    }

    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(TOKEN_KEY, accessToken);
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    setUser({ ...response });
    return true;
  };

  const _login = (formdata: UserAuth) => login(formdata).then(loadUser);
  const _logout = () => {
    setUser(undefined);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
  };

  React.useEffect(() => {
    refresh().then(() => {
      setIsInitialized(true);
    });
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{ initialized, user, login: _login, logout: _logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
