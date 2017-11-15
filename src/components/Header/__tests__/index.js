import React from 'react';
import test from 'ava';
import { noop } from 'lodash';

import { Header } from '../index';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  formatMessage: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<Header {...props} />);

test('Renders a header', () => {
  const component = shallowRenderer();
  expect(component).toBeA('header');
});

test('sidebar-mobile-show is toggled by clicking NavbarToggler with class d-lg-none', () => {
  const component = shallowRenderer();
  document.body.classList.toggle = createSpy();
  const navbarToggler = component.find('NavbarToggler.d-lg-none');
  navbarToggler.simulate('click', { preventDefault: noop });
  expect(document.body.classList.toggle).toHaveBeenCalledWith('sidebar-mobile-show');
});

test('sidebar-hidden is toggled by clicking NavbarToggler with class d-md-down-none', () => {
  const component = shallowRenderer();
  document.body.classList.toggle = createSpy();
  const navbarToggler = component.find('NavbarToggler.d-md-down-none');
  navbarToggler.simulate('click', { preventDefault: noop });
  expect(document.body.classList.toggle).toHaveBeenCalledWith('sidebar-hidden');
});
