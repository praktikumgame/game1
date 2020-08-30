/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType } from 'react';
import { Consumer } from '../AuthProvider';

const withAuth = (WrappedComponent: ComponentType<any>): ((props: any) => JSX.Element) => {
  const AuthHOC = (props: any): JSX.Element => {
    return <Consumer>{(value) => <WrappedComponent {...value} {...props} />}</Consumer>;
  };

  return AuthHOC;
};

export { withAuth };
