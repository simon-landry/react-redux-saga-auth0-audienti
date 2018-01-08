
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import BreadcrumbItem from 'components/BreadcrumbItem';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';
import { injectIntl } from 'components/Intl';
import { selectState } from 'redux/selectors';
import { readTeam, updateTeam } from 'redux/team/actions';

export class Projects extends Component {
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
    formatMessage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { match: { params: { companyId, teamId } }, readTeam } = this.props;
    readTeam(companyId, teamId);
  }

  render() {
    const {
      match: { params: { companyId, teamId } },
      team,
      formatMessage,
    } = this.props;
    const teamName = team.getIn(['attributes', 'name']);
    return (
      <div>
        <BreadcrumbItem to={`/companies/${companyId}/teams/${teamId}/projects`}>
          {formatMessage('projects')}
        </BreadcrumbItem>
        <HeaderTitle>
          {formatMessage('Team')} {teamName}
        </HeaderTitle>
        <BreadcrumbMenu>
          {formatMessage('{count} {count, plural, one {team} other {members}}', { count: (team.getIn(['members', 'length']) || 0) })}
        </BreadcrumbMenu>
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
  readTeam: (companyId, teamId) => dispatch(readTeam(companyId, teamId)),
  updateTeam: (companyId, teamId, payload) =>
    dispatch(updateTeam(companyId, teamId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Projects));
