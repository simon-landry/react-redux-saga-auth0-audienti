/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Detail from './Detail';

const Routes = ({ url }) => (
  <div>
    <Switch>
      <Route exact path={url} component={Detail} />
    </Switch>
  </div>
);

Routes.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Routes;
