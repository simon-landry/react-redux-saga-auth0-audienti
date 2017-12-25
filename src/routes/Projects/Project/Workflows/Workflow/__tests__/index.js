import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import { fromJS } from 'immutable';

import { Workflow } from '../index';
import * as libMain from '../lib/main.js';
import * as libThemePicker from '../lib/theme-picker.js';
import * as libShapes from '../lib/joint.shapes.app.js';

// pre configuration for rappidInit
class MainView {
  graph = {
    fromJSON: noop,
  }
}
libMain.default = noop;
libThemePicker.default = noop;
libShapes.default = noop;
window.joint = { setTheme: noop };
window.App = { MainView, config: { sampleGraphs: { emergencyProcedure: '{}' } } };

const { expect, shallow, createSpy } = testHelper;

const testProjectId = 'testProject';
const testWorkflowId = 'testWorkflow';
const testProps = {
  match: {
    params: {
      projectId: testProjectId,
      workflowId: testWorkflowId,
    },
  },
  readWorkflow: noop,
  listAgentTypes: noop,
  agentTypes: fromJS([
    { name: 'whatever', config: {} },
  ]),
  isScriptLoadSucceed: false,
  updateWorkflow: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<Workflow {...props} />);

test('runs readWorkflow and listAgentTypes initially', () => {
  const readWorkflow = createSpy();
  const listAgentTypes = createSpy();
  shallowRenderer({
    ...testProps,
    readWorkflow,
    listAgentTypes,
  });
  expect(readWorkflow).toHaveBeenCalledWith(testProjectId, testWorkflowId);
  expect(listAgentTypes).toHaveBeenCalledWith(testProjectId);
});

test('ConfigDialog is open when configClicked is called and closed when configDialogClose is called', () => {
  const component = shallowRenderer();
  const instance = component.instance();
  instance.configClicked();
  expect(component).toContain('ConfigDialog[isOpen=true]');
  instance.configDialogClose();
  expect(component).toContain('ConfigDialog[isOpen=false]');
});

test('saveWorkflow triggers updateWorkflow', () => {
  const updateWorkflow = createSpy();
  const testWorkflowDraft = { whatever: 'It does not matter what data it is.' };
  const component = shallowRenderer({
    ...testProps,
    updateWorkflow,
  });
  component.instance().saveWorkflow(testWorkflowDraft);
  expect(updateWorkflow).toHaveBeenCalledWith(
    testProjectId, testWorkflowId, { options: testWorkflowDraft },
  );
});

test('rappidInit is called when script is loaded and agentTypes is not empty', () => {
  const component = shallowRenderer();
  const rappidInit = createSpy();
  component.instance().rappidInit = rappidInit;
  component.setProps({ isScriptLoadSucceed: true });
  expect(rappidInit).toHaveBeenCalled();
});

test('loaded is set true when it is false', () => {
  const component = shallowRenderer();
  const instance = component.instance();
  instance.loaded = false;
  instance.rappidInit({ agentTypes: fromJS({}) });
  expect(instance.loaded).toBe(true);
});

test('window.addEventListener is called when it is false', () => {
  const component = shallowRenderer();
  const instance = component.instance();
  instance.loaded = false;
  window.addEventListener = createSpy();
  instance.rappidInit({ agentTypes: fromJS({}) });
  window.addEventListener.calls[0].arguments[1](); // to check if load event fires without a problem
  expect(window.addEventListener).toHaveBeenCalled();
});

test('window.addEventListener is not called when loaded is set to true already', () => {
  const component = shallowRenderer();
  const instance = component.instance();
  instance.loaded = true;
  window.addEventListener = createSpy();
  instance.rappidInit({ agentTypes: fromJS({}) });
  expect(window.addEventListener).toNotHaveBeenCalled();
});
