import React from 'react';
import test from 'ava';
import { noop } from 'lodash';

import BreadcrumbMenu from 'components/BreadcrumbMenu';

import { ProjectDetail } from '../ProjectDetail';

const { expect, shallow } = testHelper;

const testProjectId = 'testProjectId';
const testProps = {
  formatMessage: noop,
  match: { params: { projectId: testProjectId } },
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

test('Renders a BreadcrumbMenu.', () => {
  const component = shallowRenderer();
  expect(component).toContain(BreadcrumbMenu);
});
