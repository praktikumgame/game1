import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearCookie } from '../../redux/auth/actions';
import { Button } from '../';
import { withAuth, withAuthProps } from '../../services/auth';

import './Header.css';
import { IAuthState } from 'redux/auth/reducer';

const Header = withAuth(({ isAuthorized }: withAuthProps) => {
  const dispatch = useDispatch();
  const backdoor = useSelector((state: { auth: IAuthState }) => state.auth.backdoor);
  return (
    <header className="header">
      <NavLink className="link header__logo-link" to="/">
        Game logo
      </NavLink>
      <nav className="header__nav">
        {isAuthorized || backdoor ? (
          <>
            <NavLink className="link header__link" to="/game">
              Play
            </NavLink>
            <NavLink className="link header__link" to="/settings">
              Settings
            </NavLink>
            <NavLink className="link header__link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <Button onClick={() => dispatch(clearCookie())} buttonText={'Exit'} />
          </>
        ) : (
          <>
            <NavLink className="link header__link" to="/signup">
              Signup
            </NavLink>
            <NavLink className="link header__link" to="/signin">
              Signin
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
});

export { Header };
