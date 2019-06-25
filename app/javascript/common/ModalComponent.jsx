import React from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'react-bootstrap'

const propTypes = {
  closeModal: PropTypes.any,
  modalBody: PropTypes.any,
  modalFooter: PropTypes.any,
  modalSize: PropTypes.string,
  modalTitle: PropTypes.any,
  showModal: PropTypes.bool,
}

const ModalComponent = ({
  modalBody,
  closeModal,
  modalFooter,
  modalSize,
  modalTitle,
  showModal,
}) => {
  return (
    <div className="container">
      <Modal show={showModal} onHide={closeModal} bsSize={modalSize}>
        <Modal.Header closeButton>
          <h2 className='modal-title'>{modalTitle}</h2>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>{modalFooter}</Modal.Footer>
      </Modal>
    </div>
  )
}

ModalComponent.propTypes = propTypes

export default ModalComponent
