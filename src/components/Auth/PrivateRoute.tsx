import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './helpers/withAuthHOC';
import './PrivateRoute.scss';

const PrivateRoute = withAuth(({ isLoad, isAuthorized, component: Component, ...rest }) => {
  console.log(isLoad);
  return isLoad ? (
    <div className="pre-loader">Loading...</div>
  ) : (
    <Route
      {...rest}
      render={(routeProps) => (isAuthorized ? <Component {...routeProps} /> : <Redirect to="/signin" />)}
    />
  );
});

export { PrivateRoute };
