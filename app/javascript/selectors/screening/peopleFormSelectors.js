import selectOptions from 'utils/selectHelper'
import APPROXIMATE_AGE_UNITS from 'enums/ApproximateAgeUnits'
import GENDERS from 'enums/Genders'
import LANGUAGES from 'enums/Languages'
import {createSelector} from 'reselect'
import {fromJS, List, Map} from 'immutable'
import {ROLE_TYPE_NON_REPORTER, ROLE_TYPE_REPORTER} from 'enums/RoleType'
import {getSSNErrors} from 'utils/ssnValidator'
import {getZIPErrors} from 'utils/zipValidator'
import {zipFormatter} from 'utils/zipFormatter'
import {isRequiredIfCreate, combineCompact} from 'utils/validator'
import {getAddressTypes} from 'selectors/systemCodeSelectors'
import moment from 'moment'

const formatEnums = (enumObject) =>
  Object.keys(enumObject).map((item) => ({label: enumObject[item], value: item}))

export const getPeopleSelector = (state) => state.get('peopleForm')

import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import PHONE_NUMBER_TYPE from 'enums/PhoneNumberType'
import US_STATE from 'enums/USState'
import {RACE_DETAILS} from 'enums/Races'
import {ETHNICITY_DETAILS} from 'enums/Ethnicity'

const calculateAgeFromScreeningDate = (state, personId) => {
  const screeningStartDate = moment(state.getIn(['screeningInformationForm', 'started_at', 'value']))
  const person = state.getIn(['peopleForm', personId])
  const dateOfBirth = person.getIn(['date_of_birth', 'value'])
  const approximateAge = parseInt(person.getIn(['approximate_age', 'value']), 10)
  const approximateAgeUnit = person.getIn(['approximate_age_units', 'value'])

  if (dateOfBirth) {
    return screeningStartDate.diff(moment(dateOfBirth, 'MM/DD/YYYY'), 'years')
  }
  if (approximateAge && approximateAgeUnit) {
    return moment().diff(screeningStartDate, 'years') + moment.duration(approximateAge, approximateAgeUnit).asYears()
  }
  return undefined
}

const ageFromScreeningDateIsEmpty = (state, personId) => {
  const ageFromScreeningDate = calculateAgeFromScreeningDate(state, personId)

  return typeof ageFromScreeningDate !== 'number'
}

const isOver18YearsOfAgeAtScreeningDate = (state, personId) => {
  const ageFromScreeningDate = calculateAgeFromScreeningDate(state, personId)
  const ageLimit = 18
  return ageFromScreeningDate && ageFromScreeningDate >= ageLimit
}

const getRoleErrors = (state, personId, roles) => combineCompact(() => {
  if (roles.includes('Victim') && (ageFromScreeningDateIsEmpty(state, personId) || isOver18YearsOfAgeAtScreeningDate(state, personId))) {
    return 'Alleged victims must be under 18 years old.'
  }
  return undefined
})

export const getErrorsSelector = (state, personId) => {
  const person = state.getIn(['peopleForm', personId]) || Map()
  const firstName = person.getIn(['first_name', 'value'])
  const lastName = person.getIn(['last_name', 'value'])
  const roles = person.getIn(['roles', 'value'], List())
  const ssn = person.getIn(['ssn', 'value']) || ''
  const ssnWithoutHyphens = ssn.replace(/-|_/g, '')
  return fromJS({
    first_name: combineCompact(isRequiredIfCreate(firstName, 'Please enter a first name.', () => (roles.includes('Victim') || roles.includes('Collateral')))),
    last_name: combineCompact(isRequiredIfCreate(lastName, 'Please enter a last name.', () => (roles.includes('Victim') || roles.includes('Collateral')))),
    roles: getRoleErrors(state, personId, roles),
    ssn: getSSNErrors(ssnWithoutHyphens),
  })
}

export const getTouchedFieldsForPersonSelector = (state, personId) => {
  const peopleForm = state.getIn(['peopleForm', personId], Map())
  return peopleForm.filter((field) => field.get('touched')).keySeq().toList()
}

export const getVisibleErrorsSelector = (state, personId) => {
  const touchedFields = getTouchedFieldsForPersonSelector(state, personId)
  const errors = getErrorsSelector(state, personId)
  return errors.reduce(
    (filteredErrors, fieldErrors, field) => (
      filteredErrors.set(field, touchedFields.includes(field) ? fieldErrors : List())
    ), Map())
}

export const getNamesRequiredSelector = (state, personId) => {
  const roles = state.getIn(['peopleForm', personId, 'roles', 'value'], List())
  return (roles.includes('Victim') || roles.includes('Collateral'))
}

