import React from 'react';
import test from 'ava';

import { Workflow } from '../index';

const { expect, shallow } = testHelper;

const testProps = {
};

const shallowRenderer = (props = testProps) =>
  shallow(<Workflow {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});
