import {
  CREATE_SNAPSHOT,
  CLEAR_SNAPSHOT,
  VIEW_SNAPSHOT_DETAIL,
} from 'actions/actionTypes'

export function createSnapshot() {
  return {type: CREATE_SNAPSHOT}
}
export function clearSnapshot() {
  return {type: CLEAR_SNAPSHOT}
}
export function viewSnapshotDetail(id) {
  return {type: VIEW_SNAPSHOT_DETAIL, payload: {id}}
}
