import React from 'react';
import generateHandleActions from 'redux/state-handler';
import {
  SET_BREADCRUMB_MENU,
  CLEAR_BREADCRUMB_MENU,
  SET_SIDEBAR_ITEMS,
  CLEAR_SIDEBAR_ITEMS,
} from 'redux/constants';

const apiStates = [];
const instantStates = [
  { type: SET_BREADCRUMB_MENU, name: 'breadcrumbMenu', defaultValue: <div /> },
  { type: CLEAR_BREADCRUMB_MENU, name: 'breadcrumbMenu' },
  { type: SET_SIDEBAR_ITEMS, name: 'sidebarItems', kind: 'object' },
  { type: CLEAR_SIDEBAR_ITEMS, name: 'sidebarItems', kind: 'object' },
];
const listValues = ['sidebarItems'];

export default generateHandleActions({ apiStates, instantStates, listValues });
