import React from 'react';
import { NavLink } from 'react-router-dom';
import { withAuth, authProps, Button } from '../';
import { authApi } from '../../services/api';
import './Header.css';

const Header = withAuth(({ isAuthorized, logout }: authProps) => {
  const logoutHandler = () => {
    authApi.logout().finally(() => logout());
  };

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
            <Button onCLickHandler={logoutHandler} buttonText={'Exit'} />
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
