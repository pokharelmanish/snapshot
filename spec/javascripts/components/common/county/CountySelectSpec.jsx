import React from 'react'
import {shallow} from 'enzyme'
import CountySelect from 'common/county/CountySelect'

const render = ({
  counties = [],
  gridClassName = 'gridClassName',
  id = 'county-select',
  onChange = () => null,
  onKeyPress = () => null,
  value = null,
}) => {
  const props = {
    counties,
    gridClassName,
    id,
    onChange,
    onKeyPress,
    value,
  }
  return shallow(<CountySelect {...props} />)
}

describe('CountySelect', () => {
  it('displays the select field', () => {
    const component = render({counties: [
      {code: '123', value: 'San Francisco'},
      {code: '456', value: 'Sacramento'},
    ]})
    expect(component.find('option[value="San Francisco"]').text()).toEqual('San Francisco')
  })

  it('selects the value passed in', () => {
    const component = render({counties: [
      {code: '123', value: 'San Francisco'},
      {code: '456', value: 'Sacramento'},
    ],
    value: 'San Francisco'})
    const selectField = component.find('SelectField')
    expect(selectField.props().value).toEqual('San Francisco')
  })

  it('passes id, and gridClassName to select field', () => {
    const component = render({
      gridClassName: 'my-class-name',
      id: 'my-id',
    })
    const selectField = component.find('SelectField')
    const selectFieldProps = selectField.props()
    expect(selectFieldProps.gridClassName).toEqual('my-class-name')
    expect(selectFieldProps.id).toEqual('my-id')
  })

  it('calls onChange with the full system code when selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      counties: [
        {code: '123', value: 'San Francisco'},
        {code: '456', value: 'Sacramento'},
      ],
      onChange,
      value: 'Sacramento',
    })
    const selectField = component.find('SelectField')
    selectField.props().onChange({target: {value: 'San Francisco'}})
    expect(onChange).toHaveBeenCalledWith({code: '123', value: 'San Francisco'})
  })

  it('calls onChange with the null when selection changes to unknown code', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      counties: [
        {code: '123', value: 'San Francisco'},
        {code: '456', value: 'Sacramento'},
      ],
      onChange,
      value: 'Sacramento',
    })
    const selectField = component.find('SelectField')
    selectField.props().onChange({target: {value: 'Merrimack'}})
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('calls onKeyPress when a user presses a key', () => {
    const event = {charCode: 13}
    const onKeyPress = jasmine.createSpy('onKeyPress')
    const component = render({onKeyPress})
    const selectField = component.find('SelectField')
    selectField.simulate('keypress', event)
    expect(onKeyPress).toHaveBeenCalledWith(event)
  })
})
