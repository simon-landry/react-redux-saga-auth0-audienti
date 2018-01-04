import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import { UpdateCompanyModal } from '../UpdateCompanyModal';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  isOpen: false,
  toggle: noop,
  formatMessage: () => 'something',
  company: fromJS({}),
  updateCompany: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<UpdateCompanyModal {...props} />);

test('Renders a Modal', () => {
  const component = shallowRenderer();
  expect(component).toBeA('Modal');
});

test('toggle is called when cancel Button is clicked.', () => {
  const toggle = createSpy();
  const component = shallowRenderer({
    ...testProps,
    toggle,
  });
  const cancelButton = component.find('Button').first();
  cancelButton.simulate('click');
  expect(toggle).toHaveBeenCalled();
});

test('toggle is called when form is submitted.', () => {
  const toggle = createSpy();
  const component = shallowRenderer({
    ...testProps,
    toggle,
  });
  const form = component.find('Form');
  form.simulate('submit', { preventDefault: noop, target: null });
  expect(toggle).toHaveBeenCalled();
});

test('UpdateCompany is called when form submitted.', () => {
  const updateCompany = createSpy();
  const component = shallowRenderer({
    ...testProps,
    updateCompany,
  });
  const form = component.find('Form');
  form.simulate('submit', { preventDefault: noop, target: null });
  expect(updateCompany).toHaveBeenCalled();
});

test('change state companyName when Input with `name` is changed.', () => {
  const companyName = 'testName';
  const component = shallowRenderer({
    ...testProps,
    company: fromJS({}),
  });
  const input = component.find('Input[name="name"]');
  input.simulate('change', { target: { value: companyName } });
  expect(component).toHaveState({ companyName });
});
