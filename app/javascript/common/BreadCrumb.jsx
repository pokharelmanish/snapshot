import React from 'react'
import PropTypes from 'prop-types'

export const BreadCrumb = ({
  navigationElements,
  hasError,
}) => {
  const classNames = hasError ? 'container back-to-dashboard-error' : 'container back-to-dashboard'
  return (
    <div className={classNames}>
      <div className='row'>
        <div className='col-xs-7'>
          <h5><span><a href='/dashboard'>Dashboard</a> {navigationElements.map((nav, index) => (<span key={index}> {'>'} {nav}</span>))}</span></h5>
        </div>
      </div>
    </div>
  )
}

BreadCrumb.propTypes = {
  hasError: PropTypes.bool,
  navigationElements: PropTypes.array,
}

BreadCrumb.defaultProps = {
  navigationElements: [],
}
