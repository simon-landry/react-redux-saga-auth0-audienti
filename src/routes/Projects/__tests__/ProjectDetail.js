import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

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

test('Renders a BreadcrumbsItem with a proper prop `to`.', () => {
  const component = shallowRenderer();
  const breadcrumbsItem = component.find(BreadcrumbsItem);
  expect(breadcrumbsItem).toHaveProps({ to: `/projects/${testProjectId}` });
});
