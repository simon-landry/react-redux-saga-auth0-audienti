import React from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Link } from 'react-router-dom';

import { injectIntl } from 'components/Intl';

import Routes from './_routes';

export const Projects = ({ formatMessage, match: { url } }) => (
  <div>
    <BreadcrumbsItem to="/projects">{formatMessage('Projects')}</BreadcrumbsItem>
    <h1>{formatMessage('Projects')}</h1>
    <Routes url={url} />
  </div>
);

Projects.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default injectIntl(Projects);
