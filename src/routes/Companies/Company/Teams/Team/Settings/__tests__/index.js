import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbItem from 'components/BreadcrumbItem';
import HeaderTitle from 'components/HeaderTitle';

import { Settings } from '../index';

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
  history: { push: noop },
  teamRequesting: false,
  updateTeam: noop,
  removeTeam: noop,
  readTeam: noop,
  formatMessage: noop,
  setConfirmMessage: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<Settings {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('set teamName when component is rendered', () => {
  const component = shallowRenderer();
  const teamName = 'testTeamName';
  component.setProps({ teamName });
});

test('Renders a BreadcrumbItem', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb).toHaveProps({ to: `/companies/${testCompanyId}/teams/${testTeamId}/settings` });
});

test('Renders a HeaderTitle', () => {
  const component = shallowRenderer();
  expect(component).toContain(HeaderTitle);
});

test('Update Team is called when form is submitted.', () => {
  const updateTeam = createSpy();
  const component = shallowRenderer({
    ...testProps,
    updateTeam,
  });
  const form = component.find('Form');
  form.simulate('submit', { preventDefault: noop, target: null });
  expect(updateTeam).toHaveBeenCalled();
});

test('change state teamName when Input with `name` is changed.', () => {
  const teamName = 'testName';
  const component = shallowRenderer({
    ...testProps,
    teamRequesting: true, // to check if it renders fine when teamRequesting is true
    team: fromJS({}), // to check if it renders fine when team is not set
  });
  const input = component.find('Input[name="name"]');
  input.simulate('change', { target: { value: teamName } });
  expect(component).toHaveState({ teamName });
});
