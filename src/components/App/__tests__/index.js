import React from 'react';
import test from 'ava';
import { noop } from 'lodash';

import { App } from '../index';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  children: <div>test children</div>,
  clearAuthToken: noop
};

const shallowRenderer = (props = testProps) =>
  shallow(<App {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('clearAuthToken is called when button is clicked', () => {
  const clearAuthToken = createSpy();
  const component = shallowRenderer({
    ...testProps,
    clearAuthToken
  });
  const button = component.find('button');
  button.simulate('click');
  expect(clearAuthToken).toHaveBeenCalled();
});
