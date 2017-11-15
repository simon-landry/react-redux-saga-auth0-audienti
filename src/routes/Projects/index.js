import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'components/Intl';
import BreadcrumbItem from 'components/BreadcrumbItem';

import Routes from './_routes';

export const Projects = ({ formatMessage, match: { url } }) => (
  <div>
    <BreadcrumbItem to="/projects">{formatMessage('Projects')}</BreadcrumbItem>
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
