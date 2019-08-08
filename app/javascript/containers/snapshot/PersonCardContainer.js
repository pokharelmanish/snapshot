import {connect} from 'react-redux'
import PersonCard from 'views/people/PersonCard'
import {
  getPersonNamesSelector,
  getPersonInformationFlagValuesSelector,
  selectInformationalMessage,
} from 'selectors/screening/personCardSelectors'
import {deleteSnapshotPerson} from 'actions/personCardActions'
import {SHOW_MODE} from 'actions/screeningPageActions'
import {selectParticipants} from 'selectors/participantSelectors'

const mapStateToProps = (state, {personId}) => ({
  mode: SHOW_MODE,
  editable: false,
  deletable: true,
  informationFlag: getPersonInformationFlagValuesSelector(state).get(personId),
  personName: getPersonNamesSelector(state).get(personId),
  informationPill: selectInformationalMessage(state, personId),
  participants: selectParticipants(state).toJS(),
})

const mapDispatchToProps = (dispatch, {personId}) => ({
  onDelete: () => dispatch(deleteSnapshotPerson(personId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonCard)
