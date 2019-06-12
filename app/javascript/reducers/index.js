import errors from 'reducers/errorsReducer'
import involvements from 'reducers/involvementsReducer'
import pendingParticipants from 'reducers/pendingParticipantsReducer'
import participants from 'reducers/participantsReducer'
import peopleForm from 'reducers/peopleFormReducer'
import peopleSearch from 'reducers/peopleSearchReducer'
import relationships from 'reducers/relationshipsReducer'
import relationshipsQueryCycleTime from 'reducers/relationshipsQueryCycleTimeReducer'
import routing from 'reducers/routerReducer'
import snapshot from 'reducers/snapshotReducer'
import staff from 'reducers/staffReducer'
import {combineReducers} from 'redux-immutable'
import userInfo from 'reducers/userInfoReducer'
import systemCodes from 'reducers/systemCodes'

const rootReducer = combineReducers({
  errors,
  involvements,
  participants,
  pendingParticipants,
  peopleForm,
  peopleSearch,
  relationships,
  relationshipsQueryCycleTime,
  routing,
  snapshot,
  staff,
  systemCodes,
  userInfo,
})

export default rootReducer
