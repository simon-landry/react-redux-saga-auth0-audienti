import { createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import { LIST_PROJECTS, CREATE_PROJECT, READ_PROJECT } from 'redux/constants';

const projectApi = restApis('projects');

export const listProjects = createApiAction(LIST_PROJECTS, projectApi.list);
export const createProject = createApiAction(CREATE_PROJECT, projectApi.create);
export const readProject = createApiAction(READ_PROJECT, projectApi.read);
