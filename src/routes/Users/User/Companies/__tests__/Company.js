import React from 'react';
import test from 'ava';
import { fromJS } from 'immutable';
import { noop } from 'lodash';

import BreadcrumbItem from 'components/BreadcrumbItem';

import { Company } from '../Company';

const { expect, shallow, createSpy } = testHelper;

const testUserId = 'testUser';
const testCompanyId = 'testCompany';
const testName = 'testCompanyName';
const testProps = {
  match: { params: { userId: testUserId, companyId: testCompanyId } },
  company: fromJS({ attributes: { name: testName } }),
  readCompany: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<Company {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbItem', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb).toHaveProps({ to: `/users/${testUserId}/companies/${testCompanyId}` });
});

test('readCompany is called.', () => {
  const readCompany = createSpy();
  shallowRenderer({
    ...testProps,
    readCompany,
  });
  expect(readCompany).toHaveBeenCalledWith(testUserId, testCompanyId);
});

test('Renders a the name of company', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb.props().children).toInclude(testName);
});
