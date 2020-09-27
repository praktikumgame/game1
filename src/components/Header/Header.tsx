import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/actions';
import { Button } from '../';
import { withAuth, withAuthProps } from '../../services/auth';

import './Header.css';

const Header = withAuth(({ isAuthorized }: withAuthProps) => {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <NavLink className="link header__logo-link" to="/">
        Game logo
      </NavLink>
      <nav className="header__nav">
        {isAuthorized ? (
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
            <Button onClick={() => dispatch(logout())} buttonText={'Exit'} />
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
