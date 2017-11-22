import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';

import { ProjectsList } from '../index';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  formatMessage: () => 'somewthing',
  listProjects: noop,
  projects: fromJS([]),
  projectsRequesting: false,
  history: {
    push: noop,
  },
  createProject: noop,
  createProjectRequesting: false,
};

const shallowRenderer = (props = testProps) =>
  shallow(<ProjectsList {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbMenu.', () => {
  const component = shallowRenderer();
  expect(component).toContain(BreadcrumbMenu);
});

test('Renders a HeaderTitle.', () => {
  const component = shallowRenderer();
  expect(component).toContain(HeaderTitle);
});

test('Renders ProjectCard equal number to prop `projects` length.', () => {
  const projectCount = 10;
  const component = shallowRenderer({
    ...testProps,
    projects: fromJS(new Array(projectCount).fill(0).map((_, index) => ({ id: `${index}` }))),
  });
  expect(component.find(ProjectCard).length).toBe(projectCount);
});

test('Renders ProjectCardGhost equal number to prop `projects` length when projectsRequesting is true.', () => {
  const projectCount = 10;
  const component = shallowRenderer({
    ...testProps,
    projects: fromJS(new Array(projectCount).fill(0).map((_, index) => ({ id: `${index}` }))),
    projectsRequesting: true,
  });
  expect(component.find('ProjectCardGhost').length).toBe(projectCount);
});

test('Renders a ProjectCardGhost when createProjectRequesting is true.', () => {
  const component = shallowRenderer({
    ...testProps,
    createProjectRequesting: true,
  });
  expect(component).toContain('ProjectCardGhost');
});

test('Does not reander a LoadingIndicator when projectsRequesting is true and there are loaded projects.', () => {
  const projectCount = 2;
  const component = shallowRenderer({
    ...testProps,
    projects: fromJS(new Array(projectCount).fill(0).map((_, index) => ({ id: `${index}` }))),
    projectsRequesting: true,
  });
  expect(component).toNotContain('LoadingIndicator');
});

test('Renders a LoadingIndicator when projectsRequesting is true and there are not loaded projects.', () => {
  const component = shallowRenderer({
    ...testProps,
    projectsRequesting: true,
  });
  expect(component).toContain('LoadingIndicator');
});

test('Renders a CreateProjectModal when toggleCreateModal is called.', () => {
  const component = shallowRenderer();
  component.instance().toggleCreateModal();
  expect(component).toContain(CreateProjectModal);
});

test('Calls createProject when onSave is called.', () => {
  const createProject = createSpy();
  const component = shallowRenderer({
    ...testProps,
    createProject,
  });
  component.instance().toggleCreateModal();
  const createProjectModal = component.find(CreateProjectModal);
  const project = { id: 'whatever' };
  createProjectModal.props().onSave(project);
  expect(createProject).toHaveBeenCalledWith(project);
});
