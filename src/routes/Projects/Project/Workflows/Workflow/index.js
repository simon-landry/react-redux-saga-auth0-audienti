import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl } from 'components/Intl';

import { readWorkflow, updateWorkflow } from 'redux/workflow/actions';
import { selectState } from 'redux/selectors';
import { listAgentTypes } from 'redux/agent_type/actions';

import './lib/halo.js';
import './lib/selection.js';
import './lib/inspector.js';
import './lib/stencil.js';
import './lib/toolbar.js';
import './lib/sample-graphs.js';

import initialize from './lib/main.js';
import pickTheme from './lib/theme-picker.js';
import initShape from './lib/joint.shapes.app.js';

import ConfigDialog from './components/ConfigDialog';

export class Workflow extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string,
        workflowId: PropTypes.string,
      }),
    }).isRequired,
    readWorkflow: PropTypes.func.isRequired,
    /* workflow: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired, */
    listAgentTypes: PropTypes.func.isRequired,
    agentTypes: ImmutablePropTypes.mapContains({
      agents: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
        name: PropTypes.string,
      })),
      schedules: ImmutablePropTypes.listOf(PropTypes.string),
    }).isRequired,
    // workflowRequesting: PropTypes.bool.isRequired,
    isScriptLoadSucceed: PropTypes.bool.isRequired,
    updateWorkflow: PropTypes.func.isRequired,
  };

  static defaultProps = {
  }

  static defaultConfigDialog = { agentType: { config: { fields: [] } } };

  state = { configDialog: Workflow.defaultConfigDialog };

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else */
    if (nextProps.isScriptLoadSucceed && get(nextProps.agentTypes.toJS(), 'agents.length')) {
      this.rappidInit(nextProps);
    }
  }

  rappidInit = ({ agentTypes }) => {
    if (this.loaded) return;
    const params = {
      agentTypes: agentTypes.toJS().agents,
      configClicked: this.configClicked,
      saveWorkflow: this.saveWorkflow,
    };
    initialize(window._, window.joint, params);
    pickTheme(window._, window.joint);
    initShape(window.joint);
    window.joint.setTheme('modern');
    const app = new window.App.MainView({ el: '#rappid-container' });
    window.addEventListener('load', () => {
      app.graph.fromJSON(JSON.parse(window.App.config.sampleGraphs.emergencyProcedure));
    });
    this.loaded = true;
  }

  load = () => {
    const {
      readWorkflow,
      listAgentTypes,
      match: { params: { projectId, workflowId } },
    } = this.props;
    readWorkflow(projectId, workflowId);
    listAgentTypes(projectId);
  }

  configClicked = (agentName, config, callback) => {
    const { agentTypes } = this.props;
    const agentType = agentTypes.toJS().agents.find(({ config: { type } }) => type === agentName);
    this.setState({ configDialog: { open: true, callback, defaultConfig: config, agentType } });
  }

  configDialogClose = () => {
    this.setState({ configDialog: Workflow.defaultConfigDialog });
  }

  saveWorkflow = (workflowDraft) => {
    const { match: { params: { projectId, workflowId } }, updateWorkflow } = this.props;
    updateWorkflow(projectId, workflowId, { options: workflowDraft });
  }

  render() {
    // const { workflow, workflowRequesting, isScriptLoadSucceed } = this.props;
    const { configDialog } = this.state;
    const { agentTypes } = this.props;
    return (
      <div id="rappid-container">
        <div className="rappid-body">
          <div className="stencil-container" />
          <div className="paper-container" />
          <div className="navigator-container" />
        </div>
        <ConfigDialog
          isOpen={!!configDialog.open}
          agentType={configDialog.agentType}
          schedules={agentTypes.toJS().schedules}
          defaultConfig={configDialog.defaultConfig}
          onUpdate={configDialog.callback}
          toggle={this.configDialogClose}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('workflow', 'workflow')(state, 'workflow'),
  ...selectState('filterType', 'filterType')(state, 'filterType'),
  ...selectState('agentType', 'agentTypes')(state, 'agentTypes'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  readWorkflow: (projectId, workflowId) => dispatch(readWorkflow(projectId, workflowId)),
  updateWorkflow: (projectId, workflowId, payload) =>
    dispatch(updateWorkflow(projectId, workflowId, payload)),
  listAgentTypes: projectId => dispatch(listAgentTypes(projectId)),
});

const scriptLoadedComponent = scriptLoader(
  [
    '/lib/jquery.js',
    '/lib/lodash.js',
    '/lib/backbone.js',
    '/lib/graphlib.core.js',
    '/lib/dagre.core.js',
  ],
  '/lib/rappid.min.js',
)(Workflow);

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(scriptLoadedComponent));
