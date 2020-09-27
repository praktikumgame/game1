import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { withAuth, withAuthProps } from '../../services/Auth/';

import './PrivateRoute.css';

const PrivateRoute = withAuth(({ isAuthorized, component: Component, ...rest }: withAuthProps & RouteProps) => {
  if (!Component) {
    throw new Error('Component is required in PrivateRoute');
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => (isAuthorized ? <Component {...routeProps} /> : <Redirect to="/signin" />)}
    />
  );
});

export { PrivateRoute };
