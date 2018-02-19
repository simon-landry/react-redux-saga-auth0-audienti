import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import BreadcrumbItem from 'components/BreadcrumbItem';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import ButtonLink from 'components/ButtonLink';
import HeaderTitle from 'components/HeaderTitle';
import NotificationCard from 'components/NotificationCard';
import SmartTable from 'components/SmartTable';
import { injectIntl } from 'components/Intl';
import { selectState, getRequestingSelector } from 'redux/selectors';
import { listMembers, createMember } from 'redux/member/actions';

import AddMembershipModal from './components/AddMembershipModal';

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
    ),
    listMembers: PropTypes.func.isRequired,
    membersRequesting: PropTypes.bool.isRequired,
    createMember: PropTypes.func.isRequired,
    createMemberRequesting: PropTypes.bool.isRequired,
    membersMeta: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
    }).isRequired,
  };

  static defaultProps = {
    members: [
      {
        id: '1',
      },
    ],
  }

  state = {
    createModal: false,
    addMembers: '',
  };

  componentWillMount() {
    const { match: { params: { companyId, teamId } }, listMembers } = this.props;
    listMembers(companyId, teamId);
  }

  loadPage = () => {
    const { match: { params: { companyId, teamId } }, listMembers } = this.props;
    listMembers(companyId, teamId);
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal, addMembers: '' })

  render() {
    const {
      match: { params: { companyId, teamId } },
      team,
      formatMessage,
      members,
      membersRequesting,
      createMember,
      createMemberRequesting,
      membersMeta,
    } = this.props;
    const {
      createModal,
      addMembers,
    } = this.state;
    const teamName = team.getIn(['attributes', 'name']);
    const ghost = membersRequesting || createMemberRequesting;
    const membersCount = formatMessage('{count} {count, plural, one {member} other {members}}', { count: membersMeta.get('total') });
    console.log(members.toJS());
    return (
      <div>
        <BreadcrumbItem to={`/companies/${companyId}/teams/${teamId}/members`}>
          {formatMessage('members')}
        </BreadcrumbItem>
        <BreadcrumbMenu>
          <ButtonLink className="no-border" handleClick={this.load}>
            {membersCount}
          </ButtonLink>
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Member')}
          </ButtonLink>
        </BreadcrumbMenu>
        <HeaderTitle>
          {formatMessage('Team')} {teamName}
        </HeaderTitle>
        <AddMembershipModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onSave={payload => createMember(companyId, teamId, payload)}
          teams={addMembers}
          key={addMembers}
        />
        {
          !ghost && !members.size ? (
            <NotificationCard
              icon="users"
              title={formatMessage('You do not have any members yet')}
              description={formatMessage('You can add new member.')}
            />
          ) : (
            <SmartTable
              data={members.toJS()}
              fields={[
                {
                  label: formatMessage('Created'),
                  name: 'attributes.created_at',
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
function mapStateToProps(state) {
  return {
    ...selectState('team', 'team')(state, 'team'),
    ...selectState('member', 'members')(state, 'members'),
    createMemberRequesting: getRequestingSelector('member', 'createMember')(state),
  };
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listMembers: (companyId, teamId, query) => dispatch(listMembers(companyId, teamId, query)),
  createMember: (companyId, teamId, payload) => dispatch(createMember(companyId, teamId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Members));
