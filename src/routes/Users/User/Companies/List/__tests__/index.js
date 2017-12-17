import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import { CompaniesList } from '../index';

const { expect, shallow, createSpy } = testHelper;
const testUserMeId = 'testUser';

const testProps = {
  listCompanies: noop,
  currentUser: fromJS({
    id: testUserMeId,
    name: 'testUserMe',
  }),
};

const shallowRenderer = (props = testProps) =>
  shallow(<CompaniesList {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('listCompanies is called.', () => {
  const listCompanies = createSpy();
  shallowRenderer({
    ...testProps,
    listCompanies,
  });
  // expect(listcompanies).toHaveBeenCalledWith(testUserId, { 'page[number]': 1, search: '' });
});

test('Renders fields without problem', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});
