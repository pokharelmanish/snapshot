import {List, fromJS} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import contactStatusesReducer from 'reducers/systemCodes/contactStatusesReducer'
import {fetchSuccess} from 'actions/systemCodesActions'

describe('contactStatusesReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on FETCH_STATUS_CODES_SUCCESS', () => {
    it('returns the system codes for contact_status category', () => {
      const action = fetchSuccess([
        {code: 'S', value: 'Scheduled', category: 'contact_status'},
        {code: 'A', value: 'Attempted', category: 'contact_status'},
        {code: 'C', value: 'Completed', category: 'contact_status'},
        {code: '1245', value: 'What', category: 'screening_status'},
      ])
      expect(contactStatusesReducer(List(), action)).toEqual(fromJS([
        {code: 'S', value: 'Scheduled', category: 'contact_status'},
        {code: 'A', value: 'Attempted', category: 'contact_status'},
        {code: 'C', value: 'Completed', category: 'contact_status'},
      ]))
    })
  })
})
