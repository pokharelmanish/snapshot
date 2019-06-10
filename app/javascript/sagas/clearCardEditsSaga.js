import {takeEvery, put, select} from 'redux-saga/effects'
import {CLEAR_CARD_EDITS} from 'actions/screeningActions'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {resetAllegations} from 'actions/allegationsFormActions'
import {resetFieldValues as resetScreeningInformationValues} from 'actions/screeningInformationFormActions'
import {cardName as screeningInformationCardName} from 'containers/screenings/ScreeningInformationFormContainer'
import {resetFieldValues as resetIncidentInformationValues} from 'actions/incidentInformationFormActions'
import {resetFieldValues as resetNarrativeFormValues} from 'actions/narrativeFormActions'
import {resetFieldValues as resetScreeningDecisionFormValues} from 'actions/screeningDecisionFormActions'
import {resetFieldValues as resetWorkerSafetyFormValues} from 'actions/workerSafetyFormActions'
import {cardName as workerSafetyCardName} from 'containers/screenings/WorkerSafetyFormContainer'

export function* clearCardEdits({payload: {card}}) {
  const screening = yield select(getScreeningSelector)
  const actions = {
    [screeningInformationCardName]: resetScreeningInformationValues,
    [workerSafetyCardName]: resetWorkerSafetyFormValues,
  }
  yield put(actions[card](screening.toJS()))
}
export function* clearCardEditsSaga() {
  yield takeEvery(CLEAR_CARD_EDITS, clearCardEdits)
}
