import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbItem from 'components/BreadcrumbItem';
import HeaderTitle from 'components/HeaderTitle';

import { Members } from '../index';

const { expect, shallow, createSpy } = testHelper;

const testCompanyId = 'testCompany';
const testTeamId = 'testTeam';
const testProps = {
  match: {
    params: {
      companyId: testCompanyId,
      teamId: testTeamId,
    },
  },
  team: fromJS({
    attributes: {
      id: testTeamId,
      name: 'testName',
    },
  }),
  teamRequesting: false,
  updateTeam: noop,
  formatMessage: noop,
  members: fromJS([]),
  listMembers: noop,
  membersRequesting: false,
  createMemberRequesting: false,
  membersMeta: fromJS({}),
};

const shallowRenderer = (props = testProps) =>
  shallow(<Members {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbItem', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb).toHaveProps({ to: `/companies/${testCompanyId}/teams/${testTeamId}/members` });
});

test('Renders a HeaderTitle', () => {
  const component = shallowRenderer();
  expect(component).toContain(HeaderTitle);
});

test('listMembers is called.', () => {
  const listMembers = createSpy();
  shallowRenderer({
    ...testProps,
    listMembers,
  });
  expect(listMembers).toHaveBeenCalled();
});

test('listMembers is not called when createMemberReqesting was not true.', () => {
  let listMembers = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listMembers,
    createTeamRequesting: false,
  });
  listMembers = createSpy();
  component.setProps({ listMembers });
  expect(listMembers).toNotHaveBeenCalled();
});

test('Renders a SmartTable when prop member is not empty.', () => {
  const component = shallowRenderer({
    ...testProps,
    members: fromJS([{}]),
  });
  expect(component).toContain('SmartTable');
});
