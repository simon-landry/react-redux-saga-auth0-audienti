
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';

import { injectIntl } from 'components/Intl';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';
import { selectState } from 'redux/selectors';

export const CompanyDetail = ({ formatMessage, company }) => (
  <div className="animated fadeIn">
    <BreadcrumbMenu>
      {formatMessage('{count} {count, plural, one {team} other {teams}}', { count: (company.getIn(['teams', 'length']) || 0) })}
    </BreadcrumbMenu>
    <HeaderTitle>{formatMessage('Company {companyName}', { companyName: company.getIn(['attributes', 'name']) || '--' })}</HeaderTitle>
    <Card>
      <CardHeader>
        <h3 className="float-left">
          {formatMessage('Teams')}
        </h3>
      </CardHeader>
      <CardBody className="text-center">
        <CardTitle>{formatMessage('Teams let you organize work and simplify access to projects.')}</CardTitle>
        <Button outline color="secondary">
          {formatMessage('Go to Teams')}
        </Button>
      </CardBody>
    </Card>
  </div>
);

CompanyDetail.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  company: ImmutablePropTypes.mapContains({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('company', 'company')(state, 'company'),
});

export default connect(mapStateToProps)(injectIntl(CompanyDetail));
