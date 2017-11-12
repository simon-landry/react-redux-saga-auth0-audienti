import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Breadcrumbs } from 'react-breadcrumbs-dynamic';

import { clearAuthToken } from 'redux/auth/actions';

export const App = ({ children, clearAuthToken }) => (
  <div>
    <button onClick={() => {
      clearAuthToken();
    }}>
      Logout
    </button>
    <br /><br />
    <Breadcrumbs
      separator={<b> > </b>}
      item={NavLink}
      finalItem="b"
      finalProps={{
        style: { color: 'black' }
      }}
    />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  clearAuthToken: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearAuthToken: () => dispatch(clearAuthToken())
});

export default connect(undefined, mapDispatchToProps)(App);
