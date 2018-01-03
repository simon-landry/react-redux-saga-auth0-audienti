import React from 'react';
import test from 'ava';
import { noop } from 'lodash';

import { TeamCard } from '../TeamCard';

const { expect, shallow, createSpy } = testHelper;

const testTeamId = '1';
const testCompanyId = '2';
const testProps = {
  data: { attributes: { id: testTeamId, name: 'testName' } },
  formatMessage: noop,
  companyId: testCompanyId,
  remove: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<TeamCard {...props} />);

test('Renders a Card', () => {
  const component = shallowRenderer();
  expect(component).toBeA('Card');
});

test('Renders a CardHeader', () => {
  const component = shallowRenderer();
  expect(component).toContain('CardHeader');
});

test('Renders a CardBody', () => {
  const component = shallowRenderer();
  expect(component).toContain('CardHeader');
});

test('remove is called when trash icon is clicked.', () => {
  const remove = createSpy();
  const component = shallowRenderer({
    ...testProps,
    remove,
  });
  const iconTrash = component.find('i.fa-trash');
  iconTrash.simulate('click');
  expect(remove).toHaveBeenCalledWith(testTeamId);
});
