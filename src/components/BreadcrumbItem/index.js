import React from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const BreadcrumbItem = ({ children, to }) => (
  <BreadcrumbsItem to={to} className="breadcrumb-item">{children}</BreadcrumbsItem>
);

BreadcrumbItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default BreadcrumbItem;
