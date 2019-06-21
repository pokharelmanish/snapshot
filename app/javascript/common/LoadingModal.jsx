import React from 'react'
import PropTypes from 'prop-types'
import {ModalComponent} from 'react-wood-duck'

const renderModalBody = () => (
  <div className='client-detail loading-icon-container'>
    <i className='fa fa-spinner fa-spin-faster' />
  </div>
)

const LoadingModal = ({show, size, title}) => {
  return (
    <ModalComponent
      showModal={show}
      modalBody={renderModalBody()}
      modalSize={size}
      modalTitle={title}
    />
  )
}

LoadingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default LoadingModal
