import generateHandleActions from 'redux/state-handler';
import { LIST_AGENT_TYPES } from 'redux/constants';

const apiStates = [
  { type: LIST_AGENT_TYPES, name: 'agentTypes', apiField: 'data.attributes.agents' },
];

const instantStates = [];

const listValues = ['agentTypes'];

export default generateHandleActions({ apiStates, instantStates, listValues });
