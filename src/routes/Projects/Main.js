import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { injectIntl } from 'components/Intl';

export const Main = ({ formatMessage }) => (
  <div>
    {
      new Array(10).fill(0).map((_, index) => (
        <div key={index}>
          <Link to={`/projects/${index + 1}`}>
            {formatMessage('Projects')} {index + 1}
          </Link>
        </div>
      ))
    }
  </div>
);

Main.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export default injectIntl(Main);
