import React, { useState, ReactNode, useEffect } from 'react';
import { AuthContext } from './types';
import { authApi } from '../../services/api';

const { Provider, Consumer } = React.createContext<AuthContext>({
  isAuthorized: false,
  authorize: () => {
    return;
  },
  logout: () => {
    return;
  },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({ isAuthorized: false });
  const [isLoading, setIsLoad] = useState(true);

  useEffect(() => {
    authApi
      .getUserInfo()
      .then(() => authorize())
      .catch(() => logout())
      .finally(() => setIsLoad(false));
  }, []);

  const authorize = () => {
    setAuth({ isAuthorized: true });
    localStorage.setItem('isAuthorized', 'true');
  };

  const logout = () => {
    setAuth({ isAuthorized: false });
    localStorage.removeItem('isAuthorized');
  };
  return <Provider value={{ ...auth, authorize, logout, isLoading }}>{children}</Provider>;
};

export { AuthProvider, Consumer };
