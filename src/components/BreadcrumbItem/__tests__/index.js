import React from 'react';
import test from 'ava';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import BreadcrumbItem from '../index';

const { expect, shallow } = testHelper;

const testProps = {
  to: 'somewhere',
  children: <div />,
};

const shallowRenderer = (props = testProps) =>
  shallow(<BreadcrumbItem {...props} />);

test('Renders a BreadcrumbsItem', () => {
  const component = shallowRenderer();
  expect(component).toBeA(BreadcrumbsItem);
});

test('Renders a BreadcrumbsItem with proper props', () => {
  const component = shallowRenderer();
  expect(component).toHaveProps({ to: testProps.to });
});
