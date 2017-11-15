import React, { Component } from 'react';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { injectIntl } from 'components/Intl';

export class Header extends Component {
  sidebarToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
    const { formatMessage } = this.props;
    const navItems = [
      { label: formatMessage('Dashboard'), to: '/dashboard' },
      { label: formatMessage('Users'), to: '/users' },
      { label: formatMessage('Settings'), to: '/settings' },
    ];
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          {
            navItems.map((navItem, index) => (
              <NavItem className="px-3" key={index}>
                <NavLink className="nav-link" to={navItem.to}>{navItem.label}</NavLink>
              </NavItem>
            ))
          }
        </Nav>
        <Nav className="ml-auto" navbar />
      </header>
    );
  }
}

export default injectIntl(Header);
