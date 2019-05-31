import React from 'react'
import PropTypes from 'prop-types'
import AlertErrorMessage from 'common/AlertErrorMessage'

const AlertMessageResultsLimit = ({total}) => {
  const resultsLimit = 250
  const message = 'Over 250 search results have been found. If possible, please refine your search by adding additional search criteria, then click the "Search" button again.'
  const shouldRender = total > resultsLimit
  return shouldRender ? (
    <div className='alert-container search-results-limit'>
      <AlertErrorMessage message={message} />
    </div>
  ) : null
}

AlertMessageResultsLimit.propTypes = {
  total: PropTypes.number.isRequired,
}

export default AlertMessageResultsLimit
