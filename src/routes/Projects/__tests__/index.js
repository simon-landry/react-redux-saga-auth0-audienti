import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { Projects } from '../index';

const { expect, shallow } = testHelper;

const testProps = {
  formatMessage: noop,
  match: {
    url: 'testUrl'
  }
};

const shallowRenderer = (props = testProps) =>
  shallow(<Projects {...props} />);

test('Renders a div.', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbsItem with a proper prop `to`.', () => {
  const component = shallowRenderer();
  const breadcrumbsItem = component.find(BreadcrumbsItem);
  expect(breadcrumbsItem).toHaveProps({ to: '/projects' });
});

test('Renders a Routes with a proper prop `url`.', () => {
  const component = shallowRenderer();
  const breadcrumbsItem = component.find('Routes');
  expect(breadcrumbsItem).toHaveProps({ url: testProps.match.url });
});
