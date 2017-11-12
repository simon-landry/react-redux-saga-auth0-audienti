/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import ProjectDetail from './ProjectDetail';

const Routes = ({ url }) => (
  <div>
    <Switch>
      <Route exact path={url} component={Main} />
      <Route path={`${url}/:projectId`} component={ProjectDetail} />
    </Switch>
  </div>
);

Routes.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Routes;
