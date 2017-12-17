import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'components/Intl';
import BreadcrumbItem from 'components/BreadcrumbItem';
import Routes from './_routes';

export const Companies = ({ formatMessage, match: { params: { userId } } }) => (
  <div>
    <BreadcrumbItem to={`/users/${userId}/companies`}>
      {formatMessage('Companies')}
    </BreadcrumbItem>
    <Routes url="/users/:userId/companies" />
  </div>
);

Companies.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(Companies);
