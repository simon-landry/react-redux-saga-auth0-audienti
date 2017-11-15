import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { clearAuthToken } from 'redux/auth/actions';
import { clearBreadcrumbMenu } from 'redux/ui/actions';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Breadcrumb from 'components/Breadcrumb';

export class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    clearAuthToken: PropTypes.func.isRequired,
    clearBreadcrumbMenu: PropTypes.func.isRequired,
  };

  componentWillReceiveProps({ clearBreadcrumbMenu }) {
    clearBreadcrumbMenu();
  }
  render() {
    const { children, clearAuthToken, ...props } = this.props;
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              {children}
            </Container>
          </main>
        </div>
        <button onClick={() => {
            clearAuthToken();
          }}>
            Logout
        </button>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearAuthToken: () => dispatch(clearAuthToken()),
  clearBreadcrumbMenu: () => dispatch(clearBreadcrumbMenu()),
});

export default connect(undefined, mapDispatchToProps)(App);
