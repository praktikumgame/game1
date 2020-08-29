import React, { useState, ReactNode, useEffect } from 'react';
import { authContext } from './types';
import { AuthApi } from '../../api/';
const authApi = new AuthApi();

const { Provider, Consumer } = React.createContext<authContext>({
  isAuthorized: false,
  authorize: () => {
    return;
  },
  logout: () => {
    return;
  },
});

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [auth, setAuth] = useState({ isAuthorized: false });

  useEffect(() => {
    authApi
      .getUserInfo()
      .then(() => authorize())
      .catch(() => logout());
  }, []);

  const authorize = () => {
    setAuth({ isAuthorized: true });
    localStorage.setItem('isAuthorized', 'true');
  };

  const logout = () => {
    setAuth({ isAuthorized: false });
    localStorage.removeItem('isAuthorized');
  };
  return <Provider value={{ ...auth, authorize, logout }}>{children}</Provider>;
};

export { AuthProvider, Consumer };
