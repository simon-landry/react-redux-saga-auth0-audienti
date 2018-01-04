import { createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import { LIST_TEAMS, CREATE_TEAMS, READ_TEAM, REMOVE_TEAM } from 'redux/constants';

const teamApi = restApis('companies', 'teams');

export const listTeams = createApiAction(LIST_TEAMS, teamApi.list);
export const readTeam = createApiAction(READ_TEAM, teamApi.read);
export const removeTeam = createApiAction(REMOVE_TEAM, teamApi.remove);
export const createTeams = createApiAction(
  CREATE_TEAMS, teamApi.create, { title: 'Success', detail: 'Teams are created successfully' },
);
