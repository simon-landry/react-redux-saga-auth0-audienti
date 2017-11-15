import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbMenu from 'components/BreadcrumbMenu';

import { Main } from '../index';
import ProjectCard from '../components/ProjectCard';

const { expect, shallow } = testHelper;

const testProps = {
  formatMessage: noop,
  listProjects: noop,
  projects: fromJS([]),
  projectsRequesting: false,
  history: {
    push: noop,
  },
};

const shallowRenderer = (props = testProps) =>
  shallow(<Main {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbMenu.', () => {
  const component = shallowRenderer();
  expect(component).toContain(BreadcrumbMenu);
});

test('Renders ProjectCard equal number to prop `projects` length.', () => {
  const projectCount = 10;
  const component = shallowRenderer({
    ...testProps,
    projects: fromJS(new Array(projectCount).fill(0).map((_, index) => ({ id: index }))),
  });
  expect(component.find(ProjectCard).length).toBe(projectCount);
});

test('Renders a LoadingIndicator when projectsRequesting is true.', () => {
  const component = shallowRenderer({
    ...testProps,
    projectsRequesting: true,
  });
  expect(component).toContain('LoadingIndicator');
});
