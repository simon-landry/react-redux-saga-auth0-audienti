import React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const BreadcrumbItem = ({ children, to }) => (
  <BreadcrumbsItem to={to} className="breadcrumb-item">{children}</BreadcrumbsItem>
);

export default BreadcrumbItem;