export const getRolesSelector = (state, personId) => {
  const value = state.getIn(['peopleForm', personId, 'roles', 'value'], List())
  const errors = getVisibleErrorsSelector(state, personId).get('roles')
  return fromJS({
    value: value || '',
    errors: errors,
  })
}

export const getFirstNameSelector = (state, personId) => {
  const value = state.getIn(['peopleForm', personId, 'first_name', 'value'])
  const errors = getVisibleErrorsSelector(state, personId).get('first_name')
  const required = getNamesRequiredSelector(state, personId)
  return fromJS({
    value: value || '',
    errors: errors,
    required: required,
  })
}

export const getLastNameSelector = (state, personId) => {
  const value = state.getIn(['peopleForm', personId, 'last_name', 'value'])
  const errors = getVisibleErrorsSelector(state, personId).get('last_name')
  const required = getNamesRequiredSelector(state, personId)
  return fromJS({
    value: value || '',
    errors: errors,
    required: required,
  })
}

export const getSocialSecurityNumberSelector = (state, personId) => (
  fromJS({
    value: state.getIn(['peopleForm', personId, 'ssn', 'value']) || '',
    errors: getVisibleErrorsSelector(state, personId).get('ssn'),
  })
)

const getPhoneNumbers = (person) => person.get('phone_numbers', List()).map((phoneNumber) => Map({
  id: phoneNumber.get('id'),
  number: phoneNumber.getIn(['number', 'value']),
  type: phoneNumber.getIn(['type', 'value']),
}))

const getAddresses = (person) => person.get('addresses', List()).map((address) => Map({
  id: address.get('id'),
  street_address: address.getIn(['street', 'value']),
  city: address.getIn(['city', 'value']),
  state: address.getIn(['state', 'value']),
  zip: zipFormatter(address.getIn(['zip', 'value'])),
  type: address.getIn(['type', 'value']),
}))

const getEthnicity = (person) => {
  const hispanic_latino_origin = person.getIn(['ethnicity', 'hispanic_latino_origin', 'value'])
  const ethnicity_detail = (hispanic_latino_origin === 'Yes') ?
    person.getIn(['ethnicity', 'ethnicity_detail', 'value']) : []
  return {hispanic_latino_origin, ethnicity_detail}
}

const getRaces = (person) => person.get('races', Map()).reduce((races, raceValue, raceKey) => {
  const raceDetails = person.getIn(['race_details', raceKey, 'value'], null)
  return (raceValue.get('value')) ? [...races, {race: raceKey, race_detail: raceDetails}] : races
}, [])

export const getPeopleWithEditsSelector = createSelector(
  getPeopleSelector,
  getScreeningIdValueSelector,
  (people, screeningId) => people.map((person, personId) => {
    const isAgeDisabled = Boolean(person.getIn(['date_of_birth', 'value']))
    return fromJS({
      screening_id: screeningId,
      id: personId,
      approximate_age: isAgeDisabled ? null : person.getIn(['approximate_age', 'value']),
      approximate_age_units: isAgeDisabled ? null : person.getIn(['approximate_age_units', 'value']),
      date_of_birth: person.getIn(['date_of_birth', 'value']),
      first_name: person.getIn(['first_name', 'value']),
      gender: person.getIn(['gender', 'value']),
      languages: person.getIn(['languages', 'value']),
      legacy_descriptor: person.getIn(['legacy_descriptor', 'value']),
      middle_name: person.getIn(['middle_name', 'value']),
      last_name: person.getIn(['last_name', 'value']),
      name_suffix: person.getIn(['name_suffix', 'value']),
      phone_numbers: getPhoneNumbers(person),
      addresses: getAddresses(person),
      roles: person.getIn(['roles', 'value']),
      ssn: person.getIn(['ssn', 'value']),
      sensitive: person.getIn(['sensitive', 'value']),
      sealed: person.getIn(['sealed', 'value']),
      ethnicity: getEthnicity(person),
      races: getRaces(person),
    })
  })
)

const getAlertMessageByRole = (roles) => {
  if (roles.includes('Victim')) {
    return 'Alleged victims must be identified with a name, even Doe or Unknown, and must be under the age of 18'
  } else if (roles.includes('Collateral')) {
    return 'Collateral must be identified with a name, even Doe or Unknown.'
  }
  return undefined
}

export const getPersonAlertErrorMessageSelector = (state, personId) => {
  const required = getNamesRequiredSelector(state, personId)
  const lastName = state.getIn(['peopleForm', personId, 'last_name', 'value'])
  const firstName = state.getIn(['peopleForm', personId, 'first_name', 'value'])
  const roles = state.getIn(['peopleForm', personId, 'roles', 'value'], List())
  if (required && !(firstName && lastName)) {
    return getAlertMessageByRole(roles)
  }
  return undefined
}

