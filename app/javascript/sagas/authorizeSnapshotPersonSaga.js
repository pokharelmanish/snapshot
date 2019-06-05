import {takeEvery, put, call} from 'redux-saga/effects'
import {STATUS_CODES, get} from 'utils/http'
import {
  AUTHORIZE_SNAPSHOT_PERSON,
  createPersonFailure,
} from 'actions/personCardActions'
import {push} from 'react-router-redux'

export function* authorizeSnapshotPerson({payload: {id}}) {
  try {
    yield call(get, `/api/v1/people/${id}`)
    yield put(push(`/snapshot/detail/${id}`))
  } catch (error) {
    if (error.status === STATUS_CODES.forbidden) {
      yield call(alert, 'You are not authorized to add this person.')
    } else {
      yield put(createPersonFailure(error.responseJSON))
    }
  }
}

export function* authorizeSnapshotPersonSaga() {
  yield takeEvery(AUTHORIZE_SNAPSHOT_PERSON, authorizeSnapshotPerson)
}
