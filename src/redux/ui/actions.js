import { createAction, createClearAction } from 'redux/redux-actions';
import { SET_BREADCRUMB_MENU, CLEAR_BREADCRUMB_MENU } from '../constants';

export const setBreadcrumbMenu = createAction(SET_BREADCRUMB_MENU);
export const clearBreadcrumbMenu = createClearAction(CLEAR_BREADCRUMB_MENU);
