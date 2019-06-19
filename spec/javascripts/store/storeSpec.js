import * as matchers from 'jasmine-immutable-matchers'
import * as IntakeConfig from 'common/config'
import {createPersonSuccess} from 'actions/personCardActions'
import {fromJS} from 'immutable'
import rootReducer from 'reducers'
import {createStore} from 'redux'

describe('Store', () => {
  let initialState
  let store
  beforeEach(() => {
    jasmine.addMatchers(matchers)
    initialState = fromJS({
      allegationsForm: [],
      candidatesForm: {},
      crossReportForm: {},
      errors: {},
      incidentInformationForm: {},
      involvements: {},
      narrativeForm: {},
      pendingParticipants: [],
      participants: [],
      peopleForm: {},
      peopleSearch: {
        results: [],
        searchTableCurrentPage: 1,
        searchTableCurrentRow: 25,
        total: 0,
        defaultCounty: null,
        searchFields: {
          searchTerm: '',
          lastName: '',
          firstName: '',
          middleName: '',
          clientId: '',
          suffix: '',
          ssn: '',
          dateOfBirth: '',
          approximateAge: '',
          approximateAgeUnits: '',
          searchByAgeMethod: 'dob',
          sexAtBirth: '',
          address: '',
          city: '',
          county: '',
          state: '',
          country: '',
          zipCode: '',
        },
        errorCheckFields: {
          clientId: false,
          ssn: false,
          dateOfBirth: false,
        },
        checkSearchResults: false,
        isFetching: false,
      },
      relationshipForm: {isSaving: false},
      relationships: [],
      relationshipsButtonStatus: {},
      relationshipsQueryCycleTime: [],
      routing: {locationBeforeTransitions: null},
      safelySurrenderedBaby: {
        persisted: {},
        form: {
          surrendered_by: null,
          relation_to_child: '1592',
          bracelet_id: '',
          parent_guardian_given_bracelet_id: 'U',
          parent_guardian_provided_med_questionaire: 'U',
          comments: '',
          med_questionaire_return_date: '',
        },
      },
      screening: {},
      screeningInformationForm: {},
      screeningDecisionForm: {},
      screeningPage: {},
      screenings: [],
      snapshot: {},
      staff: {},
      systemCodes: {
        addressCounties: [],
        addressTypes: [],
        allegationTypes: [],
        communicationMethods: [],
        csecTypes: [],
        counties: [],
        countyAgencies: [],
        ethnicityTypes: [],
        hispanicOriginCodes: [],
        languages: [],
        locations: [],
        raceTypes: [],
        relationshipTypes: [],
        screenResponseTimes: [],
        unableToDetermineCodes: [],
        usStates: [],
      },
      workerSafetyForm: {},
      userInfo: {},
    })
    store = createStore(rootReducer)
  })

  describe('when a screening already exists in the store', () => {
    beforeEach(() => {
      initialState = initialState.set(
        'screening',
        fromJS({
          id: '1',
          name: 'Mock screening',
          participants: [],
        })
      )
      store = createStore(rootReducer, initialState)
    })

    it('handles create participant', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
      const participant = {
        id: '2',
        legacy_id: '3',
        screening_id: '1',
        addresses: [],
        ethnicity: [
          {
            hispanic_latino_origin: 'Yes',
            ethnicity_detail: ['Mexican'],
          },
        ],
      }
      const participants = fromJS([participant])
      const action = createPersonSuccess(participant)
      store.dispatch(action)
      expect(store.getState().get('participants')).toEqualImmutable(
        participants
      )
    })
  })
})
