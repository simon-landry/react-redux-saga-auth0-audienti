import { createAction, createClearAction } from 'redux/redux-actions';
import {
  SET_BREADCRUMB_MENU,
  CLEAR_BREADCRUMB_MENU,
  SET_SIDEBAR_ITEMS,
  CLEAR_SIDEBAR_ITEMS,
} from 'redux/constants';

export const setBreadcrumbMenu = createAction(SET_BREADCRUMB_MENU);
export const clearBreadcrumbMenu = createClearAction(CLEAR_BREADCRUMB_MENU);

export const setSidebarItems = createAction(SET_SIDEBAR_ITEMS);
export const clearSidebarItems = createClearAction(CLEAR_SIDEBAR_ITEMS);
