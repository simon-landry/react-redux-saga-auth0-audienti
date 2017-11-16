import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import SidebarItems from 'components/SidebarItems';

import { ProjectDetail } from '../index';

const { expect, shallow, createSpy } = testHelper;

const testProjectId = 'testProjectId';
const testProjectName = 'Test Project';
const testProps = {
  formatMessage: () => 'something',
  match: { params: { projectId: testProjectId }, url: 'somewhere' },
  readProject: noop,
  project: fromJS({ attributes: { name: testProjectName } }),
  projectRequesting: false,
};

const shallowRenderer = (props = testProps) =>
  shallow(<ProjectDetail {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbItem with a proper prop `to`.', () => {
  const component = shallowRenderer();
  const breadcrumbItem = component.find('BreadcrumbItem');
  expect(breadcrumbItem).toHaveProps({ to: `/projects/${testProjectId}` });
});

test('Renders a SidebarItems.', () => {
  const component = shallowRenderer();
  expect(component).toContain(SidebarItems);
});

test('Renders a Routes with a proper prop `url`.', () => {
  const component = shallowRenderer();
  const routes = component.find('Routes');
  expect(routes).toHaveProps({ url: testProps.match.url });
});

test('readProject is called with proper param.', () => {
  const readProject = createSpy();
  shallowRenderer({
    ...testProps,
    readProject,
  });
  expect(readProject).toHaveBeenCalled(testProjectId);
});

test('BreadCrumbItem has project name when there is attributes name', () => {
  const component = shallowRenderer();
  const breadCrumbItem = component.find('BreadcrumbItem');
  expect(breadCrumbItem.props().children).toInclude(testProjectName);
});

test('BreadCrumbItem does not have a project name when there is not an attributes name', () => {
  const component = shallowRenderer({
    ...testProps,
    project: fromJS({}),
  });
  const breadCrumbItem = component.find('BreadcrumbItem');
  expect(breadCrumbItem.props().children).toNotInclude(testProjectName);
});

test('BreadCrumbItem does not have a project name when project is requesting.', () => {
  const component = shallowRenderer({
    ...testProps,
    projectRequesting: true,
  });
  const breadCrumbItem = component.find('BreadcrumbItem');
  expect(breadCrumbItem.props().children).toNotInclude(testProjectName);
});
