import React from 'react';
import test from 'ava';

import BreadcrumbItem from 'components/BreadcrumbItem';

import { Keywords } from '../index';

const { expect, shallow } = testHelper;

const testCompanyId = 'testCompany';
const testProps = {
  formatMessage: () => 'something',
  match: { params: { companyId: testCompanyId } },
};

const shallowRenderer = (props = testProps) =>
  shallow(<Keywords {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbItem', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb).toHaveProps({ to: `/companies/${testCompanyId}/keywords` });
});

test('Renders a Routes.', () => {
  const component = shallowRenderer();
  expect(component).toContain('Routes');
});
