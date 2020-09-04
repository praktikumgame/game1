import React from 'react';
import { Consumer } from '../AuthProvider';
import { authProps } from '../types';

function withAuth<P extends authProps>(WrappedComponent: React.ComponentType<P>) {
  return class extends React.Component<Omit<P, keyof authProps>> {
    static displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
    render() {
      return <Consumer>{(value) => <WrappedComponent {...value} {...(this.props as P)} />}</Consumer>;
    }
  };
}

export { withAuth };
