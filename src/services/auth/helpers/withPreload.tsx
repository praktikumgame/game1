import React, { useEffect } from 'react';
import { Preloader } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthorize } from '../../../redux/auth/actions';
import { IAppState } from '../../../redux/app/reducer';
import { IAuthState } from 'redux/auth/reducer';

function withPreload<T>(WrappedComponent: React.ComponentType<T>) {
  const withPreloadComponent = (props: T) => {
    const dispatch = useDispatch();
    const appIsInit = useSelector((state: { app: IAppState }) => state.app.initApp);
    const checkingAuthorize = useSelector((state: { auth: IAuthState }) => state.auth.checkingAuthorize);

    useEffect(() => {
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
