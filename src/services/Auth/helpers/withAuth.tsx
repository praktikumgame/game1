import React, { ComponentType } from 'react';
import { Consumer } from '../AuthProvider';
import { AuthContext } from '../types';

const withAuth = (WrappedComponent: ComponentType<AuthContext>) => {
  return function AuthHOC(props: AuthContext) {
    return <Consumer>{(value) => <WrappedComponent {...value} {...props} />}</Consumer>;
  };
};

export { withAuth };
