import generateHandleActions from 'redux/state-handler';
import { LIST_USERS, READ_USER } from 'redux/constants';

const apiStates = [
  { type: LIST_USERS, name: 'users', apiField: 'data' },
  { type: READ_USER, name: 'user', apiField: 'data', clear: true },
];

const instantStates = [];

const listValues = ['users'];

export default generateHandleActions({ apiStates, instantStates, listValues });