export const getPhoneNumberTypeOptions = () => fromJS(PHONE_NUMBER_TYPE.map((type) => ({value: type, label: type})))
export const getPersonPhoneNumbersSelector = (state, personId) => (
  state.get('peopleForm', Map()).get(personId).get('phone_numbers', List()).map((phoneNumber) => (
    Map({
      number: phoneNumber.getIn(['number', 'value']) || '',
      type: phoneNumber.getIn(['type', 'value']) || '',
    })
  ))
)

export const getFilteredPersonRolesSelector = (state, personId) => {
  const selectedRoles = state.getIn(['peopleForm', personId, 'roles', 'value'], List())
  const hasReporterRole = selectedRoles.some((role) => ROLE_TYPE_REPORTER.includes(role))
  return fromJS([
    ...ROLE_TYPE_NON_REPORTER.map((value) => ({label: value, value, disabled: false})),
    ...ROLE_TYPE_REPORTER.map((value) => ({label: value, value, disabled: hasReporterRole})),
  ])
}

export const getAddressTypeOptionsSelector = (state) => getAddressTypes(state).map((addressType) => Map({
  value: addressType.get('code'),
  label: addressType.get('value'),
}))

export const getStateOptionsSelector = () => fromJS(US_STATE.map(({code, name}) => ({value: code, label: name})))

export const getPersonAddressesSelector = (state, personId) => getAddresses(state.get('peopleForm', Map()).get(personId))
  .map((address) => address.set('street', address.get('street_address')).delete('street_address').delete('id').set('zipError', getZIPErrors(address.get('zip'))))

export const getIsApproximateAgeDisabledSelector = (state, personId) => (
  Boolean(state.getIn(['peopleForm', personId, 'date_of_birth', 'value']))
)

export const getApproximateAgeUnitOptionsSelector = () => fromJS(formatEnums(APPROXIMATE_AGE_UNITS))
export const getLanguageOptionsSelector = () => fromJS(selectOptions(LANGUAGES))
export const getGenderOptionsSelector = () => fromJS(formatEnums(GENDERS))

export const getPersonDemographicsSelector = (state, personId) => {
  const person = state.getIn(['peopleForm', personId], Map())
  return fromJS({
    approximateAge: person.getIn(['approximate_age', 'value']) || '',
    approximateAgeUnit: person.getIn(['approximate_age_units', 'value']) || 'years',
    dateOfBirth: person.getIn(['date_of_birth', 'value']) || '',
    gender: person.getIn(['gender', 'value']) || '',
    languages: person.getIn(['languages', 'value']) || [],
  })
}

export const getPersonRacesSelector = (state, personId) => {
  const personRaces = state.getIn(['peopleForm', personId, 'races'])
  return Object.keys(RACE_DETAILS).reduce((races, race) => races.set(race, personRaces.getIn([race, 'value'], false)), Map())
}
export const getPersonRaceDetailsSelector = (state, personId) => {
  const personRaces = state.getIn(['peopleForm', personId, 'race_details'])
  return Object.keys(RACE_DETAILS).reduce((races, race) => races.set(race, personRaces.getIn([race, 'value'], '')), Map())
}

export const getAreEthnicityFieldsDisabledForPersonSelector = (state, personId) => (
  Boolean(state.getIn(['peopleForm', personId, 'ethnicity', 'hispanic_latino_origin', 'value']))
)

export const getPersonHispanicLatinoOriginValueSelector = (state, personId) => (
  state.getIn(['peopleForm', personId, 'ethnicity', 'hispanic_latino_origin', 'value'])
)

export const getEthnicityDetailOptionsSelector = () => (
  fromJS(ETHNICITY_DETAILS.map((detail) => ({value: detail, label: detail})))
)

export const getPersonEthnicityDetaiValueSelector = (state, personId) => (
  state.getIn(['peopleForm', personId, 'ethnicity', 'ethnicity_detail', 'value', 0])
)
export const getIsRaceIndeterminateValueSelector = (state, personId) => {
  const isUnknown = state.getIn(['peopleForm', personId, 'races', 'Unknown', 'value'])
  const isAbandoned = state.getIn(['peopleForm', personId, 'races', 'Abandoned', 'value'])
  const isDeclinedToAnswer = state.getIn(['peopleForm', personId, 'races', 'Declined to answer', 'value'])

  return Boolean(isUnknown || isAbandoned || isDeclinedToAnswer)
}
