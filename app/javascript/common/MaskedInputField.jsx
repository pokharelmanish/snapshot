import FormField from 'common/FormField'
import MaskedInput from 'react-maskedinput'
import PropTypes from 'prop-types'
import React from 'react'

const MaskedInputField = ({
  errors,
  gridClassName,
  id,
  label,
  labelClassName,
  mask,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  required,
  type,
  value,
  onKeyPress,
}) => {
  const formFieldProps = {errors, gridClassName, htmlFor: id, label, labelClassName, required}

  const handleKeyDown = (e) => {
    const enterKey = 13
    const keyCode = e.keyCode

    if (keyCode === enterKey) {
      onKeyPress({charCode: enterKey})
    }
  }

  const handleBlur = (e) => {
    e.target.placeholder = ''
    onBlur()
  }

  const handleFocus = (e) => {
    e.target.placeholder = placeholder
    onFocus()
  }

  return (
    <div className="masked-input-wrapper" onKeyDown={handleKeyDown} role="presentation">
      <FormField {...formFieldProps}>
        <MaskedInput
          className='masked-input'
          id={id}
          type={type}
          value={value}
          mask={mask}
          placeholder={''}
          required={required}
          aria-required={required}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={onChange}
          autoComplete={'off'}
        />
      </FormField>
    </div>
  )
}

MaskedInputField.defaultProps = {
  type: 'text',
  mask: '',
  onBlur: () => {},
  onFocus: () => {},
  onKeyPress: () => {},
}

MaskedInputField.propTypes = {
  errors: PropTypes.array,
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  mask: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default MaskedInputField
