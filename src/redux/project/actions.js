import { createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import { LIST_PROJECTS } from 'redux/constants';

const projectApi = restApis('projects');

export const listProjects = createApiAction(LIST_PROJECTS, projectApi.list);
