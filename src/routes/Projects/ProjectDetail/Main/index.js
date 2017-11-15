
import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'components/Intl';
import BreadcrumbMenu from 'components/BreadcrumbMenu';

export const Main = ({ formatMessage, match: { params: { projectId } } }) => (
  <div>
    <BreadcrumbMenu>{formatMessage('Projects')} {projectId}</BreadcrumbMenu>
    {formatMessage('Projects')} {projectId}
  </div>
);

Main.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(Main);
