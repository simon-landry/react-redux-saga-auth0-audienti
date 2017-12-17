import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl } from 'components/Intl';
import { listCompanies } from 'redux/company/actions';
import { currentUserSelector } from 'redux/auth/selectors';

export class CompaniesList extends Component {
  static propTypes = {
    listCompanies: PropTypes.func.isRequired,
    currentUser: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  };

  componentWillMount() {
    const { listCompanies, currentUser } = this.props;
    listCompanies();
    console.log(currentUser);
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
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listCompanies: (userId, query) => dispatch(listCompanies(userId, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompaniesList));
