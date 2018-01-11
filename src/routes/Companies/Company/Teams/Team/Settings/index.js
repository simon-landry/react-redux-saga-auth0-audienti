
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
  CardFooter,
} from 'reactstrap';

import Serializer from 'helpers/form-serialize';
import BreadcrumbItem from 'components/BreadcrumbItem';
import HeaderTitle from 'components/HeaderTitle';
import Select from 'components/Select';
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
    updateTeam: PropTypes.func.isRequired,
    teamRequesting: PropTypes.bool.isRequired,
    formatMessage: PropTypes.func.isRequired,
  };

  state = { teamName: '', teamDescription: '' };

  componentWillMount() {
    const { match: { params: { companyId, teamId } }, readTeam } = this.props;
    readTeam(companyId, teamId);
  }

  componentWillReceiveProps({ team }) {
    this.setState({
      teamName: team.getIn(['attributes', 'name']),
      teamDescription: team.getIn(['attributes', 'description']) || '',
    });
  }

  onTeamNameChange = ({ target: { value } }) => this.setState({ teamName: value });

  onTeamDescriptionChange = ({ target: { value } }) => this.setState({ teamDescription: value });

  render() {
    const {
      match: { params: { companyId, teamId } },
      team,
      updateTeam,
      teamRequesting,
      formatMessage,
    } = this.props;
    const { teamDescription } = this.state;
    const teamName = team.getIn(['attributes', 'name']);
    return (
      <div>
        <BreadcrumbItem to={`/companies/${companyId}/teams/${teamId}/settings`}>
          {formatMessage('settings')}
        </BreadcrumbItem>
        <HeaderTitle>
          {formatMessage('Team')} {teamName}
        </HeaderTitle>
        <Card>
          <CardHeader>
            {formatMessage('Team settings')}
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
              <FormGroup>
                <Label htmlFor="description"><h5>{formatMessage('Description')}</h5></Label>
                <Input type="text" name="description" value={teamDescription} onChange={this.onTeamDescriptionChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description"><h5>{formatMessage('Parent team')}</h5></Label>
                <Select
                  options={[
                    { value: 10, label: 'team1' },
                    { value: 11, label: 'team2' },
                    { value: 12, label: 'team3' },
                    { value: 23, label: 'team4' },
                    { value: 24, label: 'team5' },
                  ]}
                  name="parentTeam"
                  defaultValue={formatMessage('Select parent team')}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description"><h5>{formatMessage('Team visibility')}</h5></Label>
                <Select
                  options={[
                    { value: 10, label: 'team1' },
                    { value: 11, label: 'team2' },
                    { value: 12, label: 'team3' },
                    { value: 23, label: 'team4' },
                    { value: 24, label: 'team5' },
                  ]}
                  name="parentTeam"
                  defaultValue={formatMessage('Select parent team')}
                />
              </FormGroup>
              <Button type="submit" color="primary" disabled={teamRequesting}>{formatMessage('Save Changes')}</Button>
            </Form>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Label className="text-danger">{formatMessage('Danger zone')}</Label>
          </CardHeader>
          <CardBody>
            <Label>{formatMessage('Delete this team')}</Label> <br />
            <Label>{formatMessage('Once deleted, it will be gone forever. Please be certain.')}</Label> <br />
          </CardBody>
          <CardFooter>
            <Button type="submit" color="danger">{formatMessage('Delete this team')}</Button>
          </CardFooter>
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
