import generateHandleActions from 'redux/state-handler';
import { LIST_PROJECTS } from 'redux/constants';

const apiStates = [
  { type: LIST_PROJECTS, name: 'projects', apiField: 'data' },
];

const instantStates = [];

const listValues = ['projects'];

export default generateHandleActions({ apiStates, instantStates, listValues });
