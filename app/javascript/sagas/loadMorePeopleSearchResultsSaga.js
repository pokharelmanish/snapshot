import {takeEvery, put, select} from 'redux-saga/effects'
import {getPeopleEffect} from 'sagas/fetchPeopleSearchSaga'
import {selectLastResultsSortValue} from 'selectors/peopleSearchSelectors'
import {
  LOAD_MORE_RESULTS,
  loadMoreResultsSuccess,
  loadMoreResultsFailure,
} from 'actions/peopleSearchActions'

export function* loadMorePeopleSearch({payload}) {
  try {
    const {isClientOnly, isAdvancedSearchOn, personSearchFields, totalResultsReceived, totalResultsRequested} = payload
    const size = totalResultsRequested - totalResultsReceived
    const sort = yield select(selectLastResultsSortValue)
    const response = yield getPeopleEffect({isClientOnly, isAdvancedSearchOn, personSearchFields, size, totalResultsReceived, sort})
    yield put(loadMoreResultsSuccess(response))
  } catch (error) {
    yield put(loadMoreResultsFailure(error))
  }
}

export function* loadMorePeopleSearchResultsSaga() {
  yield takeEvery(LOAD_MORE_RESULTS, loadMorePeopleSearch)
}
