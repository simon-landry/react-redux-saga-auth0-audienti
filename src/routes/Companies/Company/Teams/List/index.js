import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { injectIntl } from 'components/Intl';
import { selectState, getRequestingSelector } from 'redux/selectors';
import { listTeams, createTeams, removeTeam } from 'redux/team/actions';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import ButtonLink from 'components/ButtonLink';
import HeaderTitle from 'components/HeaderTitle';
import SmartItemGroup from 'components/SmartItemGroup';
import NotificationCard from 'components/NotificationCard';
import SearchBox from 'components/SearchBox';

import AddTeamModal from './components/AddTeamModal';
import TeamCard from './components/TeamCard';
import TeamCardGhost from './components/TeamCardGhost';
import { setConfirmMessage } from '../../../../../redux/ui/actions';

export class TeamsList extends Component {
  static propTypes = {
    formatMessage: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }).isRequired,
    teamsMeta: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
    }).isRequired,
    company: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    teams: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ).isRequired,
    listTeams: PropTypes.func.isRequired,
    createTeams: PropTypes.func.isRequired,
    setConfirmMessage: PropTypes.func.isRequired,
    removeTeam: PropTypes.func.isRequired,
    createTeamsRequesting: PropTypes.bool.isRequired,
    removeTeamRequesting: PropTypes.bool.isRequired,
    teamsRequesting: PropTypes.bool.isRequired,
  };

  state = {
    createModal: false,
    addTeams: '',
    createRequesting: 'createTeamsRequesting',
    removeRequesting: 'removeTeamRequesting',
  };

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    const { createRequesting, removeRequesting } = this.state;
    if (!nextProps[createRequesting] && this.props[createRequesting]) {
      this.load();
    } else if (!nextProps[removeRequesting] && this.props[removeRequesting]) {
      this.load();
    }
  }

  onSearch = (value) => {
    const { match: { params: { companyId } }, listTeams } = this.props;
    listTeams(companyId, { 'page[number]': 1, search: value });
  }

  load = () => {
    const { match: { params: { companyId } }, listTeams } = this.props;
    listTeams(companyId);
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal, addTeams: '' })

  loadPage = () => {
    const { match: { params: { companyId } }, listTeams } = this.props;
    listTeams(companyId);
  }

  render() {
    const {
      formatMessage,
      teamsMeta,
      company,
      teams,
      createTeams,
      match: { params: { companyId } },
      setConfirmMessage,
      createTeamsRequesting,
      removeTeamRequesting,
      teamsRequesting,
      removeTeam,
    } = this.props;
    const {
      createModal,
      addTeams,
    } = this.state;
    const teamsCount = formatMessage('{count} {count, plural, one {team} other {teams}}', { count: teamsMeta.get('total') });
    const ghost = teamsRequesting || createTeamsRequesting || removeTeamRequesting;
    const ItemComponent = props =>
      (ghost ? <TeamCardGhost /> : <TeamCard {...props} companyId={companyId} />);
    return (
      <div className="animated fadeIn">
        <Helmet
          title={formatMessage('Teams')}
          meta={[
            { name: 'description', content: formatMessage('This is a page to list all teams.') },
          ]}
        />
        <BreadcrumbMenu>
          <SearchBox onSearch={this.onSearch} />
          <ButtonLink className="no-border" handleClick={this.load}>
            {teamsCount}
          </ButtonLink>
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Team')}
          </ButtonLink>
        </BreadcrumbMenu>
        <HeaderTitle>
          {formatMessage(
            'All Teams of Company {companyName}',
            { companyName: company.getIn(['attributes', 'name']) || '--' },
          )}
        </HeaderTitle>
        <AddTeamModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onSave={payload => createTeams(companyId, payload)}
          teams={addTeams}
          key={addTeams}
        />
        {
          !ghost && !teams.size ? (
            <NotificationCard
              icon="users"
              title={formatMessage('You have not added any teams yet')}
              description={formatMessage('You can create a new team.')}
            />
          ) : (
            <SmartItemGroup
              data={teams.toJS()}
              ItemComponent={ItemComponent}
              total={teamsMeta.get('total')}
              onPageChange={this.loadPage}
              ghost={ghost}
              checkable
              companyPagination
              remove={(companyId, teamId) => setConfirmMessage({
                title: formatMessage('Remove Team'),
                message: formatMessage('Are you sure you want to remove the team?'),
                action: () => removeTeam(companyId, teamId),
              })}
            />
          )
        }
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('company', 'company')(state, 'company'),
  ...selectState('team', 'teams')(state, 'teams'),
  createTeamsRequesting: getRequestingSelector('team', 'createTeams')(state),
  removeTeamRequesting: getRequestingSelector('team', 'removeTeam')(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listTeams: (companyId, query) => dispatch(listTeams(companyId, query)),
  createTeams: (companyId, payload) => dispatch(createTeams(companyId, payload)),
  setConfirmMessage: payload => dispatch(setConfirmMessage(payload)),
  removeTeam: (companyId, teamId) => dispatch(removeTeam(companyId, teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TeamsList));
