import React from 'react'
import PropTypes from 'prop-types'
import CountySelect from 'common/county/CountySelect'

class CountyNameSelect extends React.PureComponent {
  onChange(systemCode) {
    this.props.onChange('county', systemCode ? systemCode.value : '')
  }

  render() {
    return (
      <CountySelect {...this.props} onChange={this.onChange.bind(this)} />
    )
  }
}

CountyNameSelect.propTypes = {
  counties: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  })),
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default CountyNameSelect
