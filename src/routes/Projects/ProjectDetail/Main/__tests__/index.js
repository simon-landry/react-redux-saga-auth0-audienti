import React from 'react';
import test from 'ava';

import BreadcrumbMenu from 'components/BreadcrumbMenu';

import { Main } from '../index';

const { expect, shallow } = testHelper;

const testProjectId = 'testProject';
const testProps = {
  formatMessage: () => 'something',
  match: { params: { projectId: testProjectId } },
};

const shallowRenderer = (props = testProps) =>
  shallow(<Main {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbMenu', () => {
  const component = shallowRenderer();
  expect(component.find(BreadcrumbMenu).length).toBe(1);
});
