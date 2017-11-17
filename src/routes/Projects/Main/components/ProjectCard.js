import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

import { injectIntl } from 'components/Intl';

export const ProjectCard = ({ project, history, formatMessage }) => (
  <Card>
    <CardHeader>
      <Link to={`/projects/${project.get('id')}`}>{formatMessage('Projects')} {project.get('id')}</Link>
    </CardHeader>
    <CardBody className="text-center">
      <Button outline color="secondary" onClick={() => history.push(`/projects/${project.get('id')}`)}>{formatMessage('Visit')}</Button>
    </CardBody>
  </Card>
);

ProjectCard.propTypes = {
  project: ImmutablePropTypes.mapContains({
    id: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  formatMessage: PropTypes.func.isRequired,
};

export default injectIntl(ProjectCard);
