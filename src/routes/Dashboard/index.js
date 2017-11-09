import React from 'react';

import { injectIntl } from 'components/Intl';

export const Dashboard = ({ formatMessage }) => (
  <div>
    <h1>{formatMessage('Dashboard')}</h1>
  </div>
);

export default injectIntl(Dashboard);
