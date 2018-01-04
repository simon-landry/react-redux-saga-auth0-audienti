import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';

import { TeamsList } from '../index';
import AddTeamModal from '../components/AddTeamModal';

const { expect, shallow, createSpy } = testHelper;
const testCompanyId = 'testCompany';
const testProps = {
  formatMessage: () => 'something',
  match: { params: { companyId: testCompanyId } },
  teamsMeta: fromJS({}),
  company: fromJS({}),
  teams: fromJS([]),
  listTeams: noop,
  createTeams: noop,
  setConfirmMessage: noop,
  removeTeam: noop,
  createTeamsRequesting: false,
  removeTeamRequesting: false,
  teamsRequesting: false,
};

const shallowRenderer = (props = testProps) =>
  shallow(<TeamsList {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbMenu.', () => {
  const component = shallowRenderer();
  expect(component).toContain(BreadcrumbMenu);
});

test('Renders a HeaderTitle.', () => {
  const component = shallowRenderer();
  expect(component).toContain(HeaderTitle);
});

test('Renders a AddTeamModal.', () => {
  const component = shallowRenderer();
  expect(component).toContain(AddTeamModal);
});

test('Renders a SmartItemGroup when prop teams is not empty.', () => {
  const component = shallowRenderer({
    ...testProps,
    teams: fromJS([{}]),
  });
  expect(component).toContain('SmartItemGroup');
});

test('Renders a NotificationCard when prop teams is empty.', () => {
  const component = shallowRenderer();
  expect(component).toContain('NotificationCard');
});

test('onAddTeams of AddTeamModal triggers createTeams with proper params.', () => {
  const createTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    createTeams,
  });
  const testTeams = ['whatever', 'I do not know.'];
  const modal = component.find(AddTeamModal);
  modal.props().onSave(testTeams);
  expect(createTeams).toHaveBeenCalledWith(testCompanyId, testTeams);
});

test('listTeams is called.', () => {
  const listTeams = createSpy();
  shallowRenderer({
    ...testProps,
    listTeams,
  });
  expect(listTeams).toHaveBeenCalled();
});

test('listTeams is called when createTeams request is successful.', () => {
  const listTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listTeams,
    createTeamsRequesting: true,
  });
  component.setProps({ createTeamsRequesting: false });
  expect(listTeams).toHaveBeenCalled();
});

test('listTeams is not called when createTeamsReqesting was not true.', () => {
  let listTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listTeams,
    createTeamsRequesting: false,
  });
  listTeams = createSpy();
  component.setProps({ listTeams });
  expect(listTeams).toNotHaveBeenCalled();
});

test('listTeams is called when removeTeam request is successful.', () => {
  const listTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listTeams,
    removeTeamRequesting: true,
  });
  component.setProps({ removeTeamRequesting: false });
  expect(listTeams).toHaveBeenCalled();
});

test('listTeams is not called when removeTeamRequesting was not true.', () => {
  const component = shallowRenderer({
    ...testProps,
    removeTeamRequesting: false,
  });
  const listTeams = createSpy();
  component.setProps({ listTeams });
  expect(listTeams).toNotHaveBeenCalled();
});

test('AddTeamModal is open when second buttonLink of breadcrumbmenu is clicked.', () => {
  const component = shallowRenderer();
  const secondButtonLink = component.find(BreadcrumbMenu).find('ButtonLink').at(1);
  secondButtonLink.props().handleClick();
  const addTeamModal = component.find(AddTeamModal);
  expect(addTeamModal).toHaveProps({ isOpen: true });
});

test('calls setConfirmMessage when trash icon is clicked and when action is called removeTeam is triggered.', () => {
  const testId = 'testId';
  const setConfirmMessage = createSpy();
  const removeTeam = createSpy();
  const component = shallowRenderer({
    ...testProps,
    teamsRequesting: false,
    teams: fromJS([{ id: testId }]),
    setConfirmMessage,
    removeTeam,
  });
  const smartItemGroup = component.find('SmartItemGroup');
  const { remove } = smartItemGroup.props();
  remove(testCompanyId, testId);
  expect(setConfirmMessage).toHaveBeenCalled();
  const { action } = setConfirmMessage.calls[0].arguments[0];
  action();
  expect(removeTeam).toHaveBeenCalledWith(testCompanyId, testId);
});

test('onSearch triggers a list state function with current companyId as a param.', () => {
  const listTeams = createSpy();
  // const search = '';
  const component = shallowRenderer({
    ...testProps,
    listTeams,
  });
  const searchBox = component.find('SearchBox');
  console.log(searchBox);
  // searchBox.props().onSearch(search);
  // expect(component).toHaveState({ search });
  // expect(listTeams).toHaveBeenCalledWith({ testCompanyId, search });
});

test('listTeams is called when loadPage is triggered.', () => {
  const listTeams = createSpy();
  expect(listTeams).toHaveBeenCalled();
});
