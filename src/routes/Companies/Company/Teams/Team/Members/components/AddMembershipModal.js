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
import Serializer from 'helpers/form-serialize';
import Select from 'components/Select';
import { injectIntl } from 'components/Intl';

export const AddMembershipModal = ({ isOpen, toggle, onSave, className, formatMessage, teamName }) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className={` ${className}`.split(' ').join(' modal-')}
  >
    <Form onSubmit={(e) => {
      e.preventDefault();
      onSave(Serializer.serialize(e.target, { hash: true }));
      toggle();
    }}>
      <ModalHeader toggle={toggle}>{formatMessage('Add members to')} {teamName}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label htmlFor="user_id">{formatMessage('User')}</Label>
          <Input type="text" name="user_id" icon="users" placeholder={formatMessage('Search by userId, full name, or email address')} required />
          {/* Todo: User should be selected on search input like Github */}
        </FormGroup>
        <FormGroup>
          <Select
            options={[
              { value: 'owner', label: 'Owner' },
              { value: 'reader', label: 'Reader' },
            ]}
            name="role"
            defaultValue="owner"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>{formatMessage('Cancel')}</Button>{' '}
        <Button type="submit" color="primary">{formatMessage('Add')}</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

AddMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  teamName: PropTypes.string,
};

AddMembershipModal.defaultProps = {
  className: '',
  teamName: '',
};

export default injectIntl(AddMembershipModal);
