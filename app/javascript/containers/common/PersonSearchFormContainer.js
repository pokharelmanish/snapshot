import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {selectParticipants} from 'selectors/participantSelectors'
import {
  selectPeopleResults,
  selectResultsTotalValue,
  selectStartTime,
  selectPersonSearchFields,
  selectClientIdErrors,
  selectSsnErrors,
  selectDobErrors,
  selectCanSearch,
} from 'selectors/peopleSearchSelectors'
import {
  search,
  setPersonSearchField,
  setFieldErrorCheck,
  clear,
  loadMoreResults,
  resetPersonSearch,
} from 'actions/peopleSearchActions'
import {canUserAddClient} from 'utils/authorization'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'
import {selectStates} from 'selectors/systemCodeSelectors'
import {selectCountiesWithoutStateOfCalifornia} from 'selectors/systemCodeSelectors'

const mapStateToProps = state => {
  const userInfo = state.get('userInfo').toJS()
  const hasAddSensitivePerson = state.getIn(['staff', 'add_sensitive_people'])
  const hasOverride = state.getIn(['staff', 'has_state_override'])
  const isSelectable = person =>
    canUserAddClient(userInfo, hasAddSensitivePerson, person, hasOverride)

  return {
    states: selectStates(state).toJS(),
    counties: selectCountiesWithoutStateOfCalifornia(state).toJS(),
    results: selectPeopleResults(state).toJS(),
    total: selectResultsTotalValue(state),
    personSearchFields: selectPersonSearchFields(state),
    clientIdError: selectClientIdErrors(state),
    ssnErrors: selectSsnErrors(state),
    dobErrors: selectDobErrors(state),
    staffId: getStaffIdSelector(state),
    startTime: selectStartTime(state),
    participants: selectParticipants(state).toJS(),
    isSelectable,
    canSearch: selectCanSearch(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onBlur = field => dispatch(setFieldErrorCheck(field, true))
  const onFocus = field => dispatch(setFieldErrorCheck(field, false))
  const onClear = (field) => dispatch(clear(field))
  const onChange = (field, value) => { dispatch(setPersonSearchField(field, value)) }
  const onCancel = () => { dispatch(onClear('results')); dispatch(resetPersonSearch()) }
  const onSearch = (isAvancedSearchOn, personSearchFields, totalResultsReceived) => {
    const resultsReceived = isAvancedSearchOn ? 0 : totalResultsReceived
    return dispatch(search(ownProps.isClientOnly, isAvancedSearchOn, personSearchFields, resultsReceived))
  }
  const onLoadMoreResults = (isAvancedSearchOn, personSearchFields, totalResultsReceived, totalResultsRequested) =>
    dispatch(loadMoreResults(ownProps.isClientOnly, isAvancedSearchOn, personSearchFields, totalResultsReceived, totalResultsRequested))
  return {onBlur, onSearch, onClear, onChange, onCancel, onFocus, onLoadMoreResults, dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonSearchForm)
