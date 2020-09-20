import React from 'react';
import { Consumer } from '../AuthProvider';
import { AuthProps } from '../types';

const withAuth = <P extends AuthProps>(WrappedComponent: React.ComponentType<P>) => {
  const withAuthComponent = (props: Omit<P, keyof AuthProps>) => {
    return <Consumer>{(value) => <WrappedComponent {...value} {...(props as P)} />}</Consumer>;
  };

  return withAuthComponent;
};

export { withAuth };
