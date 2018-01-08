
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import Serializer from 'helpers/form-serialize';
import BreadcrumbItem from 'components/BreadcrumbItem';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';
import { injectIntl } from 'components/Intl';
import { selectState } from 'redux/selectors';
import { readTeam, updateTeam } from 'redux/team/actions';

export class Settings extends Component {
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
    teamRequesting: PropTypes.bool.isRequired,
    formatMessage: PropTypes.func.isRequired,
  };

  state = { teamName: '' };

  componentWillMount() {
    const { match: { params: { companyId, teamId } }, readTeam } = this.props;
    readTeam(companyId, teamId);
  }

  componentWillReceiveProps({ team }) {
    this.setState({
      teamName: team.getIn(['attributes', 'name']),
    });
  }

  onTeamNameChange = ({ target: { value } }) => this.setState({ teamName: value });

  render() {
    const {
      match: { params: { companyId, teamId } },
      team,
      teamRequesting,
      formatMessage,
    } = this.props;
    const teamName = team.getIn(['attributes', 'name']);
    return (
      <div>
        <BreadcrumbItem to={`/companies/${companyId}/teams/${teamId}/settings`}>
          {formatMessage('settings')}
        </BreadcrumbItem>
        <HeaderTitle>
          {formatMessage('Team')} {teamName}
        </HeaderTitle>
        <BreadcrumbMenu>
          {formatMessage('{count} {count, plural, one {team} other {members}}', { count: (team.getIn(['members', 'length']) || 0) })}
        </BreadcrumbMenu>
        <Card>
          <CardHeader>
            {formatMessage('Team Information')}
          </CardHeader>
          <CardBody>
            <Form onSubmit={(e) => {
              e.preventDefault();
              updateTeam(
                companyId,
                teamId,
                {
                  ...Serializer.serialize(e.target, { hash: true }),
                },
              );
            }}>
              <FormGroup>
                <Label htmlFor="name"><h5>{formatMessage('Team Name')}</h5></Label>
                <Input type="text" name="name" value={this.state.teamName} onChange={this.onTeamNameChange} required />
              </FormGroup>
              <Button type="submit" color="primary" disabled={teamRequesting}>{formatMessage('Save Team')}</Button>
            </Form>
          </CardBody>
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Settings));
