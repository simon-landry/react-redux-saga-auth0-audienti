import generateHandleActions from 'redux/state-handler';
import { LIST_TEAMS, CREATE_TEAMS, READ_TEAM, REMOVE_TEAM } from 'redux/constants';

const apiStates = [
  { type: LIST_TEAMS, name: 'teams', apiField: 'data' },
  { type: CREATE_TEAMS, name: 'createTeams' },
  { type: READ_TEAM, name: 'team', apiField: 'data', clear: true },
  { type: REMOVE_TEAM, name: 'removeTeam' },
];

const instantStates = [];

const listValues = ['teams'];

export default generateHandleActions({ apiStates, instantStates, listValues });
