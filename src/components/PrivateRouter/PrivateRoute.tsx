import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ISigninState } from 'redux/signin/reducer';
import { withAuth, withAuthProps } from '../../services/auth/';

const PrivateRoute = withAuth(({ isAuthorized, component: Component, ...rest }: withAuthProps & RouteProps) => {
  const backdoor = useSelector((state: { signin: ISigninState }) => state.signin.backdoor);
  if (!Component) {
    throw new Error('Component is required in PrivateRoute');
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => (isAuthorized || backdoor ? <Component {...routeProps} /> : <Redirect to="/signin" />)}
    />
  );
});

export { PrivateRoute };
