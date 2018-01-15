import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbItem from 'components/BreadcrumbItem';
import HeaderTitle from 'components/HeaderTitle';

import { TeamDetail } from '../index';

const { expect, shallow } = testHelper;

const testCompanyId = 'testCompany';
const testTeamId = 'testTeam';
const testProps = {
  match: {
    params: {
      companyId: testCompanyId,
      teamId: testTeamId,
    },
  },
  team: fromJS({
    attributes: {
      id: testTeamId,
      name: 'testName',
    },
  }),
  updateTeam: noop,
  readTeam: noop,
  formatMessage: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<TeamDetail {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbItem', () => {
  const component = shallowRenderer();
  const breadcrumb = component.find(BreadcrumbItem);
  expect(breadcrumb).toHaveProps({ to: `/companies/${testCompanyId}/teams/${testTeamId}` });
});

test('Renders a HeaderTitle', () => {
  const component = shallowRenderer();
  expect(component).toContain(HeaderTitle);
});

test('Renders a Card', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a CardHeader', () => {
  const component = shallowRenderer();
  expect(component).toContain('CardHeader');
});

test('Renders a CardBody', () => {
  const component = shallowRenderer();
  expect(component).toContain('CardBody');
});

test('description state is set when component is rendered.', () => {
  const description = 'testDescription';
  const component = shallowRenderer();
  expect(component).toHaveState({ description });
});

test('editable value is changed when onEdit is called', () => {
  const component = shallowRenderer();
  const newValue = 'testValue';
  component.setState({ editable: 'whatever' });
  const input = component.find('Input');
  input.simulate('change', { target: { value: newValue } });
});

test('onEdit called when edit button is clicked.', () => {
  const editable = true;
  const component = shallowRenderer({
    ...testProps,
  });
  const editButton = component.find('Button[color="link"]');
  editButton.simulate('click');
  expect(component).toHaveState({ editable });
});

test('Renders a Form when state editable is true.', () => {
  const component = shallowRenderer();
  component.setState({ editable: true });
  expect(component).toContain('Card');
});

test('onCancel called when cancel button is clicked.', () => {
  const component = shallowRenderer();
  // const cancelButton = component.find('CardBody').find('Button').at(2);
  const cancelButton = component.find('CardBody');
  console.log(cancelButton.node);
  // cancelButton.props().handleClick();
  // expect(component).toHaveState({ editable: true });
  // cancelButton.props().handleClick();
  // expect(component).toHaveState({ editable: false });
});
