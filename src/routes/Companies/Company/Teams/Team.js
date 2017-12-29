
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import BreadcrumbItem from 'components/BreadcrumbItem';
import { selectState } from 'redux/selectors';
import { readTeam } from 'redux/team/actions';

export class Team extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        teamId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }).isRequired,
    team: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    readTeam: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { match: { params: { companyId, teamId } }, readTeam } = this.props;
    readTeam(companyId, teamId);
  }

  render() {
    const { match: { params: { companyId, teamId } }, team } = this.props;
    return (
      <div>
        <BreadcrumbItem to={`/companies/${companyId}/teams/${teamId}`}>
          {team.getIn(['attributes', 'name'])}
        </BreadcrumbItem>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('team', 'team')(state, 'team'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  readTeam: (...args) => dispatch(readTeam(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
