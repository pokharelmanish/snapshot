import {CHECK_STAFF_PERMISSION_COMPLETE} from 'actions/staffActions'
import {Map} from 'immutable'
import {createReducer} from 'utils/createReducer'

export default createReducer(Map(), {
  [CHECK_STAFF_PERMISSION_COMPLETE]: (state, {payload: {permission, hasPermission}, error}) => {
    if (error) {
      return state
    } else {
      return state.set(permission, hasPermission)
    }
  },
})
