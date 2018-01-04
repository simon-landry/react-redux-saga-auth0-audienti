import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import { UpdateCompanyModal } from '../UpdateCompanyModal';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  isOpen: false,
  toggle: noop,
  formatMessage: noop,
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

test('onSave, toggle is called when form is submitted.', () => {
  const toggle = createSpy();
  const updateCompany = createSpy();
  const component = shallowRenderer({
    ...testProps,
    toggle,
    updateCompany,
  });
  const form = component.find('Form');
  form.simulate('submit', { preventDefault: noop, target: null });
  expect(toggle).toHaveBeenCalled();
  expect(updateCompany).toHaveBeenCalled();
});
