import React from 'react';
import { noop } from 'lodash';
import { BrowserRouter, IndexRoute, Route, Switch, Redirect } from 'react-router-dom';
import AuthorizationHandler from 'components/AuthorizationHandler';
import App from 'components/App';
import Callback from 'routes/Callback';
import Dashboard from 'routes/Dashboard';
import Page404 from 'routes/Page404';

const AuthorizedRoutes = props => (
  <AuthorizationHandler {...props}>
    <App>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect exact path="/" to="/dashboard" />
        <Route path="*" component={Page404} />
      </Switch>
    </App>
  </AuthorizationHandler>
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/callback" component={Callback} />
      <Route path="/" component={AuthorizedRoutes} />
    </Switch>
  </BrowserRouter>
);

export default Router;
