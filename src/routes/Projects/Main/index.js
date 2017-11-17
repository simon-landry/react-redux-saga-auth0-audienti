import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Row, Col } from 'reactstrap';

import { injectIntl } from 'components/Intl';
import { selectState } from 'redux/selectors';
import { listProjects } from 'redux/project/actions';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import LoadingIndicator from 'components/LoadingIndicator';

import ProjectCard from './components/ProjectCard';

export class Main extends Component {
  static propTypes = {
    formatMessage: PropTypes.func.isRequired,
    projects: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
      }),
    ).isRequired,
    listProjects: PropTypes.func.isRequired,
    projectsRequesting: PropTypes.bool.isRequired,
    history: PropTypes.shape().isRequired,
  };

  componentWillMount() {
    this.props.listProjects();
  }

  render() {
    const { formatMessage, projects, projectsRequesting, history } = this.props;
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
          {!projectsRequesting && projectsCount}
        </BreadcrumbMenu>
        {projectsRequesting && <LoadingIndicator />}
        <Row>
          {
            // show all the projects
            projects.map((project, index) => (
              <Col xs="12" sm="6" md="4" key={index}>
                <ProjectCard
                  project={project}
                  history={history}
                />
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
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listProjects: () => dispatch(listProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Main));
