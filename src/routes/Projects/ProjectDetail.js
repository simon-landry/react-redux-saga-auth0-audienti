import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbItem from 'components/BreadcrumbItem';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import { injectIntl } from 'components/Intl';

export const ProjectDetail = ({ formatMessage, match: { params: { projectId } } }) => (
  <div>
    <BreadcrumbItem to={`/projects/${projectId}`}>{projectId}</BreadcrumbItem>
    <BreadcrumbMenu>Project</BreadcrumbMenu>
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
