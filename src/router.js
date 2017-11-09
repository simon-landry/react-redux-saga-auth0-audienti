import React from 'react';
import { noop } from 'lodash';
import { BrowserRouter, IndexRoute, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from 'routes/Dashboard';
import Page404 from 'routes/Page404';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Redirect exact path="/" to="/dashboard" />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default Router;
