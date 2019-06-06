import React from 'react'
import PropTypes from 'prop-types'
import AlertErrorMessage from 'common/AlertErrorMessage'

class AlertMessageResultsLimit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {closeAlert: false}
  }

  handleCloseAlert() { this.setState({closeAlert: true}) }

  render() {
    const {total} = this.props
    const {closeAlert} = this.state
    const resultsLimit = 250
    const message = 'Over 250 search results have been found. If possible, please refine your search by adding additional search criteria, then click the "Search" button again.'
    const shouldRender = total > resultsLimit && !closeAlert
    return shouldRender ? (
      <div className='alert-container search-results-limit'>
        <AlertErrorMessage message={message} closeAlert={() => this.handleCloseAlert()}/>
      </div>
    ) : null
  }
}

AlertMessageResultsLimit.propTypes = {
  total: PropTypes.number.isRequired,
}

export default AlertMessageResultsLimit
