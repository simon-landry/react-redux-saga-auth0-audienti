import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import BreadcrumbItem from 'components/BreadcrumbItem';
import HeaderTitle from 'components/HeaderTitle';
import NotificationCard from 'components/NotificationCard';
import SmartTable from 'components/SmartTable';
import { injectIntl } from 'components/Intl';
import { selectState, getRequestingSelector } from 'redux/selectors';
import { listMembers } from 'redux/member/actions';

export class Members extends Component {
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
    formatMessage: PropTypes.func.isRequired,
    members: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ).isRequired,
    listMembers: PropTypes.func.isRequired,
    membersRequesting: PropTypes.bool.isRequired,
    createMemberRequesting: PropTypes.bool.isRequired,
    membersMeta: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
    }).isRequired,
  };

  componentWillMount() {
    const { match: { params: { companyId, teamId } }, listMembers } = this.props;
    listMembers(companyId, teamId);
  }

  loadPage = () => {
    const { match: { params: { companyId, teamId } }, listMembers } = this.props;
    listMembers(companyId, teamId);
  }

  render() {
    const {
      match: { params: { companyId, teamId } },
      team,
      formatMessage,
      members,
      membersRequesting,
      createMemberRequesting,
      membersMeta,
    } = this.props;
    const teamName = team.getIn(['attributes', 'name']);
    const ghost = membersRequesting || createMemberRequesting;
    console.log('members', members.toJS());
    return (
      <div>
        <BreadcrumbItem to={`/companies/${companyId}/teams/${teamId}/members`}>
          {formatMessage('members')}
        </BreadcrumbItem>
        <HeaderTitle>
          {formatMessage('Team')} {teamName}
        </HeaderTitle>
        {
          !ghost && !members.size ? (
            <NotificationCard
              icon="users"
              title={formatMessage('You have not added any members yet')}
              description={formatMessage('You can add new member.')}
            />
          ) : (
            <SmartTable
              data={members.toJS()}
              fields={[
                {
                  label: formatMessage('Member'),
                  name: 'attributes.name',
                  render: (() => (
                    <span>
                      {formatMessage('members', { count: 0 })}
                    </span>
                  )),
                },
              ]}
              ghost={ghost}
              actions={[]}
              onPageChange={this.loadPage}
              total={membersMeta.get('total')}
              checkable
            />
          )
        }
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('team', 'team')(state, 'team'),
  ...selectState('member', 'members')(state, 'members'),
  createTeamRequesting: getRequestingSelector('team', 'createTeam')(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listMembers: (companyId, teamId, query) => dispatch(listMembers(companyId, teamId, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Members));
