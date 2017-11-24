import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { injectIntl } from 'components/Intl';
import LoadingIndicator from 'components/LoadingIndicator';

export const SegmentCard = ({
  data: { attributes },
  projectId,
  formatMessage,
  ghost,
}) => (
  <Card>
    <CardHeader>
      <h3>{ghost ? '--' : <Link to={`/projects/${projectId}/segments/${attributes.id}`}>{attributes.name}</Link>}</h3>
    </CardHeader>
    {
      ghost ? (
        <CardBody>
          <LoadingIndicator />
        </CardBody>
      ) : (
        <CardBody>
          <CardText>{formatMessage('Target')}: {attributes.query_type}</CardText>
          <CardText>
            {formatMessage('Created')}: {moment(attributes.created_at).fromNow()}
            <br />
            {formatMessage('Updated')}: {moment(attributes.updated_at).fromNow()}
          </CardText>
        </CardBody>
      )
    }
  </Card>
);

SegmentCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  projectId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  formatMessage: PropTypes.func.isRequired,
  ghost: PropTypes.bool.isRequired,
};

export default injectIntl(SegmentCard);
