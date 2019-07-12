import {connect} from 'react-redux'
import PersonSearchResults from 'common/search/PersonSearchResults'
import {
  selectPeopleResults,
  selectResultsTotalValue,
  selectPersonSearchFields,
  selectCheckSearchResults,
} from 'selectors/peopleSearchSelectors'
import {authorizeSnapshotPerson} from 'actions/personCardActions'

const mapStateToProps = state => {
  return {
    results: selectPeopleResults(state).toJS(),
    total: selectResultsTotalValue(state),
    personSearchFields: selectPersonSearchFields(state),
    isSearchResults: selectCheckSearchResults(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onAuthorize = (id) => dispatch(authorizeSnapshotPerson(id))
  return {onAuthorize, dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonSearchResults)
