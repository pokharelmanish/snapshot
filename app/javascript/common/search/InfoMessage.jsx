import React from 'react'
import PropTypes from 'prop-types'
import AlertInfoMessage from 'common/AlertInfoMessage'

class InfoMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {closeAlert: false}
  }

  handleCloseAlert() { this.setState({closeAlert: true}) }

  render() {
    const {total} = this.props
    const {closeAlert} = this.state
    const message = 'No records match your search. Try checking for spelling errors, then try removing some criteria to help broaden your search and click the Search button again.'
    const shouldRender = total === 0 && !closeAlert
    return shouldRender ? <div className='alert-container no-search-results' ><AlertInfoMessage message={message} closeAlert={() => this.handleCloseAlert()}/></div> : null
  }
}

InfoMessage.propTypes = {
  total: PropTypes.number,
}

export default InfoMessage
