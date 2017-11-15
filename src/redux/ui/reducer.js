import React from 'react';
import generateHandleActions from 'redux/state-handler';
import { SET_BREADCRUMB_MENU, CLEAR_BREADCRUMB_MENU } from 'redux/constants';

const apiStates = [];
const instantStates = [
  { type: SET_BREADCRUMB_MENU, name: 'breadcrumbMenu', defaultValue: <div /> },
  { type: CLEAR_BREADCRUMB_MENU, name: 'breadcrumbMenu' },
];
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, listValues });
