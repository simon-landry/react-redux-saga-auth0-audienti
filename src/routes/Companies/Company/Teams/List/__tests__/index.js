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
  formatMessage: () => 'somewthing',
  match: { params: { companyId: testCompanyId } },
  teamsMeta: fromJS({}),
  company: fromJS({}),
  teams: fromJS({}),
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

// values vary from one render to another.
const testValues = [
  'whatever',
  ['whatever'],
];

test('onAddTeams of AddTeamModal triggers createTeams with proper params.', () => {
  const createTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    createTeams,
  });
  const testTeams = ['whatever', 'I do not know.'];
  const modal = component.find(AddTeamModal);
  modal.props().onAddTeams(testTeams);
  expect(createTeams).toHaveBeenCalledWith(testCompanyId, testTeams);
});

test('onAddNegativeTeams of AddTeamModal triggers createNegativeTeams with proper params.', () => {
  const createNegativeTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    createNegativeTeams,
  });
  const testTeams = ['whatever', 'I do not know.'];
  const modal = component.find(AddTeamModal);
  modal.props().onAddNegativeTeams(testTeams);
  expect(createNegativeTeams).toHaveBeenCalledWith(testCompanyId, testTeams);
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

test('sets state tags and calls listTeams when one of tags is clicked.', () => {
  const listTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listTeams,
    teamsRequesting: false,
    teams: fromJS([{}]),
  });
  const smartTable = component.find('SmartTable');
  const { fields } = smartTable.props();
  const tagsField = fields[1];
  const renderedComponent = shallow(tagsField.render(testValues[1], { id: 'rowId' })[0]);
  const tagsButton = renderedComponent.find('Button').first();
  tagsButton.simulate('click');
  expect(component.instance().state.tags).toEqual([testValues[1][0]]);
  expect(listTeams).toHaveBeenCalled();
});

test('listTeams is called and tag filter is removed when tag button is clicked on the right header .', () => {
  const listTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listTeams,
    teamsRequesting: false,
    teams: fromJS([{}]),
  });
  component.setState({ tags: ['tag1', 'tag2'] });
  const smartTable = component.find('SmartTable');
  const { headerRight } = smartTable.props();
  const firstTag = shallow(headerRight[0]);
  firstTag.simulate('click');
  expect(component).toHaveState({ tags: ['tag2'] });
  expect(listTeams).toHaveBeenCalled();
});

test('sets state pageIndex and calls listTeams when onPageChange is called.', () => {
  const listTeams = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listTeams,
    teamsRequesting: false,
    teams: fromJS([{}]),
  });
  const smartTable = component.find('SmartTable');
  const { onPageChange } = smartTable.props();
  const pageIndex = 3;
  onPageChange(pageIndex);
  expect(component).toHaveState({ pageIndex });
  expect(listTeams).toHaveBeenCalled();
});

test('AddTeamModal is open when second buttonLink of breadcrumbmenu is clicked.', () => {
  const component = shallowRenderer();
  const secondButtonLink = component.find(BreadcrumbMenu).find('ButtonLink').at(1);
  secondButtonLink.props().handleClick();
  const addTeamModal = component.find(AddTeamModal);
  expect(addTeamModal).toHaveProps({ isOpen: true });
});

test('state negative is set to true/false when third buttonLink is clicked.', () => {
  const component = shallowRenderer();
  const secondButtonLink = component.find(BreadcrumbMenu).find('ButtonLink').at(2);
  secondButtonLink.props().handleClick();
  expect(component).toHaveState({ negative: true });
  secondButtonLink.props().handleClick();
  expect(component).toHaveState({ negative: false });
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
  const smartTable = component.find('SmartTable');
  const { fields } = smartTable.props();
  const actionField = fields[fields.length - 1];
  const trashIcon = shallow(actionField.render(testId, { id: testId }));
  trashIcon.simulate('click');
  expect(setConfirmMessage).toHaveBeenCalled();
  const { action } = setConfirmMessage.calls[0].arguments[0];
  action();
  expect(removeTeam).toHaveBeenCalledWith(testCompanyId, testId);
});

test('calls setConfirmMessage when trash icon is clicked and when action is called removeNegativeTeam is triggered.', () => {
  const testId = 'testId';
  const setConfirmMessage = createSpy();
  const removeNegativeTeam = createSpy();
  const component = shallowRenderer({
    ...testProps,
    negativeTeamsRequesting: false,
    negativeTeams: fromJS([{ id: testId }]),
    setConfirmMessage,
    removeNegativeTeam,
  });
  component.instance().toggleNegative();
  const smartTable = component.find('SmartTable');
  const { fields } = smartTable.props();
  const actionField = fields[fields.length - 1];
  const trashIcon = shallow(actionField.render(testId, { id: testId }));
  trashIcon.simulate('click');
  expect(setConfirmMessage).toHaveBeenCalled();
  const { action } = setConfirmMessage.calls[0].arguments[0];
  action();
  expect(removeNegativeTeam).toHaveBeenCalledWith(testCompanyId, testId);
});

test('listTeams is called when onSearch is triggered.', () => {
  const listTeams = createSpy();
  const search = 'testValue';
  const component = shallowRenderer({
    ...testProps,
    listTeams,
  });
  const searchBox = component.find('SearchBox');
  searchBox.props().onSearch(search);
  expect(component).toHaveState({ search });
  expect(listTeams).toHaveBeenCalled();
});

test('Renders fields without problem', () => {
  const component = shallowRenderer({
    ...testProps,
    teamsRequesting: true,
  });
  const smartTable = component.find('SmartTable');
  const { fields } = smartTable.props();
  fields.forEach((field, index) => {
    if (!field.render) return;
    const renderedComponent = shallow(
      <div>
        {field.render(testValues[index], { id: 'rowId' })}
      </div>,
    );
    expect(renderedComponent).toBeA('div');
  });
});
