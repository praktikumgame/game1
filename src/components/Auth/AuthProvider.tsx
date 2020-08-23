import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { authContext } from './types';

const { Provider, Consumer } = React.createContext<authContext>({
  isAuthorized: false,
  authorize: () => {
    return;
  },
  logout: () => {
    return;
  },
});

const AuthProvider = ({ children, history }: { children: ReactNode } & RouteComponentProps): JSX.Element => {
  const _isMounted = useRef(true);
  const [auth, setAuth] = useState({ isAuthorized: false });
  useEffect(() => {
    if (localStorage.getItem('isAuthorized')) {
      setAuth({ isAuthorized: true });
    }
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const authorize = () => {
    if (_isMounted.current) {
      setAuth({ isAuthorized: true });
      localStorage.setItem('isAuthorized', 'true');
      history.push('/game');
    }
  };

  const logout = () => {
    if (_isMounted.current) {
      setAuth({ isAuthorized: false });
      localStorage.removeItem('isAuthorized');
      history.push('/signin');
    }
  };
  return <Provider value={{ ...auth, authorize, logout }}>{children}</Provider>;
};

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProviderWithRouter, Consumer };
