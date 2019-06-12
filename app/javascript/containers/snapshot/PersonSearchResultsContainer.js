import {connect} from 'react-redux'
import PersonSearchResults from 'common/search/PersonSearchResults'
import {
  selectPeopleResults,
  selectResultsTotalValue,
  selectPersonSearchFields,
  selectSearchResultsSubset,
  selectSearchResultsCurrentRow,
} from 'selectors/peopleSearchSelectors'
import {
  loadMoreResults,
  setSearchCurrentPage,
  setSearchCurrentRow,
} from 'actions/peopleSearchActions'
import {authorizeSnapshotPerson} from 'actions/personCardActions'

const mapStateToProps = state => {
  return {
    results: selectPeopleResults(state).toJS(),
    total: selectResultsTotalValue(state),
    personSearchFields: selectPersonSearchFields(state),
    resultsSubset: selectSearchResultsSubset(state),
    currentRow: selectSearchResultsCurrentRow(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onLoadMoreResults = (personSearchFields, totalResultsReceived, totalResultsRequested) => {
    dispatch(loadMoreResults(true, true, personSearchFields, totalResultsReceived, totalResultsRequested))
  }
  const setCurrentPageNumber = (pageNumber) => dispatch(setSearchCurrentPage(pageNumber))
  const setCurrentRowNumber = (pageNumber) => dispatch(setSearchCurrentRow(pageNumber))
  const onAuthorize = (id) => dispatch(authorizeSnapshotPerson(id))
  return {onLoadMoreResults, setCurrentPageNumber, setCurrentRowNumber, onAuthorize, dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonSearchResults)
