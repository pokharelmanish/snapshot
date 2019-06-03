import PropTypes from 'prop-types'
import React from 'react'

const AlertErrorMessage = ({message, closeAlert}) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='alert-message error-message' role='alert'>
        <div className='alert-icon'>
          <i className='fa fa-warning' />
        </div>
        <div className='alert-text'>
          {message}
        </div>
        <div className="alert-cross" onClick={closeAlert}>
          <i className="fa fa-times" />
        </div>
      </div>
    </div>
  </div>
)

AlertErrorMessage.propTypes = {
  closeAlert: PropTypes.func,
  message: PropTypes.string,
}

AlertErrorMessage.defaultProps = {
  closeAlert: () => {},
}

export default AlertErrorMessage
