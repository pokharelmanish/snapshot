import React from 'react'
import {shallow} from 'enzyme'
import HyphenatedMaskedInput from 'common/HyphenatedMaskedInput'

const render = (
  {
    errors = [],
    gridClassName = 'class',
    id = 'id',
    label = 'label',
    mask = '',
    onBlur = () => {},
    onChange = () => {},
    onFocus = () => {},
    onKeyPress = () => {},
    value = '',
  } = {}
) =>
  shallow(
    <HyphenatedMaskedInput
      errors={errors}
      gridClassName={gridClassName}
      id={id}
      label={label}
      mask={mask}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      value={value}
    />
  )

describe('HyphenatedMaskedInput', () => {
  describe('layout', () => {
    it('renders the MaskedInputField', () => {
      const component = render({})
      const maskedInputField = component.find('MaskedInputField')
      expect(maskedInputField.exists()).toBe(true)
    })

    it('sets the correct props', () => {
      const mask = '111-11-1111'
      const component = render({mask})
      const maskedInputField = component.find('MaskedInputField')
      const props = maskedInputField.props()
      expect(props.errors).toEqual([])
      expect(props.gridClassName).toEqual('class')
      expect(props.id).toEqual('id')
      expect(props.label).toEqual('label')
      expect(props.mask).toEqual(mask)
      expect(props.maxLength).toEqual(9)
      expect(typeof props.onBlur).toEqual('function')
      expect(typeof props.onChange).toEqual('function')
      expect(typeof props.onFocus).toEqual('function')
      expect(typeof props.onKeyPress).toEqual('function')
      expect(props.placeholder).toEqual('___-__-____')
      expect(props.value).toEqual('')
    })
  })

  describe('errors', () => {
    it('displays error messages if errors are present', () => {
      const component = render({errors: ['This is an error message.']})
      const maskedInputField = component.find('MaskedInputField')
      expect(maskedInputField.props().errors).toEqual(['This is an error message.'])
    })

    it('does not display error messages if there are no errors', () => {
      const component = render({})
      const maskedInputField = component.find('MaskedInputField')
      expect(maskedInputField.props().errors).toEqual([])
    })

    it('does not display error messages if errors is undefined ', () => {
      const component = render({errors: undefined})
      const maskedInputField = component.find('MaskedInputField')
      expect(maskedInputField.props().errors).toEqual([])
    })
  })
})
