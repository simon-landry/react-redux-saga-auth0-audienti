
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import BreadcrumbItem from 'components/BreadcrumbItem';
import { selectState } from 'redux/selectors';
import { readService } from 'redux/service/actions';

export class Company extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }).isRequired,
    company: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    readCompany: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { match: { params: { userId, companyId } }, readCompany } = this.props;
    readCompany(userId, companyId);
  }

  render() {
    const { match: { params: { userId, companyId } }, company } = this.props;
    return (
      <div>
        <BreadcrumbItem to={`/users/${userId}/companies/${companyId}`}>
          {company.getIn(['attributes', 'name'])}
        </BreadcrumbItem>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('service', 'service')(state, 'service'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  readKeyword: (userId, companyId) => dispatch(readService(userId, companyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Company);
