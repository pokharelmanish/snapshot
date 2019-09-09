import React from 'react'
import PropTypes from 'prop-types'
import MaskedInputField from 'common/MaskedInputField'

const HyphenatedMaskedInput = ({mask, ...props}) => {
  const placeholder = mask.replace(/[0-9]/g, '_')
  const maxLength = mask.replace(/-/g, '').length

  return (
    <MaskedInputField
      mask={mask}
      placeholder={placeholder}
      maxLength={maxLength}
      {...props}
    />
  )
}

HyphenatedMaskedInput.propTypes = {
  errors: PropTypes.array,
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mask: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default HyphenatedMaskedInput
