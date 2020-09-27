import React from 'react';
import { useSelector } from 'react-redux';
import { IAuthState } from '../../../redux/authReducer';
import { withAuthProps } from '../types';

const withAuth = <T extends withAuthProps>(WrappedComponent: React.ComponentType<T>) => {
  const withAuthComponent = (props: Omit<T, keyof withAuthProps>) => {
    const isAuthorized = useSelector((state: { auth: IAuthState }) => state.auth.isAuthorized);

    const newProps = { ...{ isAuthorized: isAuthorized }, ...(props as T) };

    return <WrappedComponent {...newProps} />;
  };

  return withAuthComponent;
};

export { withAuth };
