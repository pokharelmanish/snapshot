import '@babel/polyfill'
import {takeEvery, put, call} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  authorizeSnapshotPerson,
  authorizeSnapshotPersonSaga,
} from 'sagas/authorizeSnapshotPersonSaga'
import {AUTHORIZE_SNAPSHOT_PERSON} from 'actions/personCardActions'
import * as personCardActions from 'actions/personCardActions'
import {push} from 'react-router-redux'

describe('authorizeSnapshotPersonSaga', () => {
  it('authorize on CHECK_SNAPSHOT_PERSON', () => {
    const gen = authorizeSnapshotPersonSaga()
    expect(gen.next().value).toEqual(takeEvery(AUTHORIZE_SNAPSHOT_PERSON, authorizeSnapshotPerson))
  })
})

describe('authorizeSnapshotPerson', () => {
  const id = '1'
  const action = personCardActions.authorizeSnapshotPerson(id)
  it('authorize', () => {
    const gen = authorizeSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/people/${id}`))
    expect(gen.next().value).toEqual(
      put(push(`/snapshot/detail/${id}`))
    )
  })

  it('puts errors when non-403 errors are thrown', () => {
    const gen = authorizeSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/people/${id}`))
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(personCardActions.createPersonFailure('some error'))
    )
  })

  it('calls an alert when the error status is 403', () => {
    const gen = authorizeSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/people/${id}`))
    const error = {responseJSON: 'some error', status: 403}
    expect(gen.throw(error).value).toEqual(
      call(alert, 'You are not authorized to add this person.')
    )
  })
})
