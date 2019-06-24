import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchAgeGenderNumbersGroup from 'common/search/PersonSearchAgeGenderNumbersGroup'

const defaultPersonSearchFields = {
  approximateAgeUnits: '',
  searchByAgeMethod: '',
}

const render = (
  {
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
    onKeyPress = () => {},
    onKeyUp = () => {},
    personSearchFields = defaultPersonSearchFields,
    clientIdError = [],
    ssnErrors = [],
    dobErrors = [],
    counties = [],
  } = {},
) =>
  shallow(
    <PersonSearchAgeGenderNumbersGroup
      onBlur={onBlur}
      onChange={onChange}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
      ssnErrors={ssnErrors}
      dobErrors={dobErrors}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      counties={counties}
    />
  )

describe('PersonSearchAgeGenderNumbersGroup', () => {
  describe('layout', () => {
    it('render the age search field container', () => {
      const container = render({}).find('div.age-search-field-container')
      expect(container.exists()).toEqual(true)
    })

    it('renders the SearchByAgeMethodSelect within a container and sets props', () => {
      const methodSelect = render({}).find('div.age-search-field-container').find('SearchByAgeMethodSelect')
      const props = methodSelect.props()
      expect(methodSelect.exists()).toEqual(true)
      expect(props.gridClassName).toEqual('search-by-age-method-field')
      expect(props.id).toEqual('search-by-age-method')
      expect(typeof props.onChange).toBe('function')
      expect(typeof props.onKeyPress).toBe('function')
      expect(props.value).toEqual('')
    })

    it('renders the AgeSearchFields component within a container and sets props', () => {
      const ageSearchFields = render({}).find('div.age-search-field-container').find('AgeSearchFields')
      const props = ageSearchFields.props()
      expect(ageSearchFields.exists()).toBe(true)
      expect(props.dobErrors).toEqual([])
      expect(typeof props.onBlur).toBe('function')
      expect(typeof props.onChange).toBe('function')
      expect(typeof props.onKeyPress).toBe('function')
      expect(typeof props.onKeyUp).toBe('function')
      expect(props.personSearchFields).toBe(defaultPersonSearchFields)
    })

    describe('Sex At Birth', () => {
      it('renders sex at birth select', () => {
        const component = render({personSearchFields: {sexAtBirth: ''}})
        const sexAtBirthSelect = component.find('SexAtBirthSelect')
        expect(sexAtBirthSelect.props().id).toEqual('search-sex-at-birth')
        expect(sexAtBirthSelect.props().value).toEqual('')
        expect(typeof sexAtBirthSelect.prop('onKeyPress')).toEqual('function')
      })

      it('renders sex at birth select when a gender is selected', () => {
        const component = render({
          personSearchFields: {sexAtBirth: 'Female'},
        })
        const sexAtBirthSelect = component.find('SexAtBirthSelect')
        expect(sexAtBirthSelect.props().id).toEqual('search-sex-at-birth')
        expect(sexAtBirthSelect.props().value).toEqual('Female')
      })

      describe('when the sex at birth value changes', () => {
        it('calls onChange when a new sex at birth is selected', () => {
          const onChange = jasmine.createSpy('onChange')
          const component = render({onChange})
          component
            .find('SexAtBirthSelect')
            .props()
            .onChange('sexAtBirth', 'Female')
          expect(onChange).toHaveBeenCalledWith('sexAtBirth', 'Female')
        })
      })
    })

    describe('Client ID', () => {
      it('renders a MaskedSearchInput', () => {
        const component = render({})
        const maskedSearchInput = component.find('MaskedSearchInput[name="clientId"]')
        expect(maskedSearchInput.exists()).toEqual(true)
      })

      it('sets the correct props', () => {
        const clientId = '1111-2222-3333-4444444'
        const component = render({personSearchFields: {clientId}})
        const maskedSearchInput = component.find('MaskedSearchInput[name="clientId"]')
        const props = maskedSearchInput.props()
        expect(props.errors).toEqual([])
        expect(props.label).toEqual('Client ID Number')
        expect(props.name).toEqual('clientId')
        expect(props.mask).toEqual('1111-1111-1111-1111111')
        expect(props.value).toEqual(clientId)
        expect(typeof props.onBlur).toEqual('function')
        expect(typeof props.onChange).toEqual('function')
        expect(typeof props.onFocus).toEqual('function')
        expect(typeof props.onKeyPress).toEqual('function')
      })
    })

    describe('SSN', () => {
      it('renders a MaskedSearchInput', () => {
        const component = render({})
        const maskedSearchInput = component.find('MaskedSearchInput[name="ssn"]')
        expect(maskedSearchInput.exists()).toEqual(true)
      })

      it('sets the correct props', () => {
        const ssn = '123-45-6789'
        const component = render({personSearchFields: {ssn}})
        const maskedSearchInput = component.find('MaskedSearchInput[name="ssn"]')
        const props = maskedSearchInput.props()
        expect(props.errors).toEqual([])
        expect(props.label).toEqual('Social Security Number')
        expect(props.name).toEqual('ssn')
        expect(props.mask).toEqual('111-11-1111')
        expect(props.value).toEqual(ssn)
        expect(typeof props.onBlur).toEqual('function')
        expect(typeof props.onChange).toEqual('function')
        expect(typeof props.onFocus).toEqual('function')
        expect(typeof props.onKeyPress).toEqual('function')
      })
    })
  })
})
