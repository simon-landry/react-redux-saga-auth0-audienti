import React from 'react';

import { injectIntl } from 'components/Intl';

const Page404 = ({ formatMessage }) => (
  <div>
    <h1>{formatMessage('Not Found')}</h1>
    <h2>{formatMessage('This page is not built. Please check your url again.')}</h2>
  </div>
);

export default injectIntl(Page404);
