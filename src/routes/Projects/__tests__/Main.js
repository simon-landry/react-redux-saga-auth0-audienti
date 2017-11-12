import React from 'react';
import test from 'ava';
import { noop } from 'lodash';

import { Main } from '../Main';

const { expect, shallow } = testHelper;

const testProps = {
  formatMessage: noop
};

const shallowRenderer = (props = testProps) =>
  shallow(<Main {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});
