import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthProviderWithRouter, PrivateRoute, Signup, Signin, Game, Header, Landing, Settings, NotFound } from '../';

import './App.scss';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <AuthProviderWithRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/settings" component={Settings} />
          <PrivateRoute path="/game" component={Game} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </AuthProviderWithRouter>
    </div>
  );
};

export { App };
