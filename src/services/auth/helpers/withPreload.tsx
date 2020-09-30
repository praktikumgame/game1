import React, { useEffect } from 'react';
import { Preloader } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthorize } from '../../../redux/auth/actions';
import { withAuth } from './withAuth';
import { withAuthProps } from '../types';
import { IAppState } from '../../../redux/app/reducer';

function withPreload<T>(WrappedComponent: React.ComponentType<T>) {
  const withPreloadComponent = withAuth((props: T & withAuthProps) => {
    const dispatch = useDispatch();
    const appIsInit = useSelector((state: { app: IAppState }) => state.app.initApp);

    useEffect(() => {
      dispatch(checkAuthorize());
    }, []);

    if (!props.isAuthorized && !appIsInit) {
      return <Preloader />;
    }
    return <WrappedComponent {...props} />;
  });

  return withPreloadComponent;
}

export { withPreload };
