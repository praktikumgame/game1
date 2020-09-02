import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './helpers/withAuthHOC';
import './PrivateRoute.scss';

const PrivateRoute = withAuth(({ isLoad, isAuthorized, component: Component, ...rest }) => {
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
