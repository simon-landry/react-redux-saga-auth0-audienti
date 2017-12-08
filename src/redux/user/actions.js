import { createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import { LIST_USERS, READ_USER } from 'redux/constants';

const userApi = restApis('users');

export const listProjects = createApiAction(LIST_USERS, userApi.list);
export const readProject = createApiAction(READ_USER, userApi.read);
