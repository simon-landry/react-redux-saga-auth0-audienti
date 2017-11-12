import React from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { injectIntl } from 'components/Intl';

export const ProjectDetail = ({ formatMessage, match: { params: { projectId } } }) => (
  <div>
    <BreadcrumbsItem to={`/projects/${projectId}`}>{projectId}</BreadcrumbsItem>
    {formatMessage('Projects')} {projectId}
  </div>
);

ProjectDetail.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string
    })
  }).isRequired,
};

export default injectIntl(ProjectDetail);
