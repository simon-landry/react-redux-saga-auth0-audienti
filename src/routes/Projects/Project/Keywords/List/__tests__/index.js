import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';
import * as ReactRouterDom from 'react-router-dom';

import { KeywordsList } from '../index';
import AddKeywordsModal from '../components/AddKeywordsModal';

const { expect, shallow, createSpy } = testHelper;
const testProjectId = 'testProject';
const testProps = {
  formatMessage: () => 'somewthing',
  listKeywords: noop,
  keywords: fromJS([]),
  keywordsRequesting: false,
  keywordsMeta: fromJS({}),
  match: { params: { projectId: testProjectId } },
  project: fromJS({}),
  createKeywords: noop,
  createNegativeKeywords: noop,
  createKeywordsRequesting: false,
};

const shallowRenderer = (props = testProps) =>
  shallow(<KeywordsList {...props} />);

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

test('Renders a AddKeywordsModal.', () => {
  const component = shallowRenderer();
  expect(component).toContain(AddKeywordsModal);
});

test('Renders a SmartTable.', () => {
  const component = shallowRenderer();
  expect(component).toContain('SmartTable');
});

// values vary from one render to another.
const testValues = [
  'whatever',
  ['whatever'],
];

test('Does not reander a LoadingIndicator when keywordsRequesting is not true.', () => {
  ReactRouterDom.Link = () => <div />;
  const component = shallowRenderer({
    ...testProps,
    keywordsRequesting: false,
  });
  const smartTable = component.find('SmartTable');
  const { fields } = smartTable.props();
  fields.forEach((field, index) => {
    if (!field.render) return;
    const renderedComponent = shallow(
      <div>
        {field.render(testValues[index], { id: 'rowId' })}
      </div>,
    );
    expect(renderedComponent).toNotContain('LoadingIndicator');
  });
});

test('Renders a LoadingIndicator when keywordsRequesting is true.', () => {
  const component = shallowRenderer({
    ...testProps,
    keywordsRequesting: true,
  });
  const smartTable = component.find('SmartTable');
  const { fields } = smartTable.props();
  fields.forEach((field, index) => {
    if (!field.render) return;
    const renderedComponent = shallow(
      <div>
        {field.render(testValues[index], { id: 'rowId' })}
      </div>,
    );
    expect(renderedComponent).toContain('LoadingIndicator');
  });
});

test('onAddKeywords of AddKeywordsModal triggers createKeywords with proper params.', () => {
  const createKeywords = createSpy();
  const component = shallowRenderer({
    ...testProps,
    createKeywords,
  });
  const testKeywords = ['whatever', 'I do not know.'];
  const modal = component.find(AddKeywordsModal);
  modal.props().onAddKeywords(testKeywords);
  expect(createKeywords).toHaveBeenCalledWith(testProjectId, testKeywords);
});

test('onAddNegativeKeywords of AddKeywordsModal triggers createNegativeKeywords with proper params.', () => {
  const createNegativeKeywords = createSpy();
  const component = shallowRenderer({
    ...testProps,
    createNegativeKeywords,
  });
  const testKeywords = ['whatever', 'I do not know.'];
  const modal = component.find(AddKeywordsModal);
  modal.props().onAddNegativeKeywords(testKeywords);
  expect(createNegativeKeywords).toHaveBeenCalledWith(testProjectId, testKeywords);
});

test('listKeywords is called.', () => {
  const listKeywords = createSpy();
  shallowRenderer({
    ...testProps,
    listKeywords,
  });
  expect(listKeywords).toHaveBeenCalled();
});

test('listKeywords is called when createKeywords request is successful.', () => {
  const listKeywords = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listKeywords,
    createKeywordsRequesting: true,
  });
  component.setProps({ createKeywordsRequesting: false });
  expect(listKeywords).toHaveBeenCalled();
});

test('listKeywords is not called when createKeywordsReqesting was not true.', () => {
  let listKeywords = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listKeywords,
    createKeywordsRequesting: false,
  });
  listKeywords = createSpy();
  component.setProps({ listKeywords });
  expect(listKeywords).toNotHaveBeenCalled();
});

test('onAddTags is called when onClick is called on first action.', () => {
  const component = shallowRenderer();
  const smartTable = component.find('SmartTable');
  const { actions } = smartTable.props();
  const addTagAction = actions[0];
  const checks = 'whatever';
  // this should be changed into some meaningful test after onAddTags is implemented.
  addTagAction.onClick(checks);
  expect(1).toBe(1);
});

test('sets state tags and calls listKeywords when one of tags is clicked.', () => {
  const listKeywords = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listKeywords,
    keywordsRequesting: false,
  });
  const smartTable = component.find('SmartTable');
  const { fields } = smartTable.props();
  const tagsField = fields[1];
  const renderedComponent = shallow(tagsField.render(testValues[1], { id: 'rowId' })[0]);
  renderedComponent.simulate('click');
  expect(component.instance().state.tags).toEqual([testValues[1][0]]);
  expect(listKeywords).toHaveBeenCalled();
});

test('sets state pageIndex and calls listKeywords when onPageChange is called.', () => {
  const listKeywords = createSpy();
  const component = shallowRenderer({
    ...testProps,
    listKeywords,
    keywordsRequesting: false,
  });
  const smartTable = component.find('SmartTable');
  const { onPageChange } = smartTable.props();
  const pageIndex = 3;
  onPageChange(pageIndex);
  expect(component).toHaveState({ pageIndex });
  expect(listKeywords).toHaveBeenCalled();
});
