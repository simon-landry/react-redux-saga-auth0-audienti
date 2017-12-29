
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { injectIntl } from 'components/Intl';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';
import { selectState } from 'redux/selectors';

export const CompanyDetail = ({ formatMessage, match: { params: { companyId } }, company }) => (
  <Row>
    <Col xs="12" sm="6" md="4">
      <div className="animated fadeIn">
        <BreadcrumbMenu>
          {formatMessage('{count} {count, plural, one {team} other {teams}}', { count: (company.getIn(['teams', 'length']) || 0) })}
        </BreadcrumbMenu>
        <HeaderTitle>{formatMessage('Company {companyName}', { companyName: company.getIn(['attributes', 'name']) || '--' })}</HeaderTitle>
        <Card>
          <CardHeader className="team-card-header">
            <h3 className="float-left">
              {formatMessage('Teams')}
            </h3>
          </CardHeader>
          <CardBody className="team-card-body">
            <CardTitle className="title">
              {formatMessage('Teams let you organize work and simplify access to projects.')}
            </CardTitle>
          </CardBody>
          <CardFooter className="team-card-footer">
            <Link to={`/companies/${companyId}/teams`}>
              <Button outline color="secondary">
                {formatMessage('Go to Teams')}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Col>
  </Row>
);

CompanyDetail.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  company: ImmutablePropTypes.mapContains({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('company', 'company')(state, 'company'),
});

export default connect(mapStateToProps)(injectIntl(CompanyDetail));
