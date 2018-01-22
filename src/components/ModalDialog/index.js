import React from "react";
import Modal from "components/Modal";
import Dialog from "components/Dialog";
import PropTypes from "prop-types";

const ModalDialog = props => {
  const { children, onClose, isOpen } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Dialog onClose={onClose}>{children}</Dialog>
    </Modal>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default ModalDialog;
