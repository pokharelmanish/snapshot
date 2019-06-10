import '@babel/polyfill'
import {takeEvery, put, select} from 'redux-saga/effects'
import {fromJS} from 'immutable'
import {clearCardEditsSaga, clearCardEdits} from 'sagas/clearCardEditsSaga'
import {clearCardEdits as clearEdits, CLEAR_CARD_EDITS} from 'actions/screeningActions'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {resetAllegations} from 'actions/allegationsFormActions'
import {resetFieldValues as resetScreeningInformationValues} from 'actions/screeningInformationFormActions'
import {resetFieldValues as resetIncidentInformationValues} from 'actions/incidentInformationFormActions'
import {resetFieldValues as resetNarrativeFormValues} from 'actions/narrativeFormActions'
import {resetFieldValues as resetScreeningDecisionFormValues} from 'actions/screeningDecisionFormActions'
import {resetFieldValues as resetWorkerSafetyFormValues} from 'actions/workerSafetyFormActions'
import {cardName as workerSafetyCardName} from 'containers/screenings/WorkerSafetyFormContainer'
import {resetFieldValues as resetCrossReportFormValues} from 'actions/crossReportFormActions'

describe('clearCardEditsSaga', () => {
  it('clears card edits on CLEAR_CARD_EDITS', () => {
    const gen = clearCardEditsSaga()
    expect(gen.next().value).toEqual(takeEvery(CLEAR_CARD_EDITS, clearCardEdits))
  })
})
