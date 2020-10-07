import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthorize } from '../../../redux/auth/selectors';
import { withAuthProps } from '../types';

function withAuth<T extends withAuthProps>(WrappedComponent: React.ComponentType<T>) {
  const withAuthComponent = (props: Omit<T, keyof withAuthProps>) => {
    const authProps = useSelector(getAuthorize);

    return <WrappedComponent {...(props as T)} {...authProps} />;
  };

  return withAuthComponent;
}

export { withAuth };
