import React from 'react'
import PropTypes from 'prop-types'
import SEARCH_NAME_SUFFIXES from 'enums/SearchNameSuffixes'
import SuffixSelect from 'common/search/suffix/SuffixSelect'

class SuffixNameSelect extends React.PureComponent {
  onChange() {
    this.props.onChange()
  }

  render() {
    return (
      <SuffixSelect
        suffixes={SEARCH_NAME_SUFFIXES}
        onChange={this.onChange}
        {...this.props}
      />
    )
  }
}

SuffixNameSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default SuffixNameSelect
