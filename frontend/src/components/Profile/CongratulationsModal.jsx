import React from 'react';
import ReactModal from 'react-modal';

const CongratulationsModal = ({ show, onClose }) => {
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={onClose}
      contentLabel="Congratulations Modal"
    >
      {/* Add your congratulations modal content here */}
    </ReactModal>
  );
};

export default CongratulationsModal;
