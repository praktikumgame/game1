import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  PrivateRoute,
  Signup,
  Signin,
  GameWithErrorHandler,
  Header,
  Landing,
  Settings,
  NotFound,
  Leaderboard,
} from '../';
import { AuthProvider } from '../../services/Auth';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/game" component={GameWithErrorHandler} />
          <PrivateRoute path="/leaderboard" component={Leaderboard} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </AuthProvider>
    </div>
  );
};

export { App };
