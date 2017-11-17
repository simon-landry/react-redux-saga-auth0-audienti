import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Row, Col } from 'reactstrap';

import { injectIntl } from 'components/Intl';
import { selectState } from 'redux/selectors';
import { listProjects, createProject } from 'redux/project/actions';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import LoadingIndicator from 'components/LoadingIndicator';
import ButtonLink from 'components/ButtonLink';

import ProjectCard from './components/ProjectCard';
import ProjectCardGhost from './components/ProjectCardGhost';
import CreateProjectModal from './components/CreateProjectModal';

export class Main extends Component {
  static propTypes = {
    formatMessage: PropTypes.func.isRequired,
    projects: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ).isRequired,
    listProjects: PropTypes.func.isRequired,
    projectsRequesting: PropTypes.bool.isRequired,
    history: PropTypes.shape().isRequired,
    createProject: PropTypes.func.isRequired,
    createProjectRequesting: PropTypes.bool.isRequired,
  };

  state = { createModal: false };

  componentWillMount() {
    this.props.listProjects();
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal })

  render() {
    const {
      formatMessage, projects, projectsRequesting, history, listProjects, createProject,
      createProjectRequesting,
    } = this.props;
    const { createModal } = this.state;
    const projectsCount = formatMessage('{count} {count, plural, one {project} other {projects}}', { count: projects.size });
    return (
      <div className="animated fadeIn">
        <Helmet
          title={formatMessage('Projects')}
          meta={[
            { name: 'description', content: formatMessage('This is a page to list all projects.') },
          ]}
        />
        <BreadcrumbMenu>
          {!projectsRequesting && (
            <ButtonLink className="no-border" handleClick={listProjects}>
              {projectsCount}
            </ButtonLink>)}
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Project')}
          </ButtonLink>
        </BreadcrumbMenu>
        {projectsRequesting && !projects.size && <LoadingIndicator />}
        <CreateProjectModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onSave={createProject}
        />
        <Row>
          {createProjectRequesting && (
            <Col xs="12" sm="6" md="4" key={projects.length + 1}>
              <ProjectCardGhost />
            </Col>
          )}
          {
            // show all the projects
            projects.map((project, index) => (
              <Col xs="12" sm="6" md="4" key={index}>
                {!projectsRequesting ?
                  <ProjectCard
                    project={project.get('attributes')}
                    history={history}
                  /> : <ProjectCardGhost />
                }
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('project', 'projects')(state, 'projects'),
  ...selectState('project', 'createProject')(state, 'createProject'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listProjects: () => dispatch(listProjects()),
  createProject: payload => dispatch(createProject(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Main));
