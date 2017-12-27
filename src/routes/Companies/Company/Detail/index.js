
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { injectIntl } from 'components/Intl';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';
import ButtonLink from 'components/ButtonLink';
import { selectState } from 'redux/selectors';

export const CompanyDetail = ({ formatMessage, match: { params: { companyId } }, company }) => (
  <div className="animated fadeIn">
    <BreadcrumbMenu>
      {formatMessage('{count} {count, plural, one {team} other {teams}}', { count: (company.getIn(['teams', 'length']) || 0) })}
      <ButtonLink className="no-border" handleClick={console.log} icon="fa fa-gear">
        {formatMessage('Settings')}
      </ButtonLink>
    </BreadcrumbMenu>
    <HeaderTitle>{formatMessage('Company {companyName}', { companyName: company.getIn(['attributes', 'name']) || '--' })}</HeaderTitle>
    {formatMessage('Companies')} {companyId}
  </div>
);

CompanyDetail.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  company: ImmutablePropTypes.mapContains({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('company', 'company')(state, 'company'),
});

export default connect(mapStateToProps)(injectIntl(CompanyDetail));
