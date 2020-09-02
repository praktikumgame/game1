import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  AuthProvider,
  PrivateRoute,
  Signup,
  Signin,
  Game,
  Header,
  Landing,
  Settings,
  NotFound,
  Leaderboard,
} from '../';
import './App.scss';

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
          <PrivateRoute path="/game" component={Game} />
          <PrivateRoute path="/leaderboard" component={Leaderboard} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </AuthProvider>
    </div>
  );
};

export { App };
