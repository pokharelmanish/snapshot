import PropTypes from 'prop-types'
import React from 'react'

const AlertErrorMessage = ({message, closeAlert}) => {
  const handleKeyDown = (e) => {
    const enterKey = 13
    const keyCode = e.keyCode

    if (keyCode === enterKey) {
      closeAlert()
    }
  }
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='alert-message error-message' role='alert'>
          <div className='alert-icon'>
            <i className='fa fa-warning' />
          </div>
          <div className='alert-text'>
            {message}
          </div>
          <div className="alert-cross" role='button' tabIndex='0' onKeyDown={handleKeyDown} onClick={closeAlert}>
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
    </div>
  )
}

AlertErrorMessage.propTypes = {
  closeAlert: PropTypes.func,
  message: PropTypes.string,
}

AlertErrorMessage.defaultProps = {
  closeAlert: () => {},
}

export default AlertErrorMessage
