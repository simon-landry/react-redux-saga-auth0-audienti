import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'components/Intl';
import BreadcrumbItem from 'components/BreadcrumbItem';
import SidebarItems from 'components/SidebarItems';

import Routes from './_routes';

export const ProjectDetail = ({ formatMessage, match: { url, params: { projectId } } }) => (
  <div>
    <BreadcrumbItem to={`/projects/${projectId}`}>{projectId}</BreadcrumbItem>
    <SidebarItems
      items={[
        { title: true, name: `${formatMessage('Projects')} ${projectId}` },
        {
          name: formatMessage('Keywords'),
          url: `/projects/${projectId}/keywords`,
          icon: 'fa fa-key',
        },
        {
          name: formatMessage('Segments'),
          url: `/projects/${projectId}/segments`,
          icon: 'fa fa-pie-chart',
        },
        {
          name: formatMessage('Workflows'),
          url: `/projects/${projectId}/workflows`,
          icon: 'fa fa-list',
        },
      ]}
    />
    <Routes url={url} />
  </div>
);

ProjectDetail.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default injectIntl(ProjectDetail);
