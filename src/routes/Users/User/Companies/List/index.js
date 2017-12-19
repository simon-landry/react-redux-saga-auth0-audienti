import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { injectIntl } from 'components/Intl';
import { listCompanies } from 'redux/company/actions';
import { currentUserSelector } from 'redux/auth/selectors';
import { selectState } from 'redux/selectors';

export class CompaniesList extends Component {
  static propTypes = {
    companies: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ).isRequired,
    listCompanies: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { listCompanies } = this.props;
    listCompanies();
    console.log(this.props.companies);
  }

  render() {
    return (
      <div>
        Company
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  ...selectState('company', 'companies')(state, 'companies'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listCompanies: (userId, query) => dispatch(listCompanies(userId, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompaniesList));
