import React from 'react';
import { Consumer } from '../AuthProvider';
import { AuthProps } from '../types';

function withAuth<P extends AuthProps>(WrappedComponent: React.ComponentType<P>) {
  return class extends React.Component<Omit<P, keyof AuthProps>> {
    static displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
    render() {
      return <Consumer>{(value) => <WrappedComponent {...value} {...(this.props as P)} />}</Consumer>;
    }
  };
}

export { withAuth };
