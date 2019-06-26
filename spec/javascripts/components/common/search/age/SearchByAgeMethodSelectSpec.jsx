import React from 'react'
import {shallow} from 'enzyme'
import SearchByAgeMethodSelect from 'common/search/age/SearchByAgeMethodSelect'

const render = ({
  gridClassName = 'search-by-age-method-field',
  id = 'search-by-age-method',
  onChange = () => {},
  onKeyPress = () => {},
  value = 'Date of Birth',
} = {}) =>
  shallow(
    <SearchByAgeMethodSelect
      gridClassName={gridClassName}
      id={id}
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
    />
  )

describe('SearchByAgeMethodSelect', () => {
  describe('layout', () => {
    let selectField
    let props

    beforeEach(() => {
      selectField = render({}).find('SelectField')
      props = selectField.props()
    })

    it('renders the SelectField', () => {
      expect(selectField.exists()).toEqual(true)
    })

    it('sets the select field props', () => {
      expect(props.gridClassName).toEqual('search-by-age-method-field')
      expect(props.id).toEqual('search-by-age-method')
      expect(typeof props.onChange).toEqual('function')
      expect(typeof props.onKeyPress).toEqual('function')
      expect(props.value).toEqual('Date of Birth')
    })

    it('renders the options', () => {
      const options = selectField.children()
      expect(options.length).toEqual(3)
      expect(options.at(0).html()).toBe('<option></option>')
      expect(options.at(1).html()).toBe('<option value="approximate">Approximate Age</option>')
      expect(options.at(2).html()).toBe('<option value="dob">Date of Birth</option>')
    })

    it('selects the value passed in', () => {
      const selectField = render({value: 'approximate'}).find('SelectField')
      expect(selectField.props().value).toEqual('approximate')
    })
  })

  describe('event handlers', () => {
    describe('onChange', () => {
      describe('when approximate age is selected', () => {
        it('clears the dob value', () => {
          const onChange = jasmine.createSpy('onChange')
          const selectField = render({onChange}).find('SelectField')
          const event = {target: {value: 'approximate'}}
          selectField.props().onChange(event)
          expect(onChange).toHaveBeenCalledWith('dateOfBirth', '')
        })
      })

      describe('when dob is selected', () => {
        it('clears the approximate age value', () => {
          const onChange = jasmine.createSpy('onChange')
          const selectField = render({onChange}).find('SelectField')
          const event = {target: {value: 'dob'}}
          selectField.props().onChange(event)
          expect(onChange).toHaveBeenCalledWith('approximateAge', '')
          expect(onChange).toHaveBeenCalledWith('approximateAgeUnits', '')
        })
      })

      describe('when empty value is selected', () => {
        it('clears the dateOfBirth, approximateAge, approximateAgeUnits values', () => {
          const onChange = jasmine.createSpy('onChange')
          const selectField = render({onChange}).find('SelectField')
          const event = {target: {value: ''}}
          selectField.props().onChange(event)
          expect(onChange).toHaveBeenCalledWith('dateOfBirth', '')
          expect(onChange).toHaveBeenCalledWith('approximateAge', '')
          expect(onChange).toHaveBeenCalledWith('approximateAgeUnits', '')
        })
      })

      describe('when the select field value is selected', () => {
        describe('to a valid value', () => {
          it('calls back with with the searchByAgeMethod', () => {
            const onChange = jasmine.createSpy('onChange')
            const selectField = render({onChange}).find('SelectField')
            const event = {target: {value: 'approximate'}}
            selectField.props().onChange(event)
            expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'approximate')
          })
        })

        describe('to an unknown value', () => {
          it('calls back with empty string', () => {
            const onChange = jasmine.createSpy()
            const selectField = render({onChange}).find('SelectField')
            const event = {target: {value: 'unknown'}}
            selectField.props().onChange(event)
            expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', '')
          })
        })
      })
    })
  })
})
