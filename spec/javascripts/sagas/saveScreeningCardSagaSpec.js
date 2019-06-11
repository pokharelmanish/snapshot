import '@babel/polyfill'
import {takeEvery, put, call, select} from 'redux-saga/effects'
import * as Utils from 'utils/http'
import {fromJS} from 'immutable'
import {saveScreeningCardSaga, saveScreeningCard, createScreeningBase, quietlySaveScreeningCard} from 'sagas/saveScreeningCardSaga'
import {saveSuccess, saveFailure, saveFailureFromNoParticipants, saveCard, SAVE_SCREENING, createScreeningSuccess} from 'actions/screeningActions'
import {getScreeningWithAllegationsEditsSelector} from 'selectors/screening/allegationsFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithScreeningInformationEditsSelector,
} from 'selectors/screening/screeningInformationFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithNarrativeEditsSelector,
} from 'selectors/screening/narrativeFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithIncidentInformationEditsSelector,
} from 'selectors/screening/incidentInformationFormSelector'
import {
  getScreeningWithEditsSelector as getScreeningWithWorkerSafetyEditsSelector,
} from 'selectors/screening/workerSafetyFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithCrossReportEditsSelector,
} from 'selectors/screening/crossReportFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithDecisionEditsSelector,
} from 'selectors/screening/decisionFormSelectors'
import {replace} from 'react-router-redux'

describe('saveScreeningCardSaga', () => {
  it('saves screening on SAVE_SCREENING', () => {
    const gen = saveScreeningCardSaga()
    expect(gen.next().value).toEqual(takeEvery(SAVE_SCREENING, saveScreeningCard))
  })
})

describe('createScreeningBase', () => {
  it('creates and post screening if id is undefined', () => {
    const screening = fromJS({id: undefined, allegations: [], participants: []})
    const gen = createScreeningBase(screening)
    expect(gen.next().value).toEqual(
      call(Utils.post, '/api/v1/screenings', {screening: screening.toJS()})
    )
    expect(gen.next(screening).value).toEqual(
      put(createScreeningSuccess(screening))
    )
    const screeningNew = fromJS({id: '123', allegations: [], participants: []})
    expect(gen.next().value).toEqual(
      put(replace(`/screenings/${screeningNew.id}/edit`))
    )
    expect(gen.next()).toEqual({
      done: true,
      value: screening,
    })
  })
})
