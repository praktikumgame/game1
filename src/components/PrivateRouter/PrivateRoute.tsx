import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { withAuth, AuthProps } from '../../services/auth/';

import './PrivateRoute.css';

type Props = AuthProps & RouteProps;

const PrivateRoute = withAuth(({ isLoad, isAuthorized, component: Component, ...rest }: Props) => {
  if (!Component) {
    throw new Error('Component is required in PrivateRoute');
  }

  if (isLoad) {
    return <div className="pre-loader">Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => (isAuthorized ? <Component {...routeProps} /> : <Redirect to="/signin" />)}
    />
  );
});

export { PrivateRoute };
