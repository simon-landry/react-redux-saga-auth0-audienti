import React from 'react';
import test from 'ava';
import { fromJS } from 'immutable';
import { noop } from 'lodash';

import BreadcrumbItem from 'components/BreadcrumbItem';

import { Team } from '../Team';

const { expect, shallow, createSpy } = testHelper;

const testProjectId = 'testProject';
const testTeamId = 'testTeam';
const testName = 'testTeamName';
const testProps = {
  match: { params: { companyId: testProjectId, teamId: testTeamId } },
  team: fromJS({ attributes: { name: testName } }),
  readTeam: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<Team {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbItem', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb).toHaveProps({ to: `/companies/${testProjectId}/teams/${testTeamId}` });
});

test('readTeam is called.', () => {
  const readTeam = createSpy();
  shallowRenderer({
    ...testProps,
    readTeam,
  });
  expect(readTeam).toHaveBeenCalledWith(testProjectId, testTeamId);
});

test('Renders a the name of team', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb.props().children).toInclude(testName);
});
