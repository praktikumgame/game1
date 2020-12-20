import React, { useEffect } from 'react';
import { Preloader } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthorize } from '../../../redux/auth/actions';
import { getInitApp } from '../../../redux/app/selectors';
import { getAuthorize } from 'redux/auth/selectors';

function withPreload<T>(WrappedComponent: React.ComponentType<T>) {
  const withPreloadComponent = (props: T) => {
    const dispatch = useDispatch();

    const appIsInit = useSelector(getInitApp);
    const checkingAuthorize = useSelector(getAuthorize);

    useEffect( () => {
      dispatch(checkAuthorize());
    }, []);

    if (checkingAuthorize && !appIsInit) {
      return <Preloader />;
    }
    return <WrappedComponent {...props} />;
  };

  return withPreloadComponent;
}

export { withPreload };
