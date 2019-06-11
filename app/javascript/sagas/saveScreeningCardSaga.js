import {takeEvery, put, call, select} from 'redux-saga/effects'
import * as api from 'utils/http'
import {saveSuccess, saveFailure, saveFailureFromNoParticipants, SAVE_SCREENING, createScreeningSuccess} from 'actions/screeningActions'
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
  getScreeningWithEditsSelector as getScreeningWithDecisionEditsSelector,
} from 'selectors/screening/decisionFormSelectors'
import {replace} from 'react-router-redux'

export function* createScreeningBase(screening) {
  const response = yield call(api.post, '/api/v1/screenings', {screening: screening.toJS()})
  const {id} = response
  const screeningEditPath = `/screenings/${id}/edit`
  yield put(createScreeningSuccess(response))
  yield put(replace(screeningEditPath))
  return response
}

export function* quietlySaveScreeningCard({payload: {card}}) {
  let screening

  if (screening.get('participants') === undefined) {
    yield put(saveFailureFromNoParticipants())
    return null
  }

  const id = screening.get('id')
  if (id) {
    const path = `/api/v1/screenings/${id}`
    return yield call(api.put, path, {screening: screening.toJS()})
  } else {
    return yield* createScreeningBase(screening)
  }
}

export function* saveScreeningCard(action) {
  try {
    const response = yield* quietlySaveScreeningCard(action)
    if (response) {
      yield put(saveSuccess(response))
    }
  } catch (error) {
    yield put(saveFailure(error))
  }
}

export function* saveScreeningCardSaga() {
  yield takeEvery(SAVE_SCREENING, saveScreeningCard)
}
