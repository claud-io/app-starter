import React from "react";
import axios from "axios";
import { login, me, refreshToken } from "../api/indext";
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

const AuthContext = React.createContext<IAuthContext>({
  initialized: false,
});

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [initialized, setIsInitialized] = React.useState(false);
  const [user, setUser] = React.useState<User | undefined>();

  const refresh = React.useCallback(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return refreshToken().then(loadUser);
    }

    delete axios.defaults.headers.common["Authorization"];
    user && setUser(undefined);
    return new Promise((resolve) => resolve(true));
  }, []);

  const loadUser = async ({ access_token, refresh_token }: TokenResponse) => {
    if (!access_token || !refresh_token) {
      return false;
    }

    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    localStorage.setItem(TOKEN_KEY, access_token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    await me().then(setUser);
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
  }, []);

  return (
    <AuthContext.Provider
      value={{ initialized, user, login: _login, logout: _logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
