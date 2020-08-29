import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './helpers/withAuthHOC';

const PrivateRoute = withAuth(({ isLoad, isAuthorized, component: Component, ...rest }) => {
  console.log(isLoad);
  return isLoad ? (
    <div>Loading...</div>
  ) : (
    <Route
      {...rest}
      render={(routeProps) => (isAuthorized ? <Component {...routeProps} /> : <Redirect to="/signin" />)}
    />
  );
});

export { PrivateRoute };
