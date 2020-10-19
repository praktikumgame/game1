import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { clearCookie } from '../../redux/auth/actions';
import { Button } from '../';
import { withAuth, withAuthProps } from '../../services/auth';
import './Header.css';

const Header = withAuth(({ isAuthorized }: withAuthProps) => {
  const dispatch = useDispatch();
  return (
    <header className="header">
      <Link className="link header__logo-link" to="/">
        Game logo
      </Link>
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
            <Button onClick={() => dispatch(clearCookie())} buttonText={'Exit'} />
          </>
        ) : (
          <>
            <NavLink className="link header__link" to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="link header__link" to="/signin">
              Sign In
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
});

export { Header };
