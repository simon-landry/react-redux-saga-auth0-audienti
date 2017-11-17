import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import { ProjectCard } from '../ProjectCard';

const { expect, shallow, createSpy } = testHelper;

const testProjectId = '1';
const testProps = {
  formatMessage: noop,
  history: { push: noop },
  project: fromJS({ id: testProjectId }),
};

const shallowRenderer = (props = testProps) =>
  shallow(<ProjectCard {...props} />);

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

test('Button click calls history.push', () => {
  const push = createSpy();
  const component = shallowRenderer({
    ...testProps,
    history: { push },
  });
  component.find('Button').simulate('click');
  expect(push).toHaveBeenCalledWith(`/projects/${testProjectId}`);
});
