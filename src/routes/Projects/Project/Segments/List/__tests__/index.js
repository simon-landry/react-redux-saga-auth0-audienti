import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';

import { SegmentsList } from '../index';
import SegmentCard from '../components/SegmentCard';

const { expect, shallow, createSpy } = testHelper;

const testProjectId = 'testProject';
const testProps = {
  formatMessage: () => 'something',
  segments: fromJS([]),
  match: { params: { projectId: testProjectId } },
  segmentsRequesting: false,
  segmentsMeta: fromJS({ total: 12 }),
  project: fromJS({
    id: testProjectId,
    attributes: {
      id: testProjectId,
      name: 'testName',
    },
  }),
  listSegments: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<SegmentsList {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});

test('Renders a BreadcrumbMenu', () => {
  const component = shallowRenderer();
  expect(component).toContain(BreadcrumbMenu);
});

test('Renders a HeaderTitle', () => {
  const component = shallowRenderer({
    ...testProps,
    project: fromJS({ attributes: { name: 'name' } }),
  });
  expect(component).toContain(HeaderTitle);
});

test('Renders a SmartItemGroup', () => {
  const component = shallowRenderer();
  expect(component).toContain('SmartItemGroup');
});

test('listSegments is called.', () => {
  const listSegments = createSpy();
  shallowRenderer({
    ...testProps,
    listSegments,
  });
  expect(listSegments).toHaveBeenCalledWith(testProjectId, { 'page[number]': 1 });
});

test('listSegments is called when onPageChange of SmartItemGroup is called.', () => {
  const listSegments = createSpy();
  const pageIndex = 5;
  const component = shallowRenderer({
    ...testProps,
    listSegments,
  });
  const smartItemGroup = component.find('SmartItemGroup');
  smartItemGroup.props().onPageChange(pageIndex);
  expect(listSegments).toHaveBeenCalledWith(testProjectId, { 'page[number]': pageIndex });
});

test('ItemComponent should be a SegmentCard.', () => {
  const component = shallowRenderer({
    ...testProps,
    project: fromJS({ // This is to test if it is fine when there is no name of project.
      id: testProjectId,
      attributes: {
        id: testProjectId,
      },
    }),
  });
  const smartItemGroup = component.find('SmartItemGroup');
  const { ItemComponent } = smartItemGroup.props();
  const itemComponent = shallow(<ItemComponent />);
  expect(itemComponent).toBeA(SegmentCard);
});
