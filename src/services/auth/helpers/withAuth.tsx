import React from 'react';
import { useSelector } from 'react-redux';
import { IAuthState } from '../../../redux/auth/reducer';
import { withAuthProps } from '../types';

function withAuth<T extends withAuthProps>(WrappedComponent: React.ComponentType<T>) {
  const withAuthComponent = (props: Omit<T, keyof withAuthProps>) => {
    const authProps = useSelector((state: { auth: IAuthState }) => ({
      isAuthorized: state.auth.isAuthorized,
    }));

    return <WrappedComponent {...(props as T)} {...authProps} />;
  };

  return withAuthComponent;
}

export { withAuth };
