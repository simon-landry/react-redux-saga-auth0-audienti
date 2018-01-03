import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, CardFooter } from 'reactstrap';

import { injectIntl } from 'components/Intl';

export const TeamCard = ({ data: { attributes }, formatMessage, remove, companyId }) => (
  <Card>
    <CardHeader>
      <h3 className="float-left">
        <Link to={`/companies/${companyId}/teams`}>{attributes.name}</Link>
      </h3>
      {!!remove && (
        <i
          className="fa fa-trash action float-right"
          onClick={() => remove(companyId, attributes.id)}
        />
      )}
    </CardHeader>
    <CardBody className="text-center">
      {attributes.description === null ? formatMessage('There is no description yet') : attributes.description }
    </CardBody>
    <CardFooter className="text-center">
      <Button outline color="secondary">
        {formatMessage('Details')}
      </Button>
    </CardFooter>
  </Card>
);

TeamCard.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  }).isRequired,
  companyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  formatMessage: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default injectIntl(TeamCard);
