import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withPreload } from '../../services/auth/helpers/withPreload';
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
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/settings" component={Settings} />
        <Route path="/game" component={GameWithErrorHandler} />
        <PrivateRoute path="/leaderboard" component={Leaderboard} />
        <Route path="/notfound" component={NotFound} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
};

const withPreloadApp = withPreload(App);

export { withPreloadApp as App };
