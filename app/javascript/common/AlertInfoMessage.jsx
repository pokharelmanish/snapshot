import PropTypes from 'prop-types'
import React from 'react'

const AlertInfoMessage = ({message, closeAlert}) => {
  const handleKeyDown = (e) => {
    const enterKey = 13
    const keyCode = e.keyCode

    if (keyCode === enterKey) {
      closeAlert()
    }
  }

  return <div className='row'>
    <div className='col-md-12'>
      <div className='alert-message info-message'>
        <div className='alert-icon'>
          <i className='fa fa-info-circle' />
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
}

AlertInfoMessage.propTypes = {
  closeAlert: PropTypes.func,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

AlertInfoMessage.defaultProps = {
  closeAlert: () => {},
}

export default AlertInfoMessage
