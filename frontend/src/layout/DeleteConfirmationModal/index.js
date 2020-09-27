import React from 'react';
import { Modal, Button, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';

const DeleteConfirmationModal = (props) => {

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.onClose} >
        <ModalHeader toggle={props.onClose}>{props.title ? props.title : 'Confirm Delete'}</ModalHeader>
        <ModalBody>
          <p>
                        Are you sure to delete the {props.entityType} <b>{props.entityName}</b>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button outline className="mb-2 mr-2 btn-transition"
            color="danger"
            onClick={props.onClose}>
                        Close
          </Button>
          <Button outline className="mb-2 mr-2 btn-transition"
            color="success"
            onClick={() => props.onConfirm(props.entityId)}>
                        Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteConfirmationModal;
