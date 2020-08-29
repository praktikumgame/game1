import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './helpers/withAuthHOC';

const PrivateRoute = withAuth(({ isAuthorized, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (isAuthorized ? <Component {...routeProps} /> : <Redirect to="/signin" />)}
    />
  );
});

export { PrivateRoute };
