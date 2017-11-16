import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import serialize from 'form-serialize';

import { injectIntl } from 'components/Intl';

const CreateProjectModal = ({ isOpen, toggle, onSave, className, formatMessage }) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className={` ${className}`.split(' ').join(' modal-')}
  >
    <Form onSubmit={(e) => { e.preventDefault(); onSave(serialize(e.target)); toggle(); }}>
      <ModalHeader toggle={toggle}>{formatMessage('New Project')}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label htmlFor="name">{formatMessage('Project Name')}</Label>
          <Input type="text" name="project[name]" required />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>{formatMessage('Cancel')}</Button>{' '}
        <Button type="submit" color="primary">{formatMessage('Save Project')}</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

CreateProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

CreateProjectModal.defaultProps = {
  className: '',
};

export default injectIntl(CreateProjectModal);
